import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {
    // do nothing
  }

  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401);
    }

    if (user.avatar) {
      // Deletar avatar anterior, se existir
      await this.storageProvider.deleteFile(user.avatar);
    }

    // Salvamos o Avatar
    const filename = await this.storageProvider.saveFile(avatarFilename);

    // Sobrescrevemos o novo nome do arquivo do avatar:
    user.avatar = filename;

    // Atualizamos o usuário:
    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
