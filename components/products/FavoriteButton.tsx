'use client';

import { Heart } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface FavoriteButtonProps {
  productId: string;
  initialIsFavorite?: boolean;
}

export function FavoriteButton({ productId, initialIsFavorite = false }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setLoading(true);
    try {
      const res = await fetch('/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      });
      
      if (res.status === 401) {
        router.push('/login');
        return;
      }
      
      if (res.ok) {
        setIsFavorite(!isFavorite);
        router.refresh();
      }
    } catch (error) {
      console.error('Failed to toggle favorite', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={toggleFavorite}
      disabled={loading}
      className={`absolute top-3 left-3 p-2 rounded-full backdrop-blur-md transition-all z-10 ${
        isFavorite 
          ? 'bg-red-500 text-white' 
          : 'bg-white/80 text-neutral-400 hover:text-red-500 hover:bg-white'
      }`}
      title={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
    >
      <Heart size={20} className={isFavorite ? 'fill-current' : ''} />
    </button>
  );
}
