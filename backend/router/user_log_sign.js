const express = require('express');
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require('../middleware/auth');
const fs = require('fs');

const User = require('../schema/user');
const Otp = require('../schema/otp');
const generateOtp = require('../apis/otpgeneration');
const searchUser = require('../db/search');
const temp1 = require('../templates/t1/index');
const Pdf = require('../schema/resume');


router.post(
    "/signup",
    [
        check("username", "Please Enter a valid username")
        .notEmpty(),
        check("email", "Please Enter a Valid email")
        .isEmail(),
        check("password", "Please Enter a valid password(minimum 6 characters)").isLength({
            min: 6
        }),
    ],
    async (req, res) => {
        const err = validationResult(req);
        if (!err.isEmpty()) {
            return res.status(400).json({
                err: err.array()
            });
        }
        const {
            username,
            email,
            password,
            leetcode,
            codeforces,
            github,
            unstop
        } = req.body;
        console.log(req.body);
        try {
            let user = await User.findOne({
                email
            });
            if (user) {
                return res.status(400).json({
                    msg: "User Already Exists"
                });
            }
            user = new User({
                username,
                email,
                password,
                leetcode,
                codeforces,
                github,
                unstop
            });
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save();
            return (
                res.status(200).json({
                    msg: "Successfully signed in"
                })
            );
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Signing user");
        }
    }
);

router.post(
    '/login',
    [
        check("email", "Please Enter a Valid Email")
        .isEmail(),
        check("password", "Please Enter correct Password")
        .isLength({
            min: 6
        })
    ],
    async(req,res) => {
        console.log(req.body);
        const err = validationResult(req);
        if(!err.isEmpty()) {
            return res.status(400).json({
                err: err.array()
            });
        }
        const {
            email,
            password
        } = req.body;
        console.log(req.body);
        try {
            const user = await User.findOne({
                email
            });
            if(!user) {
                return res.status(400).json({
                    msg: "User does not exist"
                });
            } else {
                const isMatchPassword = await bcrypt.compare(password, user.password);
                if(!isMatchPassword) {
                    return res.status(400).json({
                        msg: "Incorrect Password"
                    });
                } 
            }
            const payload = {
                user: {
                    id: user.id
                }
            }
            console.log(payload)
            jwt.sign(
                payload,
                "randomString", //some proper private key needs to be provided
                {
                    expiresIn: '30d', 
                },
                (err, token) => {
                    if(err)
                        throw err;
                    return res.status(200).json({
                        token: token,
                        userid: user.id
                    });
                }
            );
        } catch(err) {
            console.error(err.message);
            res.status(500).json({
                message: "Internal server error"
            });
        }
    }
)

router.post(
    "/update/:email",
    async (req,res) => {
        const {
            leetcode,
            codeforces,
            github,
            password,
            username,
            unstop
        } = req.body
        try {
            const paramsEmail = req.params.email;
            console.log(leetcode,codeforces,github,password,username);
            const salt = await bcrypt.genSalt(10);
            if(password == '') {
                const newValues = {
                    '$set': {
                        username: username,
                        github: github,
                        codeforces: codeforces,
                        leetcode: leetcode,
                        unstop: unstop
                    }
                }
                User.updateOne(
                    { email: paramsEmail},
                    newValues,
                    function(err, result) {
                        if(err)
                            throw err;
                        else {
                            console.log('1 user updated');
                            return res.status(200).json({
                                msg: 'ok'
                            })
                        }
                    }
                )
            } else {
                if(password.length < 6)
                    return res.status(400).json({
                        msg: 'Password length should atleast be 6'
                    })
                const newPassword = await bcrypt.hash(password, salt);
                const newValues = {
                    '$set': {
                        username: username,
                        password: newPassword,
                        github: github,
                        codeforces: codeforces,
                        leetcode: leetcode,
                        unstop: unstop
                    }
                }
                User.updateOne(
                    { email: paramsEmail},
                    newValues,
                    function(err, result) {
                        if(err)
                            throw err;
                        else {
                            console.log('1 user updated');
                            return res.status(200).json({
                                msg: 'ok'
                            })
                        }
                    }
                )
            }
        } catch(err) {
            return res.status(500).json({
                msg: "Internal server error"
            })
        }
    }
)

router.post(
    '/getotp',
    [
        check("email", "Please Enter a Valid Email")
        .isEmail(),
    ],
    async (req,res) => {
        const err = validationResult(req);
        if(!err.isEmpty()) {
            return res.status(400).json({
                err: err.array()
            });
        }
        const { email } = req.body;
        try {
            const user = await User.findOne({
                email
            });
            if(!user) {
                return res.status(404).json({
                    msg: 'User doesnot exist',
                });
            }
            generateOtp(email, res);
        } catch(err) {

        }
    }
)

router.post(
    '/verifyotp',
    async (req,res) => {
        try {
            let { email, otp } = req.body;
            if(!email || !otp) {
                return res.status(404).json({
                    msg: 'Params are missing'
                })
            } 
            let userOtp = await Otp.findOne({
                email
            });
            if(!userOtp) {
                return res.status(404).json({
                    msg: 'records does not exists'
                })
            }
            const expiredAt = userOtp.expiredAt;
            const hashedOtp = userOtp.otp;

            if(expiredAt < Date.now()) {
                await Otp.deleteMany({ userId: email});
                return res.status(400).json({
                    msg: 'Code has expired'
                });
            }
            const isValidOtp = await bcrypt.compare(otp,hashedOtp);

            if(!isValidOtp) {
                return res.status(403).json({
                    msg: 'Wrong otp'
                })
            }
            await Otp.deleteMany({ userId: email});
            const user = await User.findOne({
                email
            });
            const payload = {
                user: {
                    id: user.id
                }
            }
            jwt.sign(
                payload,
                'randomString',
                {
                    expiresIn: '30d'
                },
                (err,token) => {
                    if(err)
                        throw err
                    else {
                        return res.status(200).json({
                            token: token,
                            userid: user.id
                        })
                    }
                }
            )
        } catch (err) {
            console.error(err);
            res.status(500).json({
                msg: 'Internal Server Error'
            })
        }
    }
)

router.post(
    '/search',
    async (req,res) => {
        try {
            const { query } = req.body; 
            console.log(query);
            const result = await searchUser(User, query);
            console.log(result);
            res.status(200).json({
                data: result
            })
        } catch(err) {
            console.log(err);
            res.status(500).json({
                msg: "Internal server error"
            })
        }
    }
)

router.post(
    '/resume/:userId',
    async (req, res) => {
        try {
            const {
                pData,
                aboutme,
                exData,
                eData,
                prData,
                sdescription,
                adescription,
                github,
                linkedin
            } = req.body;
            console.log(
                sdescription,
                adescription
            );
            const dt = temp1(pData, aboutme, exData, eData, prData, sdescription, adescription, github, linkedin)
            res.setHeader("Content-Type", "text/html");
            res.status(200).send(dt)
        } catch(err) {
            console.log(err);
            res.status(500).json({
                msg: "Internal server error"
            })
        }
    }
)

router.post(
    '/resumes/:email',
    async (req, res) => {
        try {
            // console.log(req.files.file.data.buffer,req.files.file.data.buffer.byteOffset,req.files.file.data.buffer.byteLength);
            const arrayBuffer = req.files.file.data.buffer.slice(
                0,
                0+req.files.file.data.buffer.byteLength
            )
            console.log(arrayBuffer);
            const email = req.params.email;
            const pdf = new Pdf({
                email: email,
                pdf: Buffer.from(arrayBuffer),
            });
            await pdf.save();
            return res.status(200).json({
                msg: 'ok'
            })
        } catch(err) {
            console.log(err);
            res.status(500).json({
                msg: "Internal server error"
            })
        }
    }
)

router.get(
    '/getresume/:email',
    async (req,res) => {
        try {
            const cur = await Pdf.aggregate([
                {
                    $match: {
                        email: req.params.email
                    },
                }, {
                    $project: {
                        _id: 0,
                        pdf: 1,
                        createdAt: 1,
                    }
                }
            ]);
            // let cnt = 1;
            // for await (const doc of cur) {
            //     const binaryData = doc.pdf;
            //     console.log(typeof(binaryData), Object.keys(binaryData));

            //     fs.writeFile(`output_${cnt}.pdf`, Buffer.from(binaryData.buffer), function(err) {
            //         if(err)
            //             throw err;
            //         console.log('saved',cnt);
            //     })
            //     cnt+=1;
            // }
            // res.set('Content-Disposition', 'attachment; filename="text.pdf"');
            // res.set('Content-Type', 'application/pdf');
            return res.status(200).send(cur)
        } catch(err) {
            console.log(err);
            res.status(500).json({
                msg: "Internal server error"
            })
        }
    }
)

module.exports = router;