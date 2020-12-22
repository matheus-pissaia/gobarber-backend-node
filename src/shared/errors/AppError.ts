class AppError {
  // Método público ('public') para podermos acessar de fora do arquivo e 'readonly' para não ser possivel alterar os valores
  public readonly message: string;

  public readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default AppError;
