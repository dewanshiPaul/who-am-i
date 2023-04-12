const bcryptjs = require('bcryptjs');
const nodemailer = require('nodemailer');
const Otp = require('../schema/otp');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        // type: 'OAuth2',
        user:  process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD,
    }
})

const generateOtp = async (email, res) => {
    try {
        console.log(email);
        const otp = `${Math.floor(100000 + Math.random()*900000)}`
        
        var mailOptions = {
            from: process.env.USER_EMAIL,
            to: email,
            subject: 'OTP for login',
            html: `<p>
                Enter <b>${otp}</b> in the website to verify yourself with the registered email address.
                <br />
                The generate otp expires in <b>3 minutes</b>
            </p>`,
        }

        const salt = await bcryptjs.genSalt(10);
        console.log(otp);
        const hashOtp = await bcryptjs.hash(otp, salt);
        const userOtp = new Otp({
            userId: email,
            otp: hashOtp,
            createdAt: Date.now(),
            expiredAt: Date.now() + 180000,
        });

        await userOtp.save();
        await transporter.sendMail(mailOptions);
        res.status(200).json({
            msg: 'sent'
        })
    } catch(err) {
        console.log(err)
        res.status(500).json({
            msg: 'otp generation failed'
        })
    }
}

module.exports = generateOtp;