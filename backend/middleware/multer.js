import multer from "multer";

// Configure storage for file uploads
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    }
})

// Multer middleware
const upload = multer({ storage });

export default upload;
