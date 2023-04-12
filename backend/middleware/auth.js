const jwt = require("jsonwebtoken");

const middleware = (req, res, next) => {
    const token = req.header("token");
    // console.log(token);
    if(!token)
        return (
            res.status(401).json({
                msg: "Auth Error"
            }));
    try {
        const decoded = jwt.verify(token, "randomString");
        req.user = decoded.user;
        next();
    } catch(err) {
        console.error(err);
        res.status(500).json({
            msg: "Invalid Token"
        });
    }
};

module.exports = middleware;