const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {


    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "No Token, Authorization denied" });
        }
        console.log("AUTH HEADER:", req.headers.authorization);

        const decoded = jwt.verify(token, process.env.REACT_APP_JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (err) {
        console.log("something is wrong in auth middleware", err);
        res.status(401).json({ message: "Token is not valid" });
    }
}