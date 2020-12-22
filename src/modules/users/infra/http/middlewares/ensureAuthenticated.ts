import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';

// importação do arquivo de configurações de autenticação que criamos:
import authConfig from '@config/auth';

interface ITokenPayload {
  iat: number;
  ext: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  // Validação do token JWT

  // requisição do token(provinda do header):
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  // Desestruturamos os dados do token recebidos pelo 'header' pois eles vem no formato: 'Bearer + token' e não queremos a primeira parte
  // Uso da função 'split()' para separar onde tem um espaço entre as duas 'string': 'Bearer hfwnocndnne(token)'
  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    // Uso do 'as' para forçar uma variável a ter um tipo específico (string ou object ou number etc.):
    const { sub } = decoded as ITokenPayload;

    // 'request.user' não existe essa tipagem nos arquivos do 'express', por isso criamos o arquivo 'express.d.ts' (na pasta '@types') para configurar isso
    request.user = {
      id: sub,
    };

    // Se o token foi verificado e está tudo certo então a aplicação pode prosseguir usando a função next()
    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}
