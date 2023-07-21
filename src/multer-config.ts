import { diskStorage } from 'multer';
import { extname } from 'path';

export const multerOptions = {
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG and PNG images are allowed.'));
    }
  },
  storage: diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
      const randomName = Array(32)
        .fill(null)
        .map(() => (Math.round(Math.random() * 16)).toString(16))
        .join('');
      cb(null, `${randomName}${extname(file.originalname)}`);
    },
  }),
};
