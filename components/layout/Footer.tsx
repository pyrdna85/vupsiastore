import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 px-6 py-10 shrink-0 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start gap-10">
        <div className="flex flex-col gap-3 max-w-md text-center lg:text-left mx-auto lg:mx-0">
          <Link href="/" className="flex items-baseline justify-center lg:justify-start gap-1 mb-2">
            <span className="text-2xl font-black text-orange-600 tracking-tight" style={{ color: '#FF4C24' }}>
              VUPSIA
            </span>
            <span className="w-2 h-2 rounded-full bg-orange-500"></span>
          </Link>
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Divulgação de Afiliados</span>
          <p className="text-xs text-slate-500 leading-relaxed">Alguns links desta página são links de afiliados. Podemos receber uma comissão caso você realize uma compra através deles, sem custo adicional para você. Preços sujeitos a alteração pelas lojas parceiras.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-12 text-center lg:text-left mx-auto lg:mx-0">
          <div className="flex flex-col gap-4">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Links Úteis</span>
            <div className="flex flex-col gap-3 text-sm text-slate-500 font-medium">
              <Link href="/privacidade" className="hover:text-orange-500 transition-colors">Privacidade</Link>
              <Link href="/termos" className="hover:text-orange-500 transition-colors">Termos de Uso</Link>
              <Link href="/anuncie" className="hover:text-orange-500 transition-colors">Anuncie Conosco</Link>
              <Link href="/sobre" className="hover:text-orange-500 transition-colors">Sobre Nós</Link>
            </div>
          </div>
          
          <div className="flex flex-col gap-4">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Lojas Parceiras</span>
            <div className="flex flex-col gap-3 text-sm text-slate-500 font-medium">
              <span className="hover:text-slate-800 transition-colors cursor-default">Amazon</span>
              <span className="hover:text-slate-800 transition-colors cursor-default">Shopee</span>
              <span className="hover:text-slate-800 transition-colors cursor-default">Magazine Luiza</span>
              <span className="hover:text-slate-800 transition-colors cursor-default">Shein</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-center lg:text-left">
        <span className="text-xs text-slate-400">© {new Date().getFullYear()} Vupsia Tecnologia LTDA. Todos os direitos reservados.</span>
      </div>
    </footer>
  );
}
