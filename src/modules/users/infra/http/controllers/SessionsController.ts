import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    // Requisição do email e da senha para logar na aplicação:
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    /**
     * Ao passar o 'user' para a funçao 'classToClass' exigimos que a entidade (ou classe) siga
     * as regras definidas no seu arquivo. Nesse caso, exigimos que os dados sejam retornados expondo
     * o caminho onde se encontra o avatar e a exclusão da senha do usuário.
     * Obs: ver as configuraçoes no arquivo de entidades de usuário.
     */
    return response.json({ user: classToClass(user), token });
  }
}
