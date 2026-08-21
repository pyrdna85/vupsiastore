# VUPSIA - Plataforma de Ofertas e Achadinhos

Plataforma desenvolvida com Next.js (App Router), Prisma, MySQL e TailwindCSS.

## Áreas do Sistema

### 1. Área Pública
- `/` - Home page com banners, categorias, destaques e mais procurados.
- `/busca` - Pesquisa de produtos com filtros de texto, categoria e loja.
- `/categoria/[slug]` - Produtos por categoria.
- `/produto/[slug]` - Detalhes do produto, cálculo de desconto, botões de afiliado.
- `/go/[id]` - Rota de redirecionamento para o link de afiliado, contabilizando o clique no banco.
- `/login` e `/cadastro` - Sistema de autenticação nativa e segura (bcrypt + jose JWT).

### 2. Área do Usuário
- `/minha-conta` - Informações pessoais do usuário.
- `/favoritos` - Gerenciamento de produtos salvos como favoritos.

### 3. Painel Administrativo (Protegido)
- `/admin` - Dashboard com estatísticas gerais.
- `/admin/produtos` - CRUD completo de produtos (criação, edição, exclusão, ativação).
- `/admin/categorias` - CRUD de categorias.
- `/admin/banners` - CRUD de banners para a página inicial.
- `/admin/usuarios` - Gestão de permissões de usuários (USER/ADMIN) e status (Ativo/Inativo).

*Todas as ações administrativas são protegidas por Server Actions garantindo validação de segurança no servidor (`role === 'ADMIN'`).*

## Banco de Dados
A plataforma utiliza MySQL hospedado localmente ou remotamente.
O schema (`prisma/schema.prisma`) possui tabelas para `User`, `Category`, `Product`, `ProductImage`, `Favorite`, `Click`, e `Banner`.
**Nunca rode `npx prisma migrate reset` em produção**, pois isso apagaria os dados. Utilize as migrações geradas localmente (`npx prisma migrate deploy`).

## Variáveis de Ambiente
Utilize o arquivo `.env.example` como base:
- `DATABASE_URL` (Conexão do MySQL)
- `AUTH_SECRET` (String segura para assinar JWT. Gere uma string longa e aleatória!)
- `ADMIN_EMAIL` e `ADMIN_PASSWORD` (Usados no `npm run seed`)

## Comandos

### Instalação
```bash
npm install
npx prisma generate
```

### Seed (Criar admin inicial e categorias)
```bash
npm run seed
```

### Desenvolvimento
```bash
npm run dev
```

### Build e Produção
```bash
npm run build
node .next/standalone/server.js
```
*O build foi configurado com `output: 'standalone'` no `next.config.ts`, ideal para rodar com PM2 ou Docker numa VPS Linux.*
