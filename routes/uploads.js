import multer from 'multer';
import fs from 'fs';
import path from 'path';
import app from '../app';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, app.config.defaultUploadTempDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

export default(app) => {
  app.route('/uploads')
    .all(app.auth.authenticate())
    .post(upload.single('file'), (req, res) => {
      res.status(200);
      res.json({ return: 'UPLOAD SUCCESSFULL' });
    });
  app.route('/uploads/:file(*)')
    .get((req, res) => {
      const fullPath = req.params.file;
      const file = `${app.config.defaultBaseUploadDir}/${fullPath}`;
      if (fs.existsSync(file)) {
        const filename = path.basename(file);
        res.setHeader('Content-disposition', `attachment; filename=${filename}`);
        res.setHeader('Content-type', 'audio/mpeg3');
        res.sendFile(file);
      } else {
        res.sendStatus(404);
      }
    })
    .all(app.auth.authenticate())
    .delete((req, res) => {
      const fullPath = req.params.file;
      fs.unlink(`${app.config.defaultBaseUploadDir}/${fullPath}`, (response) => {
        if (!response) {
          res.sendStatus(200);
        } else {
          res.sendStatus(404);
        }
      });
    });
};
