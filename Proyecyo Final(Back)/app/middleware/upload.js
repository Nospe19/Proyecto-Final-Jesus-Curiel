const multer = require("multer");
const path = require("path");

// Storage for images with multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Filter for images with multer
const filter = (req, file, cb) => {
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/webp"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// Upload for images with multer
const upload = multer({
  storage,
  limits: { fileSize: 6000000 }, // 6 MB
  fileFilter: filter,
});

module.exports = upload;