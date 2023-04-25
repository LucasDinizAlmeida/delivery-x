# App

GymPass style app.

## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível obter o número de entregas realizadas pelo usuário logado;
- [x] Deve ser possível o usuário obter o seu histórico de entregas;
- [x] Deve ser possível o usuário obter seus estabelecimentos cadastrados;
- [x] Deve ser possível o usuário se tornar entregador;
- [x] Deve ser possível o usuário deixar de ser entregador;
- [x] Deve ser possível associar um pedido a um entregador;
- [x] Deve ser possível cadastrar um estabelecimento;
- [x] Deve ser possível validar um estabelecimento;
- [x] Deve ser possível o estabelecimento criar um pedido;
- [x] Deve ser possível atualizar o status de um pedido;
- [x] Deve ser possível deletar um usuário;
- [x] Deve ser possível deletar um estabelecimento;
- [] Deve ser possível deletar usuário administrador; X

## RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] O estabelecimento do usuário não pode realizar pedidos enquanto o estabelecimento não estiver validado;
- [x] O historico de entregas do usuário deve vir paginado contendo 20 entregas por pagina;
- [] Associar um pedido á um entregador só pode ser feito pelo ADMIN ou MASTER 
- [] O estabelecimento só pode ser validado por administradores;
- [] Os usuários comuns só podem ser deletados pelo administrador ou pelo master; X
- [] Os administradores só podem ser deletados pelo master; X

## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [x] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [] O usuário deve ser identificado por um JWT (JSON Web Token);