import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando seed...');

  // 1. Criar administrador
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    throw new Error('ADMIN_EMAIL e ADMIN_PASSWORD devem estar configurados no .env para rodar o seed.');
  }
  
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail }
  });

  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash(adminPassword, 10);
    await prisma.user.create({
      data: {
        name: 'Administrador',
        email: adminEmail,
        passwordHash,
        role: 'ADMIN',
      }
    });
    console.log(`✅ Admin criado: ${adminEmail}`);
  }

  // 2. Criar categorias
  const categoriesData = [
    { name: 'Eletrônicos', slug: 'eletronicos', icon: 'Laptop' },
    { name: 'Celulares', slug: 'celulares', icon: 'Smartphone' },
    { name: 'Casa Inteligente', slug: 'casa-inteligente', icon: 'Home' },
    { name: 'Games', slug: 'games', icon: 'Gamepad2' },
    { name: 'Moda Masculina', slug: 'moda-masculina', icon: 'Shirt' },
    { name: 'Moda Feminina', slug: 'moda-feminina', icon: 'Sparkles' },
    { name: 'Beleza', slug: 'beleza', icon: 'Smile' },
  ];

  const categories = [];
  for (const cat of categoriesData) {
    const existing = await prisma.category.findUnique({ where: { slug: cat.slug } });
    if (!existing) {
      const created = await prisma.category.create({ data: cat });
      categories.push(created);
    } else {
      categories.push(existing);
    }
  }
  console.log('✅ Categorias criadas/verificadas.');

  console.log('Seed finalizado com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
