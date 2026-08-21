import Link from 'next/link';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* PRINCIPAL */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* MARCA */}
          <div className="lg:pr-8">
            <Link
              href="/"
              className="inline-block text-2xl font-black tracking-tight"
            >
              <span className="text-orange-500">VUPSIA</span>
              <span className="text-white">.</span>
            </Link>

            <p className="mt-4 text-sm text-slate-400 leading-relaxed">
              Encontre ofertas, produtos e oportunidades selecionadas
              de diversas lojas em um só lugar.
            </p>

            <p className="mt-4 text-xs text-slate-500 leading-relaxed">
              O Vupsia pode receber comissão por meio de links de afiliados.
              Isso não gera custo adicional para você.
            </p>
          </div>

          {/* VUPSIA */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Vupsia
            </h3>

            <nav className="mt-4 flex flex-col gap-3">
              <Link
                href="/sobre"
                className="text-sm text-slate-400 hover:text-orange-400 transition-colors"
              >
                Sobre nós
              </Link>

              <Link
                href="/contato"
                className="text-sm text-slate-400 hover:text-orange-400 transition-colors"
              >
                Contato
              </Link>

              <Link
                href="/anuncie"
                className="text-sm text-slate-400 hover:text-orange-400 transition-colors"
              >
                Anuncie conosco
              </Link>

              <Link
                href="/como-funciona"
                className="text-sm text-slate-400 hover:text-orange-400 transition-colors"
              >
                Como funciona
              </Link>
            </nav>
          </div>

          {/* CATEGORIAS */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Categorias
            </h3>

            <nav className="mt-4 flex flex-col gap-3">
              <Link
                href="/categoria/eletronicos"
                className="text-sm text-slate-400 hover:text-orange-400 transition-colors"
              >
                Eletrônicos
              </Link>

              <Link
                href="/categoria/celulares"
                className="text-sm text-slate-400 hover:text-orange-400 transition-colors"
              >
                Celulares
              </Link>

              <Link
                href="/categoria/casa-inteligente"
                className="text-sm text-slate-400 hover:text-orange-400 transition-colors"
              >
                Casa Inteligente
              </Link>

              <Link
                href="/categoria/games"
                className="text-sm text-slate-400 hover:text-orange-400 transition-colors"
              >
                Games
              </Link>

              <Link
                href="/categoria/moda-masculina"
                className="text-sm text-slate-400 hover:text-orange-400 transition-colors"
              >
                Moda Masculina
              </Link>
            </nav>
          </div>

          {/* AJUDA */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Informações
            </h3>

            <nav className="mt-4 flex flex-col gap-3">
              <Link
                href="/privacidade"
                className="text-sm text-slate-400 hover:text-orange-400 transition-colors"
              >
                Política de Privacidade
              </Link>

              <Link
                href="/termos"
                className="text-sm text-slate-400 hover:text-orange-400 transition-colors"
              >
                Termos de Uso
              </Link>

              <Link
                href="/cookies"
                className="text-sm text-slate-400 hover:text-orange-400 transition-colors"
              >
                Política de Cookies
              </Link>
            </nav>

            {/* LOJAS */}
            <div className="mt-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Lojas parceiras
              </h4>

              <div className="flex flex-wrap gap-2 mt-3">
                <span className="px-2.5 py-1 rounded-md bg-white/5 text-xs text-slate-400">
                  Amazon
                </span>

                <span className="px-2.5 py-1 rounded-md bg-white/5 text-xs text-slate-400">
                  Shopee
                </span>

                <span className="px-2.5 py-1 rounded-md bg-white/5 text-xs text-slate-400">
                  Magalu
                </span>

                <span className="px-2.5 py-1 rounded-md bg-white/5 text-xs text-slate-400">
                  Shein
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* SEPARADOR */}
        <div className="border-t border-white/10 mt-10 pt-6">

          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">

            <p className="text-xs text-slate-500 text-center md:text-left">
              © {year} Vupsia Tecnologia LTDA. Todos os direitos reservados.
            </p>

            <p className="text-xs text-slate-500 text-center md:text-right">
              Preços, disponibilidade e condições podem ser alterados
              pelas lojas parceiras.
            </p>

          </div>

        </div>
      </div>
    </footer>
  );
}
