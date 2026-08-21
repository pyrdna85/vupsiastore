'use client';

import { FormEvent, useState } from 'react';
import type { Metadata } from 'next';
import {
  Mail,
  MessageSquare,
  Send,
  Clock,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contato | Vupsia',
  description:
    'Entre em contato com a equipe do Vupsia.',
};

export default function ContatoPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setSuccess('');
    setError('');

    // Formulário visual por enquanto.
    // A API de envio pode ser integrada posteriormente.
    await new Promise((resolve) => setTimeout(resolve, 700));

    setLoading(false);
    setSuccess(
      'Seu formulário foi preenchido com sucesso. Em breve poderemos integrar o envio diretamente para nossa equipe.'
    );

    event.currentTarget.reset();
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-500">
              Fale conosco
            </span>

            <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
              Entre em contato
            </h1>

            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              Tem uma dúvida, sugestão, problema ou interesse em parceria?
              Envie uma mensagem para nós.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">

          {/* INFORMAÇÕES */}
          <div className="space-y-5">
            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50">
                <Mail className="h-5 w-5 text-orange-500" />
              </div>

              <h2 className="mt-5 font-bold text-slate-900">
                Atendimento
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Para dúvidas gerais, sugestões ou solicitações relacionadas
                ao Vupsia.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50">
                <MessageSquare className="h-5 w-5 text-orange-500" />
              </div>

              <h2 className="mt-5 font-bold text-slate-900">
                Parcerias
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Para publicidade, divulgação de produtos ou outras
                oportunidades comerciais.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50">
                <Clock className="h-5 w-5 text-orange-500" />
              </div>

              <h2 className="mt-5 font-bold text-slate-900">
                Retorno
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Nossa equipe analisará sua mensagem e responderá assim que
                possível.
              </p>
            </div>
          </div>

          {/* FORMULÁRIO */}
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-9">
            <h2 className="text-2xl font-black text-slate-900">
              Envie sua mensagem
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Preencha os campos abaixo.
            </p>

            {success && (
              <div className="mt-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                {success}
              </div>
            )}

            {error && (
              <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="mt-7 space-y-5"
            >
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Nome
                </label>

                <input
                  id="name"
                  name="name"
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  placeholder="Seu nome"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  E-mail
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  placeholder="voce@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Assunto
                </label>

                <select
                  id="subject"
                  name="subject"
                  defaultValue=""
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                >
                  <option value="" disabled>
                    Selecione um assunto
                  </option>
                  <option value="duvida">
                    Dúvida
                  </option>
                  <option value="sugestao">
                    Sugestão
                  </option>
                  <option value="problema">
                    Problema
                  </option>
                  <option value="publicidade">
                    Publicidade
                  </option>
                  <option value="parceria">
                    Parceria
                  </option>
                  <option value="outro">
                    Outro
                  </option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Mensagem
                </label>

                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  placeholder="Escreva sua mensagem..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Send className="h-4 w-4" />
                {loading ? 'Enviando...' : 'Enviar mensagem'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
