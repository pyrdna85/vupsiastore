
import prisma from '@/lib/prisma';
import UserClient from './UserClient';



export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      active: true,
      createdAt: true
    }
  });

  return <UserClient users={users} />;
}

export const dynamic = 'force-dynamic';
