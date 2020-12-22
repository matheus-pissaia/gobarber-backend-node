// Configuraçao do provider de email
interface IMailConfig {
  driver: 'ethereal' | 'ses';

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

// Configurando variáveis
export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'Email cadastrado na Amazon AWS',
      name: 'Qualquer coisa',
    },
  },
} as IMailConfig;
