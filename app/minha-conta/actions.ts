'use server';

import { getSession } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import bcrypt from 'bcryptjs';

export async function updateProfile(data: { name: string; password?: string }) {
  const session = await getSession();
  if (!session) {
    throw new Error('Unauthorized');
  }

  const updateData: any = { name: data.name };
  
  if (data.password && data.password.trim().length > 0) {
    if (data.password.length < 8) {
      throw new Error('A senha deve ter pelo menos 8 caracteres.');
    }
    updateData.passwordHash = await bcrypt.hash(data.password, 10);
  }

  await prisma.user.update({
    where: { id: session.userId },
    data: updateData,
  });

  revalidatePath('/minha-conta');
}
