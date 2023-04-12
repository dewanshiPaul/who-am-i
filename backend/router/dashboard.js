const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../schema/user');
const { validationResult } = require("express-validator");
const mongodb = require('mongodb');
const leetcode = require('../apis/leetcode');
const scraper = require('../scrapper/index');
const codeforces = require('../apis/codeforces');
const github = require('../apis/github');
const unstop = require('../apis/unstop');

router.get(
    "/dashboard/:userId",
    auth,
    async (req,res) => {
        const err = validationResult(req);
        if(!err.isEmpty()) {
            return res.status(400).json({
                err: err.array()
            });
        }

        try {
            const oid = new mongodb.ObjectId(req.params.userId);
            const user = await User.findOne({_id: oid});
            if(!user) {
                return res.status(400).json({
                    msg: "User does not exist",
                })
            } else {
                return res.status(200).json({
                    "username": user.username,
                    "email": user.email,
                    "leetcode": user.leetcode,
                    "codeforces": user.codeforces,
                    "github": user.github,
                    "unstop": user.unstop
                })
            }
        } catch(err) {
            console.error(err);
            res.status(500).json({
                msg: "Internal server error",
            })
        }
        res.end();
    }
)

router.get(
    "/dashboard/leetcode/user/:userId",
    auth,
    async (req,res) => {
        leetcode.getLeetcodeUserData(req.params.userId)
        .then((result) => {
            return res.status(200).json({
                data: result,
            })
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({
                msg: 'Internal server error',
            });
        })
    }
)

router.get(
    "/dashboard/leetcode/contest/:userId",
    auth,
    async (req,res) => {
        leetcode.getLeecodeUserContestData(req.params.userId)
        .then((result) => {
            return res.status(200).json({
                data: result,
            })
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({
                msg: 'Internal server error',
            });
        })
    }
)

router.get(
    "/dashboard/leetcode/problemscount/",
    auth,
    async (req,res) => {
        leetcode.getAllQuestionsCount()
        .then((result) => {
            return res.status(200).json({
                data: result,
            })
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({
                msg: 'Internal server error',
            });
        })
    }
)

router.get(
    '/dashboard/codeforces/info/:userId',
    auth,
    async (req,res) => {
        codeforces.getUserInfo(req.params.userId)
        .then((result) => {
            return res.status(200).json({
                data: result
            });
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({
                msg: 'Internal server error'
            })
        })
    }
)

router.get(
    "/dashboard/codeforces/contest/:userId",
    auth,
    async (req,res) => {
        codeforces.getContestInfo(req.params.userId)
        .then((result) => {
            return res.status(200).json({
                data: result
            })
        })
        .catch((err) => {
            return res.status(500).json({
                msg: 'Internal server error'
            })
        })
    }
)

router.get(
    "/dashboard/codeforces/activity/:userId",
    auth,
    async (req,res) => {
        scraper.scrapeActivityCodeforces(req.params.userId)
        .then((result) => {
            return res.status(200).json({
                data: result,
            })
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({
                msg: 'Internal server error'
            })
        })
    }
)

router.get(
    "/dashboard/github/info/:userId",
    auth,
    async (req,res) => {
        github.getUserInfo(req.params.userId)
        .then((result) => {
            console.log(result);
            return res.status(200).json({
                data: result,
            })
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({
                msg: 'Internal server error'
            })
        })
    }
)

router.get(
    "/dashboard/github/details/:userId/:repos_count",
    auth,
    async (req,res) => {
        github.getUserWorkFlow(req.params.userId,req.params.repos_count)
        .then((result) => {
            return res.status(200).json({
                data: result,
            })
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({
                msg: 'Internal server error'
            })
        })
    }
)

router.get(
    "/dashboard/github/orgs/:userId",
    auth,
    async (req,res) => {
        github.getUserOrgs(req.params.userId)
        .then((result) => {
            return res.status(200).json({
                data: result,
            })
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({
                msg: 'Internal server error'
            })
        })
    }
)

router.get(
    "/dashboard/github/achievements/:userId",
    auth,
    async (req,res) => {
        scraper.scraperAchievementGithub(req.params.userId)
        .then((result) => {
            return res.status(200).json({
                data: result,
            })
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({
                msg: 'Internal server error'
            })
        })
    }
)

router.get(
    "/dashboard/github/events/:userId",
    auth,
    async (req,res) => {
        github.getUserEvent(req.params.userId)
        .then((result) => {
            return res.status(200).json({
                data: result
            })
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({
                msg: 'Internal server error'
            })
        })
    }
)

router.get(
    '/dashboard/unstop/info/:userId',
    auth,
    async (req,res) => {
        unstop.getUserProfile(req.params.userId)
        .then((result) => {
            return res.status(200).json({
                data: result
            })
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({
                msg: 'Internal server error'
            })
        })
    }
)

router.get(
    '/dashboard/unstop/badges/:userId',
    auth,
    async (req,res) => {
        unstop.getBadgesAchieved(req.params.userId)
        .then((result) => {
            return res.status(200).json({
                data: result
            })
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({
                msg: 'Internal server error'
            })
        })
    }
)

module.exports = router;