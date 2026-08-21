export default function AdvertisePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 sm:p-12 text-center">
        <h1 className="text-3xl font-black text-slate-900 mb-6">Anuncie Conosco</h1>
        <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
          Deseja dar mais visibilidade à sua loja ou produto? O Vupsia é a plataforma ideal para conectar ofertas incríveis a consumidores engajados.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="p-6 bg-slate-50 rounded-xl">
            <h3 className="text-xl font-bold text-slate-900 mb-3">Audiência Qualificada</h3>
            <p className="text-slate-600 text-sm">Alcançamos milhares de usuários diariamente buscando as melhores ofertas e produtos de qualidade.</p>
          </div>
          <div className="p-6 bg-slate-50 rounded-xl">
            <h3 className="text-xl font-bold text-slate-900 mb-3">Alta Conversão</h3>
            <p className="text-slate-600 text-sm">Nossa interface é projetada para facilitar a jornada de compra, gerando altas taxas de conversão para parceiros.</p>
          </div>
          <div className="p-6 bg-slate-50 rounded-xl">
            <h3 className="text-xl font-bold text-slate-900 mb-3">Parcerias Estratégicas</h3>
            <p className="text-slate-600 text-sm">Oferecemos espaços em banners, envios em newsletters e posições de destaque na página inicial.</p>
          </div>
        </div>
        <div className="inline-block bg-slate-900 text-white rounded-xl p-8">
          <h2 className="text-xl font-bold mb-4">Entre em contato com nossa equipe comercial</h2>
          <p className="mb-6 text-slate-300">Mande um email e enviaremos nosso Mídia Kit com todos os detalhes e métricas atuais.</p>
          <a href="mailto:contato@vupsia.com.br" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-lg transition-colors inline-block uppercase text-sm">
            Falar com a Equipe
          </a>
        </div>
      </div>
    </div>
  );
}
