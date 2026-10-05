# BookStore Manager CLI

Sistema CLI de gerenciamento de livraria desenvolvido com Node.js, TypeScript e PostgreSQL.

O sistema permite gerenciar autores, livros, clientes e empréstimos, além de disponibilizar relatórios sobre os dados cadastrados.

## Objetivo

O objetivo do projeto é desenvolver uma aplicação de linha de comando para gerenciamento de uma livraria, permitindo o cadastro e gerenciamento de autores, livros e clientes, o controle de empréstimos e devoluções e a consulta de relatórios sobre os dados armazenados.

## Tecnologias utilizadas

- Node.js
- TypeScript
- PostgreSQL
- pg
- dotenv
- readline/promises
- Git e GitHub

## Requisitos

Para executar o projeto, é necessário ter instalado:

- Node.js
- PostgreSQL
- npm
- Git

## Instalação

Clone o repositório:

```bash
git clone https://github.com/zKILLAyt/bookstore-manager-cli.git
```

Entre na pasta do projeto:

```bash
cd bookstore-manager-cli
```

Instale as dependências:

```bash
npm install
```

## Configuração do banco de dados

Crie um banco de dados PostgreSQL chamado:

```text
bookstore
```

Depois, execute o script localizado em:

```text
database/database.sql
```

Esse script cria as tabelas necessárias para o funcionamento do sistema:

- autores
- livros
- clientes
- emprestimos

## Configuração das variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=bookstore
DB_USER=postgres
DB_PASSWORD=SUA_SENHA
```

Substitua `SUA_SENHA` pela senha do seu usuário do PostgreSQL.

## Execução

Para executar o projeto em modo de desenvolvimento:

```bash
npm run dev
```

Para compilar o projeto:

```bash
npm run build
```

Para executar a versão compilada:

```bash
npm start
```

## Estrutura do projeto

```text
bookstore-manager-cli/
│
├── database/
│   └── database.sql
│
├── src/
│   ├── controllers/
│   ├── database/
│   ├── menus/
│   ├── models/
│   ├── repositories/
│   ├── services/
│   ├── utils/
│   └── main.ts
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── tsconfig.json
```

## Funcionalidades

### Autores

Permite:

- Cadastrar autores
- Listar autores
- Buscar autor por ID
- Atualizar autores
- Remover autores

### Livros

Permite:

- Cadastrar livros
- Listar livros
- Buscar livro por ID
- Atualizar livros
- Remover livros
- Associar livros a autores existentes

### Clientes

Permite:

- Cadastrar clientes
- Listar clientes
- Buscar cliente por ID
- Atualizar clientes
- Remover clientes

### Empréstimos

Permite:

- Registrar empréstimos
- Listar empréstimos
- Buscar empréstimo por ID
- Registrar devoluções
- Validar existência do livro
- Validar existência do cliente
- Validar disponibilidade do livro

### Relatórios

O sistema possui os seguintes relatórios:

1. Livros disponíveis
2. Livros emprestados
3. Livros por autor
4. Quantidade de empréstimos por livro
5. Clientes com empréstimos ativos

## Arquitetura

O projeto utiliza uma arquitetura dividida em camadas:

- **Models:** representam as entidades do sistema.
- **Repositories:** responsáveis pelo acesso e operações no banco de dados.
- **Services:** concentram as regras de negócio e validações.
- **Controllers:** controlam as operações e tratam os erros.
- **Menus:** responsáveis pela interação do usuário através do terminal.
- **Database:** responsável pela conexão com o PostgreSQL.
- **Utils:** destinada a funções utilitárias do projeto.

Essa separação permite organizar as responsabilidades de cada parte do sistema.

## Menu principal

Ao iniciar o sistema, o usuário encontra as opções:

```text
=== BOOKSTORE MANAGER CLI ===

1. Autores
2. Livros
3. Clientes
4. Empréstimos
5. Relatórios
0. Sair
```

## Banco de dados

O sistema utiliza PostgreSQL para persistência dos dados.

As entidades possuem relacionamentos através de chaves estrangeiras:

```text
Autores
   │
   └── Livros
          │
          └── Empréstimos
                 │
                 └── Clientes
```

Os comandos SQL são executados diretamente através da biblioteca `pg`.

## Consultas e relatórios

Os relatórios utilizam consultas relacionais ao banco de dados, incluindo:

- `INNER JOIN`
- `LEFT JOIN`
- `GROUP BY`
- `ORDER BY`
- `LIMIT`
- Funções de agregação

## Exemplos de uso

### Cadastro de autor

No menu principal:

```text
1. Autores
```

Depois, selecione a opção de cadastro e informe o nome do autor.

### Cadastro de livro

No menu principal:

```text
2. Livros
```

Informe o título, a quantidade disponível e o ID de um autor já cadastrado.

### Cadastro de cliente

No menu principal:

```text
3. Clientes
```

Informe o nome do cliente.

### Registro de empréstimo

No menu principal:

```text
4. Empréstimos
```

Informe o ID do livro e o ID do cliente. O sistema verifica se ambos existem e se o livro possui quantidade disponível.

### Relatórios

No menu principal:

```text
5. Relatórios
```

O sistema apresenta as opções de consulta disponíveis, incluindo livros disponíveis, livros emprestados, livros por autor, quantidade de empréstimos por livro e clientes com empréstimos ativos.

## Git

O projeto utiliza Git para controle de versão e GitHub para armazenamento do repositório.

Principais branches utilizadas:

```text
main
develop
feat/autores
feat/livros
feat/clientes
feat/emprestimos
docs/readme
```

## Kanban

O acompanhamento das tarefas do projeto é realizado através do Trello:

https://trello.com/b/lSydOqyL/gerente-de-livraria-cli

## Integrante

- Gustavo

## Autor

Projeto desenvolvido como atividade avaliativa do curso de Back-end com Node.js, TypeScript e PostgreSQL.
