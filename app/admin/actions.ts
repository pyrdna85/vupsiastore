'use server';

import { getSession } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

async function requireAdmin() {
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') {
    throw new Error('Unauthorized');
  }
}

function sanitizeSlug(text: string) {
  let baseSlug = text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
  
  if (baseSlug.length > 150) {
    baseSlug = baseSlug.substring(0, 150).replace(/-$/, '');
  }
  return baseSlug || 'item';
}

async function ensureUniqueSlug(model: 'product' | 'category', slug: string, excludeId?: string) {
  let counter = 1;
  let currentSlug = slug;
  let isUnique = false;

  while (!isUnique) {
    const existing = model === 'product'
      ? await prisma.product.findUnique({ where: { slug: currentSlug } })
      : await prisma.category.findUnique({ where: { slug: currentSlug } });
      
    if (!existing || existing.id === excludeId) {
      isUnique = true;
    } else {
      currentSlug = `${slug}-${counter}`;
      counter++;
    }
  }
  return currentSlug;
}

function filterCategoryData(data: any) {
  return {
    name: data.name,
    description: data.description,
    icon: data.icon,
    imageUrl: data.imageUrl,
    active: data.active,
  };
}

function filterProductData(data: any) {
  return {
    name: data.name,
    description: data.description,
    shortDescription: data.shortDescription,
    price: data.price,
    oldPrice: data.oldPrice,
    discountPercentage: data.discountPercentage,
    imageUrl: data.imageUrl,
    store: data.store,
    affiliateUrl: data.affiliateUrl,
    active: data.active,
    featured: data.featured,
    freeShipping: data.freeShipping,
    fastDelivery: data.fastDelivery,
    categoryId: data.categoryId,
  };
}

export async function createCategory(data: any) {
  await requireAdmin();
  const filteredData = filterCategoryData(data);
  const baseSlug = sanitizeSlug(data.slug || data.name);
  const slug = await ensureUniqueSlug('category', baseSlug);
  
  await prisma.category.create({ data: { ...filteredData, slug } });
  revalidatePath('/admin/categorias');
  revalidatePath('/');
}

export async function updateCategory(id: string, data: any) {
  await requireAdmin();
  const filteredData = filterCategoryData(data);
  
  const baseSlug = sanitizeSlug(data.slug || data.name);
  const slug = await ensureUniqueSlug('category', baseSlug, id);
  
  await prisma.category.update({ where: { id }, data: { ...filteredData, slug } });
  revalidatePath('/admin/categorias');
  revalidatePath('/');
}

export async function deleteCategory(id: string) {
  await requireAdmin();
  await prisma.category.delete({ where: { id } });
  revalidatePath('/admin/categorias');
  revalidatePath('/');
}

export async function createProduct(data: any) {
  await requireAdmin();
  const filteredData = filterProductData(data);
  const baseSlug = sanitizeSlug(data.slug || data.name);
  const slug = await ensureUniqueSlug('product', baseSlug);
  
  await prisma.product.create({ data: { ...filteredData, slug } });
  revalidatePath('/admin/produtos');
  revalidatePath('/');
}

export async function updateProduct(id: string, data: any) {
  await requireAdmin();
  const filteredData = filterProductData(data);
  
  const baseSlug = sanitizeSlug(data.slug || data.name);
  const slug = await ensureUniqueSlug('product', baseSlug, id);
  
  await prisma.product.update({ where: { id }, data: { ...filteredData, slug } });
  revalidatePath('/admin/produtos');
  revalidatePath('/');
}

export async function deleteProduct(id: string) {
  await requireAdmin();
  await prisma.product.delete({ where: { id } });
  revalidatePath('/admin/produtos');
  revalidatePath('/');
}

function filterBannerData(data: any) {
  return {
    title: data.title,
    subtitle: data.subtitle,
    imageUrl: data.imageUrl,
    linkUrl: data.linkUrl,
    active: data.active,
    position: Number(data.position) || 0,
  };
}

export async function createBanner(data: any) {
  await requireAdmin();
  await prisma.banner.create({ data: filterBannerData(data) });
  revalidatePath('/admin/banners');
  revalidatePath('/');
}

export async function updateBanner(id: string, data: any) {
  await requireAdmin();
  await prisma.banner.update({ where: { id }, data: filterBannerData(data) });
  revalidatePath('/admin/banners');
  revalidatePath('/');
}

export async function deleteBanner(id: string) {
  await requireAdmin();
  await prisma.banner.delete({ where: { id } });
  revalidatePath('/admin/banners');
  revalidatePath('/');
}

export async function updateUserRole(id: string, role: string) {
  await requireAdmin();
  await prisma.user.update({ where: { id }, data: { role } });
  revalidatePath('/admin/usuarios');
}

export async function toggleUserStatus(id: string, active: boolean) {
  await requireAdmin();
  await prisma.user.update({ where: { id }, data: { active } });
  revalidatePath('/admin/usuarios');
}
