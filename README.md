# Recuperação de Senha

**Requisitos Funcionais**

- O usuário deve poder recuperar a sua senha informando o e-mail;
- O usuário deve receber um e-mail com instruções para recuperar/resetar a senha;
- O usuário deve poder trocar a senha;

**Requisitos Não Funcionais**

- Utilizar o Mailtrap para realizar o teste de envio de e-mails enquanto estiver em dev;
- Utilizar o Amazon SES para envio de e-mails em ambiente de produção;
- Enviar e-mails em segundo plano, para não sobrecarregar o servidor (background job);

**Regras de Negócio**

- O link de recuperação de senha enviado por e-mail deve expirar em 6h
- O usuário precisa confirmar a nova senha ao trocá-la;

# Painel de Perfil (Atualização de Avatar, Troca de Senha...)

**Requisitos Funcionais**

- O usuário deve poder alterar seu nome, e-mail e senha;

**Regras de Negócio**

- O usuário não pode alterar seu e-mail para um já utilizado por outro usuário da aplicação;
- Para alterar a senha, o usuário deve informar a senha antiga;
- Para alterar a senha, o usuário precisa confirmar a nova senha;

# Agendamentos de Serviço

**Requisitos Funcionais**

- O usuário deve poder listar todos os prestadores de serviço cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
- O usuário deve poder listar os horários disponíveis em um dia específico de um prestador;
- O usuário deve poder realizar o agendamento com o prestador;

**Requisitos Não Funcionais**

- A listagem de prestadores deve ser armazenada em cache;

**Regras de Negócio**

- Cada agendamento deve durar 1h exatamente (por enquanto...);
- Os agendamentos deve estar disponíveis entre 8h às 18h (Primeiro às 8h, último às 17h);
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O prestador não pode agendar serviços com ele mesmo;

# Página do Prestador de serviço

**Requisitos Funcionais**

- O prestador deve poder listar todos os seus agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**Requisitos Não Funcionais**

- Os agendamentos do dia do prestador devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io;

**Regras de Negócio**

- A notificação deve ter um status de lida ou nao-lida para que o prestador tenha mais controle;
