import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando seed...');

  // 1. Criar administrador
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@vupsia.com.br';
  const adminPassword = process.env.ADMIN_PASSWORD || '123456';
  
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

  // 3. Criar Banners
  const bannersCount = await prisma.banner.count();
  if (bannersCount === 0) {
    await prisma.banner.createMany({
      data: [
        {
          title: 'As melhores ofertas',
          subtitle: 'Encontre os melhores preços de toda a internet',
          imageUrl: 'https://picsum.photos/seed/vupsia1/1200/400',
          linkUrl: '/busca',
          active: true,
          position: 1
        },
        {
          title: 'Especial Smartphones',
          subtitle: 'Até 50% de desconto',
          imageUrl: 'https://picsum.photos/seed/vupsia2/1200/400',
          linkUrl: '/categoria/celulares',
          active: true,
          position: 2
        }
      ]
    });
    console.log('✅ Banners criados.');
  }

  // 4. Criar produtos fictícios se não houver
  const productsCount = await prisma.product.count();
  if (productsCount === 0 && categories.length > 0) {
    const eletronicos = categories.find(c => c.slug === 'eletronicos')?.id;
    const celulares = categories.find(c => c.slug === 'celulares')?.id;

    if (eletronicos && celulares) {
      await prisma.product.create({
        data: {
          name: 'Fone Bluetooth XYZ Noise Cancelling',
          slug: 'fone-bluetooth-xyz',
          description: '<p>O melhor fone do mercado.</p>',
          shortDescription: 'O melhor fone do mercado com cancelamento de ruído.',
          price: 149.90,
          oldPrice: 299.90,
          discountPercentage: 50,
          imageUrl: 'https://picsum.photos/seed/fone1/600/600',
          store: 'Amazon',
          affiliateUrl: 'https://amazon.com.br/placeholder',
          featured: true,
          freeShipping: true,
          categoryId: eletronicos,
        }
      });

      await prisma.product.create({
        data: {
          name: 'Smartphone Super Max 128GB',
          slug: 'smartphone-super-max',
          description: '<p>Smartphone de última geração.</p>',
          shortDescription: 'Smartphone com tela OLED de 6.5" e bateria gigante.',
          price: 1299.00,
          oldPrice: 1599.00,
          discountPercentage: 18,
          imageUrl: 'https://picsum.photos/seed/phone1/600/600',
          store: 'Shopee',
          affiliateUrl: 'https://shopee.com.br/placeholder',
          featured: true,
          fastDelivery: true,
          categoryId: celulares,
        }
      });

      console.log('✅ Produtos fictícios criados.');
    }
  }

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
