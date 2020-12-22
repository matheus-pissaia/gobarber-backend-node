// Declaramos uma tipagem a mais que existe no express (Overwrite - sobrescrever):
declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }
}
