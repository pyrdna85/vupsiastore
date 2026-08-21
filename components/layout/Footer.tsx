import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 px-6 py-4 shrink-0 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-6">
        <div className="flex flex-col gap-1 max-w-sm text-center lg:text-left">
          <span className="text-[10px] font-black text-slate-800 uppercase">Divulgação de Afiliados</span>
          <p className="text-[9px] text-slate-500 leading-tight">Alguns links desta página são links de afiliados. Podemos receber uma comissão caso você realize uma compra através deles, sem custo adicional para você. Preços sujeitos a alteração pelas lojas parceiras.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-8 text-center lg:text-left">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-black text-slate-800 uppercase">Links Úteis</span>
            <div className="flex justify-center lg:justify-start gap-4 text-[9px] text-slate-500 font-medium">
              <Link href="#">Privacidade</Link>
              <Link href="#">Termos</Link>
              <Link href="#">Anuncie</Link>
              <Link href="#">Sobre</Link>
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-black text-slate-800 uppercase">Nossas Lojas Parceiras</span>
            <div className="flex justify-center lg:justify-start gap-3 items-center opacity-50 grayscale">
              <span className="text-[10px] font-bold italic">amazon</span>
              <span className="text-[10px] font-bold italic">Shopee</span>
              <span className="text-[10px] font-bold italic">Magalu</span>
              <span className="text-[10px] font-bold italic">Shein</span>
            </div>
          </div>
        </div>
        
        <div className="text-center lg:text-right">
          <span className="text-[10px] text-slate-400">© {new Date().getFullYear()} Vupsia Tecnologia LTDA.</span>
        </div>
      </div>
    </footer>
  );
}
