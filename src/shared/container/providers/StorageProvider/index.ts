import { container } from 'tsyringe';
import uploadConfig from '@config/upload';

import IStorageProvider from './models/IStorageProvider';

import DiskStorageProvider from './implementations/DiskStorageProvider';
import S3StorageProvider from './implementations/S3StorageProvider';

// Definimos os provedores de forma 'dinâmica', assim, quando quisermos alterar o provedor, é só
// ir no arquivo '.env'
const providers = {
  disk: DiskStorageProvider,
  s3: S3StorageProvider,
};

// 'providers' são alterados de forma dinâmica através do arquivo: .env
container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers[uploadConfig.driver],
);
