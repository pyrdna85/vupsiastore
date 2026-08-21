import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-24 bg-neutral-50 px-4 text-center">
      <h1 className="text-9xl font-black text-blue-100 mb-4">404</h1>
      <h2 className="text-3xl font-bold text-neutral-900 mb-4">Página não encontrada</h2>
      <p className="text-neutral-600 max-w-md mb-8">
        Desculpe, não conseguimos encontrar a página que você está procurando. Talvez ela tenha sido movida ou não exista mais.
      </p>
      <Link 
        href="/"
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3.5 rounded-full transition-colors"
      >
        Voltar para a página inicial
      </Link>
    </div>
  );
}
