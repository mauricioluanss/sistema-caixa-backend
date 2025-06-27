Instruções para rodar o banco de dados do projeto

Siga os passos abaixo para configurar e rodar o banco de dados localmente:

1. Instale o MySQL  
   Certifique-se de ter o MySQL instalado e rodando na sua máquina.

2. Crie o banco de dados  
   Crie um banco de dados no MySQL para o projeto. Exemplo:
   ```sql
   CREATE DATABASE nome_do_banco;
   ```

3. Clone o repositório  
   Baixe o projeto do GitHub:
   ```sh
   git clone https://github.com/mauricioluanss/sistema-caixa-backend
   ```

4. Configure a string de conexão  
   No arquivo `.env` (ou diretamente em `prisma/schema.prisma`), ajuste a variável `DATABASE_URL` com os dados do banco. Exemplo:
   ```
   DATABASE_URL="mysql://usuario:senha@localhost:3306/nome_do_banco"
   ```

5. Instale as dependências  
   Execute:
   ```sh
   npm install
   ```

6. Rode as migrations para criar as tabelas  
   Execute:
   ```sh
   npx prisma migrate dev --name init
   ```
   Isso vai criar todas as tabelas no banco conforme o schema.

7. Pronto!  

Observação:  
Se precisar rodar novamente as migrations ou atualizar o banco após mudanças no schema, basta repetir o passo 6.
