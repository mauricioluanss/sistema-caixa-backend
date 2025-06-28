# API do Sistema de Caixa (Back-end)

Este repositório contém o código-fonte para o **serviço de back-end** do projeto de estudo "Sistema de Caixa".

## Descrição

Esta API RESTful é responsável por gerenciar as entidades do sistema, como Produtos, Vendas e Operadores. Ela se comunica com um banco de dados MySQL e oferece endpoints para operações de CRUD (Create, Read, Update, Delete).

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript no servidor.
- **Express.js**: Framework para a construção das rotas e da API.
- **Prisma**: ORM para a comunicação com o banco de dados.
- **MySQL**: Banco de dados relacional (rodando via Docker).
- **Docker**: Para a criação de um ambiente de banco de dados consistente.
- **PhpMyAdmin**: Para visualização das entiades via browser (includído no docker-compse.yml).

## Pré-requisitos

Antes de começar, você precisará ter as seguintes ferramentas instaladas na sua máquina:

- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)
- [Docker](https://docs.docker.com/engine/install/) (Docker Desktop ou Docker Engine)

## Configuração do Ambiente

Siga os passos abaixo para configurar e rodar o projeto localmente.

**1. Clone o Repositório:**

```bash
git clone https://github.com/mauricioluanss/sistema-caixa-backend
cd sistema-caixa-backend
```

**2. Instale as Dependências:**
Este comando instalará o Express, Prisma, e todas as outras dependências do back-end.

```bash
npm install
```

**3. Configure as Variáveis de Ambiente:**
O back-end precisa de um arquivo `.env` para se conectar ao banco de dados.

- Crie um arquivo chamado `.env` na raiz deste projeto.
- Copie o conteúdo do arquivo `.env.example` para dentro dele, ou adicione a seguinte linha, substituindo os valores se necessário:

  ```
  DATABASE_URL="mysql://root:root@localhost:3306/caixa"
  ```

  _(Esta string de conexão deve corresponder à configuração do seu `docker-compose.yml`)_

**4. Inicie o Banco de Dados com Docker:**
Este comando irá criar e iniciar o contêiner do MySQL em segundo plano. Ele deve ser executado na raiz deste projeto (onde o `docker-compose.yml` está).

```bash
docker compose up -d
```

**5. Rode as Migrações do Banco de Dados:**
Este comando irá criar todas as tabelas necessárias no seu novo banco de dados.

```bash
npx prisma migrate dev
```

## Rodando a Aplicação

Para iniciar o servidor em modo de desenvolvimento (com `nodemon`), execute:

```bash
npm run dev
```

> Beleza,a API estará rodando e pronta para receber requisições em `http://localhost:porta que tu definiu`.

## Endpoints da API (Produtos)

- `POST /api/produtos`: Cria um novo produto.
- `GET /api/produtos`: Lista todos os produtos.
- `GET /api/produtos/:id`: Busca um produto específico pelo ID.
- `PUT /api/produtos/:id`: Atualiza um produto existente.
- `DELETE /api/produtos/:id`: Deleta um produto.

## Endpoints da API (Vendas)

- Em desenvolvimento...
