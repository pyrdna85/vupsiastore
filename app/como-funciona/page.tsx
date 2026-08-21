import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Search,
  MousePointerClick,
  ExternalLink,
  ShoppingCart,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Como funciona | Vupsia',
  description:
    'Entenda como encontrar produtos e acessar ofertas pelo Vupsia.',
};

export default function ComoFuncionaPage() {
  const steps = [
    {
      number: '01',
      icon: Search,
      title: 'Encontre',
      description:
        'Pesquise um produto ou navegue pelas categorias disponíveis no Vupsia.',
    },
    {
      number: '02',
      icon: MousePointerClick,
      title: 'Escolha',
      description:
        'Veja as informações disponíveis do produto, incluindo preço, desconto, loja e condições.',
    },
    {
      number: '03',
      icon: ExternalLink,
      title: 'Acesse a loja',
      description:
        'Clique em "Ir para Loja" para ser direcionado ao site da loja parceira.',
    },
    {
      number: '04',
      icon: ShoppingCart,
      title: 'Compre',
      description:
        'A compra é concluída diretamente no site da loja responsável pelo produto.',
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50">

      {/* HERO */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-500">
              Como funciona
            </span>

            <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
              Descobrir produtos
              <span className="text-orange-500"> é simples.</span>
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              O Vupsia ajuda você a encontrar produtos e ofertas em diferentes
              lojas. Quando encontrar algo interessante, você é direcionado
              para a loja responsável pela venda.
            </p>
          </div>
        </div>
      </section>

      {/* PASSOS */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid gap-6 md:grid-cols-2">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"
              >
                <div className="absolute right-5 top-4 text-5xl font-black text-slate-100">
                  {step.number}
                </div>

                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50">
                    <Icon className="h-6 w-6 text-orange-500" />
                  </div>

                  <h2 className="mt-5 text-xl font-bold text-slate-900">
                    {step.title}
                  </h2>

                  <p className="mt-3 max-w-lg leading-relaxed text-slate-600">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* PERGUNTAS */}
      <section className="border-y border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-500">
              Dúvidas comuns
            </span>

            <h2 className="mt-2 text-3xl font-black text-slate-900">
              O que você precisa saber
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-7">
              <div className="flex items-center gap-3">
                <HelpCircle className="h-5 w-5 text-orange-500" />
                <h3 className="font-bold text-slate-900">
                  O Vupsia vende os produtos?
                </h3>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                Não. O Vupsia funciona como uma plataforma de descoberta e
                divulgação. A compra é realizada diretamente no site da loja
                parceira.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-7">
              <div className="flex items-center gap-3">
                <HelpCircle className="h-5 w-5 text-orange-500" />
                <h3 className="font-bold text-slate-900">
                  O preço mostrado é definitivo?
                </h3>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                Os preços, estoques, condições de frete e disponibilidade
                podem ser alterados pela loja parceira.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-7">
              <div className="flex items-center gap-3">
                <HelpCircle className="h-5 w-5 text-orange-500" />
                <h3 className="font-bold text-slate-900">
                  Posso comprar diretamente pelo Vupsia?
                </h3>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                Não. O Vupsia direciona você para a loja responsável pelo
                produto, onde a compra é concluída.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-7">
              <div className="flex items-center gap-3">
                <HelpCircle className="h-5 w-5 text-orange-500" />
                <h3 className="font-bold text-slate-900">
                  O Vupsia recebe comissão?
                </h3>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                Alguns links podem ser links de afiliados. Nesses casos, o
                Vupsia pode receber uma comissão pela compra, sem custo
                adicional para o cliente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-slate-900 p-8 sm:p-10 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-black text-white">
              Pronto para encontrar algo interessante?
            </h2>

            <p className="mt-2 text-slate-400">
              Explore nossas categorias e descubra novos produtos.
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-600"
          >
            Explorar ofertas
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
