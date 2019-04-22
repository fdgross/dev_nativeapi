import HttpStatus from 'http-status';
import fs from 'fs';
import rimraf from 'rimraf';
import app from '../app';

const defaultResponse = (data, statusCode = HttpStatus.OK) => ({
  data,
  statusCode,
});

const errorResponse = (message, statusCode = HttpStatus.BAD_REQUEST) => defaultResponse({
  error: message,
}, statusCode);

function syncFiles(moh) {
  const newFolder = `${app.config.defaultMohUploadDir}/${moh.id}`;
  if (moh.files) {
    const arrFiles = moh.files.split(',');
    arrFiles.forEach((file) => {
      if (fs.existsSync(`${app.config.defaultUploadTempDir}/${file}`)) {
        fs.rename(`${app.config.defaultUploadTempDir}/${file}`, `${newFolder}/${file}`, (err) => {
          if (err) throw err;
        });
      }
    });
  }
}

// const filePersist = require('./filePersist');

class MohsController {
  constructor(Mohs) {
    this.Mohs = Mohs;
  }

  getAll() {
    return this.Mohs.findAll({})
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }

  getById(params) {
    return this.Mohs.findOne({
      where: params,
    })
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }

  create(data, createdBy) {
    data.createdBy = createdBy.username;
    return this.Mohs.create(data)
      .then((newMoh) => {
        const newFolder = `${app.config.defaultMohUploadDir}/${newMoh.id}`;
        fs.mkdirSync(newFolder);
        syncFiles(newMoh);
      })
      .then(result => defaultResponse(result, HttpStatus.CREATED))
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  update(data, params, updatedBy) {
    data.updatedBy = updatedBy.username;
    return this.Mohs.update(data, {
      where: params,
    })
      .then((result) => {
        if (result[0] === 0) {
          return errorResponse(`Moh id ${params.id} not found`, HttpStatus.NOT_FOUND);
        }
        this.Mohs.findOne({
          where: params,
        })
          .then((updatedMoh) => {
            syncFiles(updatedMoh);
          });
        return defaultResponse(result);
      })
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  delete(params) {
    return this.Mohs.destroy({
      where: params,
    })
      .then((result) => {
        rimraf(
          `${app.config.defaultMohUploadDir}/${params.id}`,
          () => { console.log(`Directory ${app.config.defaultMohUploadDir}/${params.id} removed`); },
        );
        return defaultResponse(result, HttpStatus.NO_CONTENT);
      })
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }
}

export default MohsController;
