# Fullstack Login Page

Aplicação Full Stack de cadastro, autenticação e visualização de dados do usuário, desenvolvida para praticar a integração entre Front-End, Back-End e banco de dados.

O projeto foi desenvolvido utilizando Next.js e TypeScript no Front-End, Express no Back-End, Prisma como ORM e PostgreSQL como banco de dados.

A aplicação também foi preparada para funcionar em ambiente de produção, com Front-End e Back-End hospedados separadamente e banco de dados PostgreSQL remoto.

## Descrição

O projeto consiste em uma aplicação de autenticação onde o usuário pode criar uma conta, realizar login e acessar um dashboard com suas informações.

Durante o desenvolvimento, o projeto também foi utilizado para praticar conceitos importantes de uma aplicação Full Stack, como:

- Comunicação entre Front-End e Back-End.
- Criação e consumo de uma API REST.
- Persistência de dados em PostgreSQL.
- Utilização do Prisma ORM.
- Criação e aplicação de migrations.
- Gerenciamento de estado com React Context API.
- Proteção de acesso ao dashboard.
- Configuração de CORS.
- Utilização de variáveis de ambiente.
- Deploy de aplicações separadas.
- Comunicação entre serviços em produção.

## Tecnologias Utilizadas

### Front-End

- Next.js
- React
- TypeScript
- Tailwind CSS
- Context API

### Back-End

- Node.js
- Express
- TypeScript
- CORS
- Prisma ORM
- PostgreSQL

### Infraestrutura

- Vercel — hospedagem do Front-End
- Render — hospedagem do Back-End
- Neon — banco de dados PostgreSQL

## Funcionalidades

### Cadastro

O usuário pode criar uma nova conta informando:

- Nome
- E-mail
- Senha
- Confirmação de senha

Antes de realizar o cadastro, o Front-End verifica os dados básicos do formulário.

O Back-End também verifica se o e-mail informado já está cadastrado no banco de dados.

### Login

O usuário pode realizar login utilizando:

- E-mail
- Senha

As informações são enviadas para a API do Back-End, que consulta o banco de dados através do Prisma.

Caso as credenciais sejam válidas, os dados necessários do usuário são disponibilizados para o Front-End.

### Dashboard

Após o login, o usuário é direcionado para o dashboard.

A página apresenta informações do usuário autenticado:

- Nome
- E-mail
- ID

O acesso ao dashboard também possui proteção para impedir que a página seja utilizada simplesmente através da navegação direta para a rota.

### Logout

A aplicação possui uma opção para sair da conta e retornar para a página de login.

## Arquitetura

O projeto é dividido em três partes principais:

```text
┌─────────────────────┐
│      Front-End      │
│      Next.js        │
│     TypeScript      │
└──────────┬──────────┘
           │
           │ HTTP / JSON
           ▼
┌─────────────────────┐
│      Back-End       │
│      Express        │
│     TypeScript      │
└──────────┬──────────┘
           │
           │ Prisma
           ▼
┌─────────────────────┐
│      PostgreSQL     │
│        Neon         │
└─────────────────────┘
```

O Front-End é responsável pela interface e interação com o usuário.

O Back-End é responsável pelas rotas da API, regras relacionadas ao cadastro e login e comunicação com o banco de dados.

O PostgreSQL é responsável pela persistência das informações.

O Prisma funciona como camada de acesso ao banco de dados.

## Estrutura do Projeto

O repositório possui Front-End e Back-End no mesmo projeto:

```text
Fullstack_LoginPage/
│
├── Backend/
│   ├── prisma/
│   │   ├── migrations/
│   │   └── schema.prisma
│   │
│   ├── src/
│   │   ├── controller/
│   │   │   └── user-controller.ts
│   │   ├── db.ts
│   │   └── routes.ts
│   │
│   ├── index.ts
│   ├── prisma.config.ts
│   ├── package.json
│   └── package-lock.json
│
├── src/
│   ├── app/
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── register/
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── components/
│   │   ├── Input.tsx
│   │   └── InputLogin.tsx
│   │
│   ├── context/
│   │   └── UserContext.tsx
│   │
│   └── utils/
│       └── ComponentsStyle.ts
│
└── .gitignore
```

## Banco de Dados

O banco de dados utilizado é PostgreSQL.

A estrutura é gerenciada através do Prisma.

O projeto possui um modelo `User` contendo:

```prisma
model User {
  id       String @id @default(uuid())
  name     String
  password String
  email    String @unique
}
```

O campo `email` possui restrição de unicidade para evitar o cadastro de dois usuários com o mesmo endereço de e-mail.

O campo `id` utiliza UUID como identificador do usuário.

## Prisma

O Prisma é utilizado como ORM para realizar a comunicação entre o Back-End e o PostgreSQL.

A aplicação utiliza o adapter PostgreSQL:

```ts
import { PrismaPg } from "@prisma/adapter-pg";
```

A conexão utiliza uma variável de ambiente para evitar que informações de acesso ao banco sejam diretamente inseridas no código.

```env
DATABASE_URL="sua_database_url"
```

## Migrations

A estrutura do banco de dados é controlada através do Prisma Migrate.

As migrations permitem registrar as alterações realizadas no schema do banco e reproduzir a estrutura necessária em outros ambientes.

Para verificar o estado das migrations:

```bash
npx prisma migrate status
```

Para aplicar migrations em um ambiente de produção:

```bash
npx prisma migrate deploy
```

Para gerar o Prisma Client:

```bash
npx prisma generate
```

## Variáveis de Ambiente

Informações sensíveis não devem ser versionadas junto ao código.

O projeto utiliza variáveis de ambiente para configurar a conexão com o banco de dados e outras informações específicas de cada ambiente.

Exemplo:

```env
DATABASE_URL="sua_database_url"
```

O arquivo `.env` não é enviado para o repositório.

O `.gitignore` também impede o versionamento de arquivos e diretórios gerados ou específicos do ambiente local:

```gitignore
node_modules/
.env
.env.*
!.env.example

.next/
dist/

generated/
```

## Segurança

Durante a preparação do projeto para produção, foram aplicados alguns cuidados importantes.

### Variáveis sensíveis

As credenciais do banco de dados não ficam diretamente no código-fonte nem são enviadas para o GitHub.

### CORS

O Back-End utiliza CORS para controlar quais aplicações podem realizar requisições para a API.

### Validação de cadastro

Antes de criar um usuário, o Back-End verifica se o e-mail já está cadastrado:

```ts
const findUser = await prisma.user.findUnique({
  where: { email: user.email },
});
```

Caso o usuário já exista, a API retorna uma resposta informando que o e-mail já está cadastrado.

### Proteção do dashboard

O acesso à área de dashboard foi protegido para impedir que um usuário não autenticado consiga simplesmente acessar a rota diretamente pela URL.

Essa etapa foi importante para entender que esconder uma página através da interface não é suficiente para garantir controle de acesso.

## Boas Práticas Aplicadas

- Componentização com React.
- Separação entre páginas e componentes reutilizáveis.
- Separação de responsabilidades no Back-End.
- Organização das rotas da API.
- Controllers separados para as operações de usuário.
- Tipagem utilizando TypeScript.
- Utilização de interfaces e types.
- Context API para compartilhamento do estado do usuário.
- Utilização de Prisma como ORM.
- Utilização de migrations para controle do banco.
- PostgreSQL como banco de dados relacional.
- Variáveis de ambiente para informações sensíveis.
- Configuração de CORS.
- Separação entre ambiente local e ambiente de produção.
- Proteção de acesso ao dashboard.
- Organização do projeto em Front-End e Back-End.
- Utilização de componentes reutilizáveis para campos de formulário.

## Deploy

O projeto foi dividido em serviços para o ambiente de produção.

### Front-End

O Front-End foi hospedado na Vercel.

```text
https://fullstack-login-page-kappa.vercel.app
```

### Back-End

A API foi hospedada no Render.

```text
https://fullstack-login-backend-kmjn.onrender.com
```

### Banco de Dados

O PostgreSQL foi hospedado no Neon.

A aplicação utiliza a URL de conexão através da variável de ambiente `DATABASE_URL`.

## Comunicação em Produção

Em ambiente local, a comunicação era realizada utilizando `localhost`.

Durante o processo de deploy, foi necessário substituir essa arquitetura local pela comunicação entre os serviços hospedados.

```text
Usuário
   │
   ▼
Vercel
Front-End Next.js
   │
   │ HTTP
   ▼
Render
API Express
   │
   │ Prisma
   ▼
Neon
PostgreSQL
```

Essa mudança foi uma das principais etapas do projeto, pois exigiu compreender como cada parte da aplicação funciona de maneira independente.

## Aprendizados

Este projeto foi desenvolvido principalmente para aprofundar os conhecimentos em desenvolvimento Full Stack.

Entre os principais aprendizados estão:

- Como estruturar uma aplicação com Front-End e Back-End separados.
- Como criar uma API utilizando Express.
- Como conectar uma API Express a um banco PostgreSQL.
- Como utilizar Prisma para acessar o banco.
- Como criar e aplicar migrations.
- Como utilizar variáveis de ambiente.
- Como configurar CORS.
- Como compartilhar dados entre componentes através do Context API.
- Como proteger uma rota de acesso no Front-End.
- Como realizar deploy do Front-End e Back-End separadamente.
- Como conectar um banco PostgreSQL remoto à aplicação.
- Como adaptar uma aplicação que funciona em `localhost` para um ambiente de produção.
- Como pensar em segurança e configuração além da implementação da interface.

## Status do Projeto

Projeto concluído e funcional em ambiente de produção.

O objetivo principal foi transformar uma aplicação inicialmente executada apenas localmente em uma aplicação Full Stack publicada, conectando:

- Next.js
- Express
- Prisma
- PostgreSQL
- Vercel
- Render
- Neon

## Autor

Desenvolvido por Felipe de Lima Passarelli.
