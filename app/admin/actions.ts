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

export async function createCategory(data: any) {
  await requireAdmin();
  await prisma.category.create({ data });
  revalidatePath('/admin/categorias');
  revalidatePath('/');
}

export async function updateCategory(id: string, data: any) {
  await requireAdmin();
  await prisma.category.update({ where: { id }, data });
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
  await prisma.product.create({ data });
  revalidatePath('/admin/produtos');
  revalidatePath('/');
}

export async function updateProduct(id: string, data: any) {
  await requireAdmin();
  await prisma.product.update({ where: { id }, data });
  revalidatePath('/admin/produtos');
  revalidatePath('/');
}

export async function deleteProduct(id: string) {
  await requireAdmin();
  await prisma.product.delete({ where: { id } });
  revalidatePath('/admin/produtos');
  revalidatePath('/');
}

export async function createBanner(data: any) {
  await requireAdmin();
  await prisma.banner.create({ data });
  revalidatePath('/admin/banners');
  revalidatePath('/');
}

export async function updateBanner(id: string, data: any) {
  await requireAdmin();
  await prisma.banner.update({ where: { id }, data });
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
