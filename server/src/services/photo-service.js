import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs/promises';

const PhotoService = {
  async deletePhoto(file) {
    const filename = fileURLToPath(import.meta.url);
    const dirname = path.dirname(filename);
    try {
      const photoPath = path.join(dirname, '../../photos', file);
      try {
        await fs.unlink(photoPath);
      } catch (error) {
        // empty
      }
    } catch (error) {
      // empty
    }
  },
};

export default PhotoService;
