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

function syncFiles(ivrId, file) {
  const newFolder = `${app.config.defaultIvrUploadDir}/${ivrId}`;
  if (fs.existsSync(`${app.config.defaultUploadTempDir}/${file}`)) {
    fs.rename(`${app.config.defaultUploadTempDir}/${file}`, `${newFolder}/${file}`, (err) => {
      if (err) throw err;
    });
  }
}

class IvrsController {
  constructor(Ivrs, IvrsDetails) {
    this.Ivrs = Ivrs;
    this.IvrsDetails = IvrsDetails;
  }

  getAll() {
    return this.Ivrs.findAll({
      include: [
        {
          model: this.IvrsDetails,
          as: 'IvrDetails',
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
      ],
    })
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }

  getById(params) {
    return this.Ivrs.findOne({
      where: params,
      include: [
        {
          model: this.IvrsDetails,
          as: 'IvrDetails',
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
      ],
    })
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }

  create(data, createdBy) {
    data.createdBy = createdBy.username;
    const ivrDetails = data.ivrDetails;
    delete data.ivrDetails;

    return this.Ivrs.create(data)
      .then((newIvr) => {
        const newFolder = `${app.config.defaultIvrUploadDir}/${newIvr.id}`;
        fs.mkdirSync(newFolder);
        if (data.mode === 'advanced') {
          ivrDetails.forEach((detail) => {
            if ((detail.command === 'playback') || (detail.command === 'read')) {
              const objParameters = JSON.parse(detail.parameters);
              syncFiles(newIvr.id, objParameters.file);
            }
            this.IvrsDetails.create(detail)
              .then(newDetail => newIvr.addIvrDetails(newDetail.id));
          });
        } else {
          const basicDefinition = JSON.parse(data.basicDefinition);
          if (basicDefinition.fileMain.file.name) {
            syncFiles(newIvr.id, basicDefinition.fileMain.file.name);
          }
          if (basicDefinition.fileError.file.name) {
            syncFiles(newIvr.id, basicDefinition.fileError.file.name);
          }
          if (basicDefinition.fileSuccess.file.name) {
            syncFiles(newIvr.id, basicDefinition.fileSuccess.file.name);
          }
        }

        return newIvr;
      })
      .then(result => defaultResponse(result, HttpStatus.CREATED))
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  update(data, params, updatedBy) {
    data.updatedBy = updatedBy.username;
    const ivrDetails = data.ivrDetails;
    delete data.ivrDetails;
    this.IvrsDetails.destroy({
      where: { ivrId: params.id },
    });
    return this.Ivrs.update(data, {
      where: params,
    })
      .then((updatedIvrCount) => {
        this.Ivrs.findOne({
          where: params,
        })
          .then((updatedIvr) => {
            if (data.mode === 'advanced') {
              ivrDetails.forEach((detail) => {
                if ((detail.command === 'playback') || (detail.command === 'read')) {
                  const objParameters = JSON.parse(detail.parameters);
                  syncFiles(updatedIvr.id, objParameters.file);
                }
                this.IvrsDetails.create(detail)
                  .then(newDetail => updatedIvr.addIvrDetails(newDetail.id));
              });
            } else {
              const basicDefinition = JSON.parse(data.basicDefinition);
              if (basicDefinition.fileMain.file.name) {
                syncFiles(updatedIvr.id, basicDefinition.fileMain.file.name);
              }
              if (basicDefinition.fileError.file.name) {
                syncFiles(updatedIvr.id, basicDefinition.fileError.file.name);
              }
              if (basicDefinition.fileSuccess.file.name) {
                syncFiles(updatedIvr.id, basicDefinition.fileSuccess.file.name);
              }
            }
          });
        return updatedIvrCount;
      })
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  delete(params) {
    return this.Ivrs.destroy({
      where: params,
    })
      .then((result) => {
        rimraf(
          `${app.config.defaultIvrUploadDir}/${params.id}`,
          () => { console.log(`Directory ${app.config.defaultIvrUploadDir}/${params.id} removed`); },
        );
        return defaultResponse(result, HttpStatus.NO_CONTENT);
      })
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }
}

export default IvrsController;
