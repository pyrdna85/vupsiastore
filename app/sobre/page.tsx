export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 sm:p-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-black text-slate-900 mb-4">Sobre o Vupsia</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Mais do que um site de ofertas, somos seu parceiro inteligente para encontrar os melhores produtos com os melhores preços.
          </p>
        </div>
        
        <div className="space-y-12">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">A Nossa Missão</h2>
              <p className="text-slate-600 leading-relaxed">
                Nascemos da necessidade de organizar a bagunça que é comprar online. Existem muitas lojas, muitos cupons que não funcionam e muitas falsas promoções. A missão do Vupsia é curar, validar e organizar os "achadinhos" da internet de forma transparente.
              </p>
            </div>
            <div className="flex-1 bg-slate-100 rounded-2xl p-8 text-center">
              <span className="text-6xl text-orange-500 font-black block mb-2">🎯</span>
              <span className="font-bold text-slate-800">Foco Total no Usuário</span>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Como Funcionamos</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Nossa equipe e nossos algoritmos vasculham diariamente as maiores lojas do Brasil e do mundo (Amazon, Shopee, Magalu, Mercado Livre) em busca de quedas reais de preço e produtos que estão viralizando.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Nós ganhamos uma pequena comissão (como afiliados) quando você compra através dos nossos links, mas isso <strong>não altera o preço do produto para você</strong>. É assim que mantemos a plataforma sempre gratuita e livre de anúncios irritantes.
              </p>
            </div>
            <div className="flex-1 bg-slate-100 rounded-2xl p-8 text-center">
              <span className="text-6xl text-orange-500 font-black block mb-2">🤝</span>
              <span className="font-bold text-slate-800">Transparência e Confiança</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
