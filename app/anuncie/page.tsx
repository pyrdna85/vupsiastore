import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Megaphone,
  Image as ImageIcon,
  Target,
  TrendingUp,
  ArrowRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Anuncie conosco | Vupsia',
  description:
    'Conheça as possibilidades de publicidade e parceria com o Vupsia.',
};

export default function AnunciePage() {
  return (
    <main className="min-h-screen bg-slate-50">

      {/* HERO */}
      <section className="bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full bg-orange-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-orange-400">
              Publicidade e parcerias
            </span>

            <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl">
              Anuncie no
              <span className="text-orange-500"> Vupsia.</span>
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-slate-300">
              Apresente sua marca, seus produtos ou suas campanhas para
              pessoas que estão pesquisando e descobrindo novos produtos.
            </p>

            <Link
              href="/contato"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-orange-600"
            >
              Quero anunciar
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FORMATOS */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-500">
            Possibilidades
          </span>

          <h2 className="mt-2 text-3xl font-black text-slate-900">
            Soluções para sua marca
          </h2>

          <p className="mt-4 leading-relaxed text-slate-600">
            Podemos estruturar diferentes formatos de divulgação de acordo
            com os objetivos da sua campanha.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <Megaphone className="h-6 w-6 text-orange-500" />

            <h3 className="mt-5 font-bold text-slate-900">
              Destaque de produtos
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Dê maior visibilidade a produtos e ofertas selecionadas.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <ImageIcon className="h-6 w-6 text-orange-500" />

            <h3 className="mt-5 font-bold text-slate-900">
              Banners
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Espaços promocionais para campanhas e comunicações especiais.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <Target className="h-6 w-6 text-orange-500" />

            <h3 className="mt-5 font-bold text-slate-900">
              Campanhas
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Estruture ações focadas em categorias, produtos ou períodos
              promocionais.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <TrendingUp className="h-6 w-6 text-orange-500" />

            <h3 className="mt-5 font-bold text-slate-900">
              Marcas
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Amplie a presença da sua marca dentro do ecossistema Vupsia.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-y border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="rounded-3xl bg-orange-500 px-8 py-10 sm:px-10">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-black text-white">
                Vamos conversar?
              </h2>

              <p className="mt-4 text-orange-50 leading-relaxed">
                Entre em contato para apresentar sua marca, produto ou
                campanha e conhecer as possibilidades de parceria.
              </p>

              <Link
                href="/contato"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-orange-600 transition hover:bg-orange-50"
              >
                Falar com o Vupsia
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
