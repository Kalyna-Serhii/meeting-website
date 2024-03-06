import multer from 'multer';
import path from 'path';
import fs from 'fs';

const photosDirectory = 'photos/';
if (!fs.existsSync(photosDirectory)) {
    fs.mkdirSync(photosDirectory);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb (null, 'photos/');
    },
    filename: function (req, file, cb) {
        cb (null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

export default upload;