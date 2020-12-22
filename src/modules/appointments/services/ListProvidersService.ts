import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {
    // do nothing
  }

  public async execute({ user_id }: IRequest): Promise<User[]> {
    // Recuperando dados salvos em cache marcados por uma 'chave' do 'user_id':
    let users = await this.cacheProvider.recover<User[]>(
      `providers-list:${user_id}`,
    );

    // Condiçao para caso nao encontrarmos os usuários em cache, iremos buscar no banco de dados e salvar em cache:
    if (!users) {
      // Listagem de todos os usuários, com exceçao o do próprio usuário que está fazendo a listagem:
      users = await this.usersRepository.findAllProviders({
        except_user_id: user_id,
      });

      // Salvando dados em cache marcados por uma 'chave' para não sobrescrevermos os caches de outros usuários:
      await this.cacheProvider.save(
        `providers-list:${user_id}`,
        classToClass(users),
      );
    }

    return users;
  }
}

export default ListProvidersService;
