import multer from 'multer';
import fs from 'fs';
import path from 'path';
import app from '../app';


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, app.config.defaultUploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// const unlinkAsync = promisify(fs.unlink);

export default(app) => {
  app.route('/uploads')
    .all(app.auth.authenticate())
    .post(upload.single('file'), (req, res) => {
      res.status(200);
      res.json({ return: 'UPLOAD SUCCESSFULL' });
    })
    .delete((req, res) => {
      fs.unlink(`${app.config.defaultUploadDir}/${req.body.file}`, (response) => {
        if (!response) {
          res.sendStatus(200);
        } else {
          res.sendStatus(404);
        }
      });
    });
  app.route('/uploads/:file(*)')
    .all(app.auth.authenticate())
    .get((req, res) => {
      const fullPath = req.params.file;
      const file = `${app.config.defaultBaseUploadDir}/${fullPath}`;

      const filename = path.basename(file);

      res.setHeader('Content-disposition', `attachment; filename=${filename}`);
      res.setHeader('Content-type', 'audio/mpeg3');

      const filestream = fs.createReadStream(file);
      filestream.pipe(res);
    });
};
