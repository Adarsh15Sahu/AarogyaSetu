module.exports = (...allowedRoles) => {
    return (req, res, next) => {

        console.log("Allowed roles:", allowedRoles);
        console.log("User role:", req.user.role);

        if (!req.user || !req.user.role) {
            return res.status(401).json({ message: "User role missing" });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access denied" });
        }

        next();
    };
};
