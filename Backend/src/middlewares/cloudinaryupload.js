const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../Config/cloudinary");

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "profiles",          // Cloudinary folder
        allowed_formats: ["jpg", "png", "jpeg"],
        public_id: (req, file) =>
            `${req.user.id}_${Date.now()}`, // unique name
    },
});

const upload = multer({ storage });

module.exports = upload;
