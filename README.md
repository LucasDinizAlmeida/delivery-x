# App

GymPass style app.

## RFs (Requisitos funcionais)

- [] Deve ser possível se cadastrar;
- [] Deve ser possível se autenticar;
- [] Deve ser possível obter o perfil de um usuário logado;
- [] Deve ser possível obter o número de entregas realizadas pelo usuário logado;
- [] Deve ser possível o usuário obter o seu histórico de entregas;
- [] Deve ser possível o usuário obter seus estabelecimentos cadastrados;
- [] Deve ser possível o usuário se tornar entregador;
- [] Deve ser possível cadastrar um estabelecimento;
- [] Deve ser possível validar a criação de um estabelecimento;
- [] Deve ser possível o estabelecimento criar um pedido;
- [] Deve ser possível atualizar o status de um pedido;
- [] Deve ser possível deletar um usuário;
- [] Deve ser possível deletar um estabelecimento;
- [] Deve ser possível deletar usuário administrador;

## RNs (Regras de negócio)

- [] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [] O estabelecimento do usuário não pode realizar pedidos enquanto o estabelecimento não estiver validado;
- [] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [] O check-in só pode ser validado até 20 minutos após ser criado;
- [] O estabelecimento só pode ser validado por administradores;
- [] Os usuários comuns só podem ser deletados pelo administrador ou pelo master;
- [] Os administradores só podem ser deletados pelo master;

## RNFs (Requisitos não-funcionais)

- [] A senha do usuário precisa estar criptografada;
- [] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [] O usuário deve ser identificado por um JWT (JSON Web Token);