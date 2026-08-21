# VUPSIA - Plataforma de Ofertas e Achadinhos

Vupsia é uma plataforma profissional para descoberta de produtos, ofertas e recomendações de lojas como Amazon, Shopee, Magazine Luiza, Shein e outras parceiras.

## 1. Requisitos

- **Sistema Operacional:** Ubuntu 22.04 (Recomendado para VPS) ou Windows/macOS/Linux para desenvolvimento local.
- **Node.js:** Versão 22 ou superior.
- **Banco de Dados:** MySQL 8.0 ou superior.
- **Gerenciador de Processos:** PM2 (para produção).
- **Servidor Web:** Nginx (para produção, como reverse proxy).

## 2. Instalação

Clone o repositório e acesse a pasta do projeto:

```bash
git clone https://github.com/seu-usuario/vupsia.git
cd vupsia
```

## 3. Configuração do MySQL

Certifique-se de que o MySQL está rodando na sua máquina. Crie um banco de dados para a aplicação:

```sql
CREATE DATABASE vupsia CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

## 4. Configuração do .env

Copie o arquivo `.env.example` para `.env` e configure as variáveis:

```bash
cp .env.example .env
```

Edite o `.env` com suas credenciais:

```env
DATABASE_URL="mysql://USUARIO:SENHA@127.0.0.1:3306/vupsia"
AUTH_SECRET="sua_chave_secreta_super_segura_aqui_com_pelo_menos_32_caracteres"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
ADMIN_EMAIL="admin@vupsia.com.br"
ADMIN_PASSWORD="sua_senha_segura"
```

## 5. Instalação das dependências

```bash
npm install
```

## 6. Criação das tabelas Prisma

Com o banco de dados rodando e a `DATABASE_URL` configurada, execute as migrations:

```bash
npx prisma migrate dev --name init
```

Isso criará todas as tabelas no MySQL.

## 7. Seed (Dados Iniciais)

*Importante: Os dados gerados pelo seed são **fictícios** e servem apenas para demonstração do sistema. Não contêm links de afiliados reais.*

Para popular o banco com categorias, produtos fictícios e criar o seu usuário Administrador (usando as credenciais do .env):

```bash
npm run seed
```

## 8. Execução em Desenvolvimento

Para rodar o projeto localmente em modo de desenvolvimento:

```bash
npm run dev
```

Acesse `http://localhost:3000`

## 9. Build (Produção)

Antes de rodar em produção, você precisa compilar o projeto:

```bash
npm run build
```

## 10. Execução em Produção e PM2

Na sua VPS, após o build, utilize o PM2 para manter a aplicação rodando em background:

```bash
npm install -g pm2
pm2 start npm --name "vupsia" -- run start
pm2 save
pm2 startup
```

## 11. Configuração do Nginx (Exemplo)

Crie um bloco de servidor no Nginx (`/etc/nginx/sites-available/vupsia`):

```nginx
server {
    listen 80;
    server_name vupsia.com.br www.vupsia.com.br;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Habilite o site e reinicie o Nginx:

```bash
ln -s /etc/nginx/sites-available/vupsia /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

## 12. Variáveis de Ambiente

- `DATABASE_URL`: String de conexão do MySQL.
- `AUTH_SECRET`: Segredo utilizado para assinar os tokens JWT de sessão.
- `NEXT_PUBLIC_SITE_URL`: URL base do site.
- `ADMIN_EMAIL` e `ADMIN_PASSWORD`: Credenciais para criação do admin via seed.

## 13. Estrutura do Projeto

- `app/`: Rotas da aplicação (App Router do Next.js).
- `components/`: Componentes React reutilizáveis (UI, Layout).
- `lib/`: Configurações e utilitários globais (Prisma, Auth).
- `services/`: Camada de abstração de dados (interação com Prisma).
- `prisma/`: Schema do banco de dados e script de Seed.
- `types/`: Definições de tipos TypeScript.

## 14. Como criar administrador

A forma mais fácil de criar o primeiro administrador é configurando `ADMIN_EMAIL` e `ADMIN_PASSWORD` no `.env` e rodando `npm run seed`. O sistema criará o usuário com hash de senha seguro.

## 15. Como fazer Deploy (Resumo)

1. Clone o projeto na VPS.
2. Configure o `.env`.
3. `npm install`
4. `npx prisma generate`
5. `npx prisma migrate deploy`
6. `npm run build`
7. `pm2 start npm --name "vupsia" -- start`
8. Configure Nginx e SSL (Certbot).
