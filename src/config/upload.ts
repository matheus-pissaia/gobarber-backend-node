import path from 'path';
import crypto from 'crypto';

// Importação de um pacote que lida com upload de arquivos:
import multer, { StorageEngine } from 'multer';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

interface IUploadConfig {
  driver: 'disk' | 's3';

  tmpFolder: string;
  uploadsFolder: string;

  multer: {
    storage: StorageEngine;
  };

  config: {
    disk: {};
    aws: {
      bucket: string;
    };
  };
}

export default {
  driver: process.env.STORAGE_DRIVER,

  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, 'uploads'),

  // Configuraçao para salvamento de arquivos na máquina local:
  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex');
        const fileName = `${fileHash}-${file.originalname}`;

        return callback(null, fileName);
      },
    }),
  },

  // Configuraçao para salvamento de arquivos na nuvem (Amazon S3):
  config: {
    disk: {},
    aws: {
      bucket: 'app-gobarber-bootcamp',
    },
  },
} as IUploadConfig;
