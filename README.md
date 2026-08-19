# Login Page with Prisma

Aplicação Full Stack de cadastro e login desenvolvida com Next.js, React, TypeScript, Express, Prisma e PostgreSQL.

## Descrição

O projeto consiste em uma aplicação de autenticação com fluxo de cadastro, login e acesso a uma página de dashboard.

A aplicação é dividida em duas partes:

- **Front-End:** desenvolvido com Next.js, React, TypeScript e TailwindCSS.
- **Back-End:** desenvolvido com Express, TypeScript, Prisma e PostgreSQL.

O Front-End envia os dados dos formulários para uma API REST criada com Express. O Back-End recebe essas informações, realiza as validações necessárias e utiliza o Prisma para consultar ou inserir usuários no banco de dados PostgreSQL.

Após um login bem-sucedido, os dados retornados pela API são armazenados em um Context do React e o usuário é direcionado para o dashboard.

## Tecnologias Utilizadas

### Front-End

- Next.js
- React
- TypeScript
- TailwindCSS
- Context API
- Fetch API

### Back-End

- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- CORS

## Arquitetura

O projeto possui uma separação entre Front-End e Back-End:

```text
┌─────────────────────┐
│      Front-End      │
│ Next.js + React     │
│ TypeScript          │
│ TailwindCSS         │
└──────────┬──────────┘
           │
           │ HTTP / JSON
           ▼
┌─────────────────────┐
│       Back-End      │
│ Express + TypeScript│
│       Prisma        │
└──────────┬──────────┘
           │
           │ Prisma
           ▼
┌─────────────────────┐
│     PostgreSQL      │
│        User         │
└─────────────────────┘
```

## Funcionalidades

- Cadastro de usuários.
- Login de usuários.
- Verificação de e-mail já cadastrado.
- Validação básica dos campos de cadastro.
- Validação de senha e confirmação de senha.
- Verificação de credenciais no login.
- Exibição de mensagens de erro.
- Redirecionamento para o dashboard após login.
- Exibição dos dados do usuário logado.
- Navegação entre login, cadastro e dashboard.
- Comunicação entre Front-End e Back-End através de API REST.
- Persistência dos usuários em PostgreSQL.

## Rotas da API

O Back-End possui duas rotas relacionadas aos usuários.

### `POST /login`

Responsável por verificar as credenciais fornecidas pelo usuário.

Exemplo de requisição:

```json
{
  "email": "usuario@email.com",
  "password": "senha"
}
```

Em caso de credenciais inválidas, a API retorna:

```json
{
  "message": "Email ou senha inválidos"
}
```

Em caso de sucesso, os dados do usuário encontrado são retornados.

### `POST /cadastro`

Responsável pelo cadastro de novos usuários.

Exemplo de requisição:

```json
{
  "name": "Nome do Usuário",
  "email": "usuario@email.com",
  "password": "senha"
}
```

Caso o e-mail já esteja cadastrado, a API retorna status `400` com:

```json
{
  "message": "Email já cadastrado"
}
```

Em caso de sucesso:

```json
{
  "message": "Cadastro realizado com sucesso!"
}
```

## Estrutura do Projeto

Estrutura baseada nos arquivos informados:

```text
projeto/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── controller/
│   │   │   └── user-controller.ts
│   │   ├── db.ts
│   │   └── routes.ts
│   └── index.ts
│
└── frontend/
    └── src/
        ├── app/
        │   ├── dashboard/
        │   │   └── page.tsx
        │   ├── register/
        │   │   └── page.tsx
        │   ├── globals.css
        │   ├── layout.tsx
        │   └── page.tsx
        ├── components/
        │   ├── Input.tsx
        │   └── InputLogin.tsx
        ├── context/
        │   └── UserContext.tsx
        └── utils/
            └── ComponentsStyle.ts
```

## Back-End

### `index.ts`

É o ponto de entrada da API.

Responsabilidades:

- Inicializar o Express.
- Habilitar o recebimento de JSON.
- Configurar o CORS.
- Registrar as rotas.
- Inicializar a conexão com o banco.
- Iniciar o servidor na porta `3001`.

### `routes.ts`

Centraliza as rotas relacionadas aos usuários:

```ts
router.post("/login", login);
router.post("/cadastro", register);
```

### `user-controller.ts`

Contém a lógica das operações de login e cadastro.

No login, o Back-End consulta o usuário através do Prisma utilizando e-mail e senha.

No cadastro, primeiro verifica se o e-mail já existe e, caso não exista, cria um novo usuário no banco.

### `db.ts`

Responsável pela configuração da conexão entre Prisma e PostgreSQL utilizando o adaptador `@prisma/adapter-pg`.

A URL de conexão é obtida através da variável de ambiente `DATABASE_URL`.

### `schema.prisma`

Define o modelo de usuário utilizado pelo banco de dados:

```prisma
model User {
  id       String @id @default(uuid())
  name     String
  password String
  email    String @unique
}
```

O campo `email` possui uma restrição de unicidade, impedindo que dois usuários sejam cadastrados com o mesmo endereço.

## Front-End

### `layout.tsx`

Define a estrutura global da aplicação e envolve as páginas com o `UserProvider`.

Isso permite que os dados do usuário logado sejam compartilhados entre os componentes que utilizam o contexto.

### Página de Login

A página inicial contém os campos de e-mail e senha e realiza uma requisição `POST` para a API:

```ts
const response = await fetch("http://localhost:3001/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: user.Email,
    password: user.Senha,
  }),
});
```

Após uma resposta bem-sucedida, os dados do usuário são armazenados no `UserContext` e o usuário é direcionado para:

```text
/dashboard
```

### Página de Cadastro

A página de cadastro recebe:

- Nome.
- E-mail.
- Senha.
- Confirmação de senha.

Antes de enviar os dados para a API, são realizadas validações básicas no próprio Front-End.

Após o cadastro bem-sucedido, o usuário é redirecionado para a página de login.

### Dashboard

O dashboard utiliza o `UserContext` para acessar os dados do usuário que realizou o login.

São exibidos:

- Nome.
- E-mail.
- ID.

### `Input.tsx`

Componente reutilizável utilizado pelos campos da página de cadastro.

Recebe propriedades como:

- Nome do campo.
- Tipo do input.
- Placeholder.
- Estado atual.
- Função para atualização do estado.

### `InputLogin.tsx`

Componente reutilizável específico para os campos da página de login.

### `UserContext.tsx`

Responsável pelo gerenciamento global dos dados do usuário logado utilizando a Context API do React.

O contexto disponibiliza:

```ts
loggedUser;
setLoggedUser;
```

Isso permite que diferentes páginas da aplicação tenham acesso aos dados do usuário após o login.

## Fluxo da Aplicação

### Cadastro

```text
Usuário
   │
   ▼
Página de Cadastro
   │
   │ POST /cadastro
   ▼
Express
   │
   ▼
Controller
   │
   ▼
Prisma
   │
   ▼
PostgreSQL
```

Após o cadastro, o usuário retorna para a página de login.

### Login

```text
Usuário
   │
   ▼
Página de Login
   │
   │ POST /login
   ▼
Express
   │
   ▼
Controller
   │
   ▼
Prisma
   │
   ▼
PostgreSQL
   │
   ▼
Dados do usuário
   │
   ▼
UserContext
   │
   ▼
Dashboard
```

## Variáveis de Ambiente

O Back-End utiliza uma variável de ambiente para realizar a conexão com o PostgreSQL

## Configuração do Back-End

Acesse a pasta do Back-End:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

Configure o arquivo `.env` com a variável `DATABASE_URL`.

Depois, configure o Prisma conforme o banco de dados utilizado e execute as migrações necessárias.

O servidor é iniciado na porta:

```text
3001
```

## Configuração do Front-End

Acesse a pasta do Front-End:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Execute o projeto:

```bash
npm run dev
```

Por padrão, o Next.js ficará disponível em:

```text
http://localhost:3000
```

O Back-End utilizado pelo Front-End está configurado para:

```text
http://localhost:3001
```

## Boas Práticas Aplicadas

### Front-End

- Componentização da interface.
- Criação de componentes reutilizáveis para inputs.
- Separação de responsabilidades entre páginas, componentes, contexto e utilitários.
- Tipagem dos dados utilizando TypeScript.
- Gerenciamento de estado com `useState`.
- Gerenciamento de estado global utilizando Context API.
- Uso do `useRouter` para navegação programática.
- Renderização de mensagens de erro.
- Separação dos estilos reutilizáveis em uma constante.
- Utilização do App Router do Next.js.

### Back-End

- Separação das rotas e controllers.
- Utilização do Express para criação da API.
- Tipagem com TypeScript.
- Utilização do Prisma como ORM.
- Persistência dos dados em PostgreSQL.
- Configuração do CORS.
- Uso de variáveis de ambiente para a conexão com o banco.
- Restrição de e-mail único no modelo do Prisma.

### Integração

- Comunicação entre Front-End e Back-End utilizando HTTP.
- Envio e recebimento de dados no formato JSON.
- Separação entre interface, API e banco de dados.
- Fluxo completo de cadastro e login.

## Aprendizados

Este projeto permitiu praticar conceitos que vão além do desenvolvimento isolado de interfaces.

Entre os principais aprendizados estão:

- Como estruturar uma aplicação separando Front-End e Back-End.
- Como criar uma API utilizando Express e TypeScript.
- Como organizar rotas e controllers.
- Como conectar uma API a um banco PostgreSQL utilizando Prisma.
- Como modelar dados utilizando o Prisma Schema.
- Como consumir uma API criada pelo próprio projeto através do `fetch`.
- Como enviar dados de formulários utilizando requisições HTTP.
- Como compartilhar informações entre páginas utilizando Context API.
- Como integrar diferentes tecnologias dentro de uma mesma aplicação.
- Como organizar responsabilidades entre as diferentes camadas de um sistema.

## Observação sobre Autenticação e Segurança

Este projeto foi desenvolvido com foco em aprendizado e integração Full Stack.

A implementação atual **não utiliza um sistema de autenticação baseado em sessão ou token**, como JWT, e as senhas são armazenadas diretamente no banco de dados.

Em uma aplicação de produção, seria necessário implementar mecanismos adicionais de segurança, principalmente:

- Hash de senhas com uma biblioteca apropriada.
- Autenticação baseada em sessão ou tokens.
- Proteção das rotas privadas.
- Validação mais robusta dos dados recebidos pela API.
- Tratamento adequado de erros no servidor.
- Configuração de variáveis de ambiente para diferentes ambientes.
- Controle de acesso ao dashboard.

## Autor

Desenvolvido por Felipe de Lima Passarelli.
