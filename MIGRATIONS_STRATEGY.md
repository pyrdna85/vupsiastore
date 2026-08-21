# Estratégia de Migrações (Prisma)

O banco de dados de produção (MySQL) já foi criado e sincronizado nas versões anteriores (possivelmente usando `prisma db push`).

Para evitar a perda de dados e preparar o terreno para o uso seguro de `prisma migrate` no futuro, estabelecemos uma "baseline" (linha de base) das migrações.

## O que foi feito
1. O estado atual do banco foi mapeado em `prisma/schema.prisma`.
2. A partir de agora, novas alterações de banco NÃO devem usar `prisma db push` em produção.

## Como fazer novas alterações no banco de dados

1. Altere o arquivo `prisma/schema.prisma` conforme necessário.
2. Em ambiente de desenvolvimento local (NÃO na VPS de produção), execute:
   ```bash
   npx prisma migrate dev --name <nome_da_alteracao>
   ```
   Isso gerará um arquivo `.sql` na pasta `prisma/migrations`.
3. Adicione a nova migration ao controle de versão (Git).
4. Na VPS de produção (durante o deploy), o script executará:
   ```bash
   npx prisma migrate deploy
   ```
   Isso aplicará apenas as novas migrações, sem apagar os dados existentes.

## Aviso de Segurança
NUNCA execute `npx prisma migrate reset` ou `npx prisma db push --force-reset` em produção, pois essas operações apagam completamente o banco de dados.
