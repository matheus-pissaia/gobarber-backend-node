// virjievm0j43q90fr89qhf
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequestAuthenticateUser {
  email: string;
  password: string;
}

// Interface usada no retorno da função execute():
interface IResponseAuthenticatedUser {
  user: User;
  token: string;
}
@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {
    // do nothing
  }

  public async execute({
    email,
    password,
  }: IRequestAuthenticateUser): Promise<IResponseAuthenticatedUser> {
    // Verificação de email:
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email or password', 401);
    }

    // Só para lembrar:
    // user.password = senha criptografada que está no banco de dados
    // password (pârametro dessa função 'execute') = senha não-criptografada que o usuário tentou fazer login

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect email or password', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    // Criação da assinatura do token:
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    // Se passou por todas as condições sem retornar nenhum erro, então o usuário foi autenticado e retornamos o objeto:
    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
