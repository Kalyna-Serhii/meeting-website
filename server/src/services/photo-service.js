import {fileURLToPath} from "url";
import path from "path";
import fs from "fs/promises";

const PhotoService = {
    async deletePhoto(photo) {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const photoPath = path.join(__dirname, '../../photos', photo);
        await fs.unlink(photoPath);
    },
};

export default PhotoService;