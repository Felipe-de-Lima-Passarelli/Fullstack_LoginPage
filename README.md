# Fullstack Login Page

Aplicação Full Stack de cadastro, login e gerenciamento de sessão de usuários, desenvolvida com Next.js, TypeScript, Express, Prisma e PostgreSQL.

O projeto foi criado inicialmente para praticar a construção de uma aplicação de autenticação e evoluiu para um projeto completo, envolvendo Front-End, Back-End, banco de dados, autenticação, segurança e deploy em produção.

## Descrição

O projeto consiste em uma aplicação onde o usuário pode criar uma conta, realizar login e acessar um dashboard com suas informações.

A aplicação possui uma arquitetura separando o Front-End da API, permitindo que cada parte tenha uma responsabilidade específica.

O Front-End é responsável pela interface e interação com o usuário, enquanto o Back-End concentra as regras de negócio, autenticação e comunicação com o banco de dados.

O PostgreSQL é utilizado para persistir os usuários e o Prisma atua como ORM para facilitar a comunicação entre a API e o banco de dados.

Durante o desenvolvimento, a aplicação também foi preparada para funcionar em produção, deixando de depender exclusivamente de `localhost`.

## Tecnologias Utilizadas

### Front-End

- Next.js
- React
- TypeScript
- Tailwind CSS
- Context API
- Next Navigation

### Back-End

- Node.js
- Express
- TypeScript
- CORS
- Prisma ORM
- bcrypt
- Token de autenticação
- Cookies HTTP

### Banco de Dados

- PostgreSQL
- Prisma Migrate
- Neon

### Deploy

- Vercel — Front-End
- Render — Back-End
- Neon — PostgreSQL

## Funcionalidades

- Cadastro de usuários.
- Validação dos campos do formulário de cadastro.
- Verificação de e-mail já cadastrado.
- Login através de e-mail e senha.
- Hash de senhas utilizando `bcrypt`.
- Geração de token de autenticação.
- Autenticação utilizando cookie.
- Validação da sessão autenticada.
- Proteção do acesso ao dashboard.
- Exibição dos dados do usuário autenticado.
- Logout.
- Comunicação entre Front-End e Back-End através de API.
- Persistência dos usuários em PostgreSQL.
- Controle da estrutura do banco através de migrations.
- Configuração para ambiente local e produção.

## Fluxo da Aplicação

O fluxo principal da aplicação pode ser representado da seguinte forma:

```text
                         ┌───────────────────┐
                         │      Usuário      │
                         └─────────┬─────────┘
                                   │
                                   ▼
                         ┌───────────────────┐
                         │    Front-End     │
                         │     Next.js      │
                         └─────────┬─────────┘
                                   │
                              HTTP / JSON
                                   │
                                   ▼
                         ┌───────────────────┐
                         │     Back-End      │
                         │      Express      │
                         └─────────┬─────────┘
                                   │
                           Prisma / Adapter
                                   │
                                   ▼
                         ┌───────────────────┐
                         │    PostgreSQL     │
                         │       Neon        │
                         └───────────────────┘
```

## Arquitetura do Projeto

O projeto possui Front-End e Back-End dentro do mesmo repositório.

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
│   ├── generated/
│   │   └── prisma/
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

## Front-End

O Front-End foi desenvolvido utilizando Next.js com TypeScript.

A aplicação possui três páginas principais:

### Login

Responsável por receber o e-mail e a senha do usuário e realizar uma requisição para o Back-End.

```text
POST /login
```

Após uma autenticação bem-sucedida, o usuário é direcionado para o dashboard.

### Cadastro

Permite criar uma nova conta informando:

- Nome
- E-mail
- Senha
- Confirmação de senha

Antes de enviar os dados para a API, o Front-End realiza validações básicas dos campos.

```text
POST /cadastro
```

### Dashboard

Área destinada ao usuário autenticado.

São exibidas informações como:

- Nome
- E-mail
- ID

O dashboard possui proteção de acesso para impedir que usuários não autenticados consigam simplesmente acessar a rota diretamente.

## Componentização

Os campos dos formulários foram separados em componentes reutilizáveis.

```text
Input.tsx
InputLogin.tsx
```

Essa separação evita repetir a estrutura dos campos diretamente nas páginas e facilita a manutenção da interface.

## Gerenciamento de Estado

O estado dos formulários é controlado utilizando `useState`.

Para compartilhar as informações do usuário autenticado entre diferentes partes da aplicação, foi utilizado React Context API.

A estrutura principal utiliza:

```text
UserProvider
      │
      ▼
UserContext
      │
      ▼
useUser()
```

O `UserProvider` envolve a aplicação através do `layout.tsx`, permitindo que os componentes tenham acesso ao contexto do usuário.

## Back-End

O Back-End foi desenvolvido utilizando Express e TypeScript.

A API possui rotas relacionadas à autenticação e cadastro:

```text
POST /login
POST /cadastro
```

A estrutura separa as responsabilidades entre:

- Rotas
- Controllers
- Conexão com o banco de dados

Exemplo da organização:

```text
src/
├── controller/
│   └── user-controller.ts
├── db.ts
└── routes.ts
```

## Banco de Dados

O projeto utiliza PostgreSQL para persistência dos dados.

O modelo principal é o usuário.

```prisma
model User {
  id       String @id @default(uuid())
  name     String
  password String
  email    String @unique
}
```

O campo `email` possui uma restrição de unicidade, impedindo que dois usuários sejam cadastrados utilizando o mesmo endereço.

O identificador do usuário utiliza UUID.

## Prisma ORM

O Prisma é responsável pela comunicação entre o Back-End e o PostgreSQL.

A aplicação utiliza o Prisma Client junto ao adapter PostgreSQL.

A conexão com o banco é configurada através da variável de ambiente:

```env
DATABASE_URL="sua_database_url"
```

Dessa forma, as informações de conexão não precisam ficar diretamente no código-fonte.

## Prisma Migrate

A estrutura do banco é controlada utilizando Prisma Migrate.

As migrations registram as alterações realizadas no schema e permitem reproduzir a estrutura do banco em diferentes ambientes.

Para verificar o estado das migrations:

```bash
npx prisma migrate status
```

Para aplicar migrations em produção:

```bash
npx prisma migrate deploy
```

Para gerar o Prisma Client:

```bash
npx prisma generate
```

## Autenticação e Segurança

Uma das partes mais importantes da evolução do projeto foi a implementação da autenticação de maneira mais adequada para um ambiente de produção.

A aplicação utiliza hash de senha, token de autenticação e cookies para controlar a sessão do usuário.

### Hash de senha com bcrypt

As senhas não são armazenadas diretamente em texto puro no banco de dados.

Antes de persistir a senha, ela é transformada em um hash utilizando `bcrypt`.

No login, a senha informada pelo usuário é comparada com o hash armazenado.

O fluxo pode ser representado como:

```text
Senha informada
      │
      ▼
   bcrypt
      │
      ▼
Hash armazenado
```

Durante o login:

```text
Senha informada
      │
      ▼
bcrypt.compare()
      │
      ▼
Hash armazenado
      │
      ├── Compatível → Autenticação
      │
      └── Diferente → Acesso negado
```

Essa abordagem evita armazenar a senha original do usuário no banco de dados.

### Token de autenticação

Após uma autenticação bem-sucedida, a aplicação gera um token que representa a sessão autenticada.

Esse token permite que o Back-End identifique posteriormente se uma requisição pertence a um usuário autenticado.

O fluxo de autenticação segue uma lógica semelhante a:

```text
Usuário
   │
   │ E-mail + senha
   ▼
Front-End
   │
   │ POST /login
   ▼
Back-End
   │
   ├── Busca usuário
   │
   ├── Compara senha com bcrypt
   │
   ├── Gera token
   │
   └── Envia token em cookie
   │
   ▼
Navegador
```

### Cookie

O token de autenticação é armazenado através de cookie.

Isso permite que o navegador envie as informações de autenticação nas requisições posteriores ao Back-End.

A utilização de cookies também permite aplicar configurações de segurança específicas para a sessão.

Entre as configurações utilizadas em uma implementação desse tipo estão:

- `HttpOnly`
- `Secure`
- `SameSite`

Essas configurações ajudam a reduzir riscos relacionados ao acesso e envio indevido do cookie.

### Proteção de acesso

A autenticação não fica restrita ao Front-End.

O Back-End também participa da validação da sessão, verificando o token utilizado na requisição.

Dessa maneira, simplesmente digitar:

```text
/dashboard
```

no navegador não deve ser suficiente para obter acesso aos dados protegidos de um usuário não autenticado.

O fluxo passa a ser:

```text
Acessar recurso protegido
          │
          ▼
Existe autenticação?
       /       \
     Não       Sim
      │         │
      ▼         ▼
 Bloqueia    Valida token
                │
                ▼
        Usuário autenticado
                │
                ▼
        Permite acesso
```

## Variáveis de Ambiente

Informações sensíveis e configurações específicas do ambiente não são armazenadas diretamente no código.

O projeto utiliza variáveis de ambiente para configurações como a conexão com o banco de dados.

Exemplo:

```env
DATABASE_URL="sua_database_url"
```

O arquivo `.env` é ignorado pelo Git.

O projeto utiliza um `.gitignore` semelhante a:

```gitignore
node_modules/
.env
.env.*
!.env.example

.next/
dist/

generated/
```

Isso evita que informações sensíveis e arquivos gerados sejam enviados para o repositório.

## CORS

O Back-End utiliza CORS para controlar a comunicação entre o Front-End e a API.

Durante o desenvolvimento, Front-End e Back-End são executados em portas diferentes.

Em produção, o CORS é configurado considerando a origem utilizada pelo Front-End.

Essa configuração é importante porque o navegador aplica políticas de segurança para requisições realizadas entre origens diferentes.

## Deploy

Depois de funcionar localmente, o projeto foi preparado para produção.

A arquitetura final utiliza serviços separados:

```text
                    INTERNET
                       │
                       ▼
          ┌────────────────────────┐
          │         Vercel         │
          │     Next.js / React    │
          │       Front-End        │
          └───────────┬────────────┘
                      │
                      │ HTTPS
                      ▼
          ┌────────────────────────┐
          │         Render         │
          │     Express / Node     │
          │        Back-End        │
          └───────────┬────────────┘
                      │
                      │ Prisma
                      ▼
          ┌────────────────────────┐
          │          Neon          │
          │      PostgreSQL        │
          │        Database        │
          └────────────────────────┘
```

### Front-End

Hospedado na Vercel:

```text
https://fullstack-login-page-kappa.vercel.app
```

### Back-End

Hospedado no Render:

```text
https://fullstack-login-backend-kmjn.onrender.com
```

### Banco de Dados

Hospedado no Neon utilizando PostgreSQL.

A conexão é realizada através da variável de ambiente `DATABASE_URL`.

## Ambiente Local x Produção

Durante o desenvolvimento, a aplicação utilizava serviços locais:

```text
Front-End
localhost:3000
      │
      ▼
Back-End
localhost:3001
      │
      ▼
PostgreSQL
localhost:5432
```

Depois do deploy, a arquitetura passou a utilizar serviços externos:

```text
Front-End
Vercel
      │
      ▼
Back-End
Render
      │
      ▼
PostgreSQL
Neon
```

Essa mudança foi uma etapa importante do projeto, pois exigiu configurar corretamente a comunicação entre serviços que não estão mais executando na mesma máquina.

## Boas Práticas Aplicadas

- Componentização com React.
- Reutilização de componentes de formulário.
- Separação de responsabilidades no Back-End.
- Separação entre rotas e controllers.
- Tipagem com TypeScript.
- Gerenciamento de estado com React Hooks.
- Context API para dados compartilhados.
- Prisma como ORM.
- PostgreSQL como banco de dados relacional.
- Prisma Migrate para controle da estrutura do banco.
- Variáveis de ambiente para informações sensíveis.
- Configuração de CORS.
- Hash de senhas com bcrypt.
- Utilização de token para autenticação.
- Utilização de cookie para gerenciamento da sessão.
- Validação da autenticação no Back-End.
- Proteção de recursos autenticados.
- Separação entre ambiente local e produção.
- Deploy independente de Front-End, Back-End e banco de dados.

## Aprendizados

Este projeto proporcionou uma evolução importante na compreensão de desenvolvimento Full Stack.

Entre os principais aprendizados estão:

- Como estruturar um projeto com Front-End e Back-End separados.
- Como construir uma API utilizando Express.
- Como conectar uma API ao PostgreSQL utilizando Prisma.
- Como utilizar Prisma Migrate para controlar alterações no banco.
- Como trabalhar com variáveis de ambiente.
- Como configurar CORS.
- Como compartilhar informações entre componentes utilizando Context API.
- Como implementar hash de senhas com bcrypt.
- Como trabalhar com tokens de autenticação.
- Como utilizar cookies para manter uma sessão autenticada.
- Como validar autenticação no Back-End.
- Como proteger recursos que exigem autenticação.
- Como configurar um banco PostgreSQL remoto.
- Como realizar deploy do Front-End e Back-End separadamente.
- Como adaptar uma aplicação inicialmente dependente de `localhost` para produção.
- Como pensar em segurança além da interface do usuário.
- Como integrar diferentes serviços para formar uma aplicação Full Stack completa.

## Status do Projeto

Projeto concluído e funcional em produção.

A aplicação reúne:

- Front-End com Next.js, React, TypeScript e Tailwind CSS.
- API com Express e TypeScript.
- ORM com Prisma.
- Banco de dados PostgreSQL.
- Autenticação com token.
- Hash de senhas com bcrypt.
- Sessão através de cookie.
- Proteção de recursos autenticados.
- Deploy do Front-End na Vercel.
- Deploy do Back-End no Render.
- Banco de dados hospedado no Neon.

## Autor

Desenvolvido por Felipe de Lima Passarelli.
