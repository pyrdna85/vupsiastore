import Image from 'next/image';
import Link from 'next/link';
import { FavoriteButton } from './FavoriteButton';

interface ProductCardProps {
  product: {
    id?: string;
    slug: string;
    imageUrl: string;
    name: string;
    oldPrice: number | null;
    price: number;
    discountPercentage: number | null;
    store: string;
    freeShipping: boolean;
    fastDelivery: boolean;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/produto/${product.slug}`} className="group bg-white rounded-xl border border-slate-200 p-3 flex flex-col hover:shadow-xl hover:border-orange-200 transition-all cursor-pointer relative">
      <div className="absolute top-2 right-2 z-20">
        {product.id && <FavoriteButton productId={product.id} />}
      </div>
      {product.discountPercentage && (
        <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded z-10">
          -{product.discountPercentage}%
        </div>
      )}
      <div className="w-full h-32 bg-slate-50 rounded-lg mb-3 flex items-center justify-center relative overflow-hidden">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="flex flex-col flex-1">
        <span className="text-[10px] text-slate-400 uppercase font-bold mb-1">{product.store}</span>
        <h3 className="text-xs font-bold text-slate-800 line-clamp-2 leading-tight mb-2 group-hover:text-orange-600 transition-colors">
          {product.name}
        </h3>
        <div className="mt-auto">
          {product.oldPrice && (
            <span className="block text-[10px] text-slate-400 line-through">
              R$ {product.oldPrice.toFixed(2).replace('.', ',')}
            </span>
          )}
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-black text-slate-900">
              R$ {product.price.toFixed(2).replace('.', ',')}
            </span>
          </div>
          <div className="flex gap-1 mt-2 flex-wrap">
            {product.freeShipping && (
              <span className="bg-green-100 text-green-700 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">
                Frete Grátis
              </span>
            )}
            {product.fastDelivery && (
              <span className="bg-blue-100 text-blue-700 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">
                Rápida
              </span>
            )}
          </div>
          <Link href={product.id ? `/go/${product.id}` : `/produto/${product.slug}`} target={product.id ? "_blank" : undefined} className="w-full mt-3 bg-orange-500 hover:bg-orange-600 text-white py-1.5 rounded-lg text-xs font-bold uppercase transition-colors text-center block" onClick={(e) => {
            e.stopPropagation();
          }}>
            Ir para Loja
          </Link>
        </div>
      </div>
    </Link>
  );
}
