import {fileURLToPath} from "url";
import path from "path";
import fs from "fs/promises";

const PhotoService = {
    async deletePhoto(file) {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        try {
            const photoPath = path.join(__dirname, '../../photos', file);
            try {
                await fs.unlink(photoPath);
            } catch (error) {
            }
        } catch (error) {
        }
    },
};

export default PhotoService;