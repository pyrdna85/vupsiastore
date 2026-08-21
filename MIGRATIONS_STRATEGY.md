# Estratégia de Migrations para Produção

Este projeto utiliza o Prisma ORM. Como o banco de dados já contém dados em produção e não possuía o histórico de migrations, adotamos a estratégia de **Baselining**.

## O que foi feito
1. Foi criada a migration inicial (`0_init`) baseada no schema atual do banco.
2. Esta migration representa o estado exato do banco de dados existente.

## Passo a passo para o Deploy inicial (Baselining)
No ambiente de produção (com o banco real), execute o seguinte comando **uma única vez** para informar ao Prisma que a estrutura atual já está aplicada e que ele não deve tentar criar as tabelas novamente:

```bash
npx prisma migrate resolve --applied 0_init
```

## Como aplicar novas alterações
Sempre que houver alteração no arquivo `prisma/schema.prisma`, gere uma nova migration em ambiente de desenvolvimento:

```bash
npx prisma migrate dev --name nome_da_alteracao
```

No ambiente de produção, durante o processo de deploy, aplique as novas migrations utilizando o comando:

```bash
npx prisma migrate deploy
```

**Aviso Importante:** Nunca utilize `npx prisma migrate reset` ou `npx prisma db push` em ambiente de produção, pois isso pode causar perda irreversível de dados.
