# App

GymPass style app.

## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [] Deve ser possível obter o número de entregas realizadas pelo usuário logado;
- [] Deve ser possível o usuário obter o seu histórico de entregas;
- [x] Deve ser possível o usuário obter seus estabelecimentos cadastrados;
- [] Deve ser possível o usuário se tornar entregador;
- [x] Deve ser possível cadastrar um estabelecimento;
- [x] Deve ser possível validar um estabelecimento;
- [x] Deve ser possível o estabelecimento criar um pedido;
- [x] Deve ser possível atualizar o status de um pedido;
- [x] Deve ser possível deletar um usuário;
- [x] Deve ser possível deletar um estabelecimento;
- [] Deve ser possível deletar usuário administrador;

## RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] O estabelecimento do usuário não pode realizar pedidos enquanto o estabelecimento não estiver validado;
- [] O estabelecimento só pode ser validado por administradores;
- [] Os usuários comuns só podem ser deletados pelo administrador ou pelo master;
- [] Os administradores só podem ser deletados pelo master;

## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [x] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [] O usuário deve ser identificado por um JWT (JSON Web Token);