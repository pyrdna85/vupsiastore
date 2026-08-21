'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center py-24 bg-neutral-50 px-4 text-center">
      <h2 className="text-3xl font-bold text-neutral-900 mb-4">Algo deu errado!</h2>
      <p className="text-neutral-600 max-w-md mb-8">
        Desculpe, ocorreu um erro inesperado ao tentar carregar esta página.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="bg-neutral-200 hover:bg-neutral-300 text-neutral-900 font-medium px-8 py-3.5 rounded-full transition-colors"
        >
          Tentar novamente
        </button>
        <Link 
          href="/"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3.5 rounded-full transition-colors"
        >
          Voltar ao Início
        </Link>
      </div>
    </div>
  );
}
