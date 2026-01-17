module.exports = (req, res, next) => {
    if (req.user.id !== req.body.doctorId) {
        return res.status(403).json({
            message: "You cannot create prescription for another doctor"
        });
    }
    next();
};
