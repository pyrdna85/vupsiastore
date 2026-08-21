const fs = require('fs');
let content = fs.readFileSync('app/produto/[slug]/page.tsx', 'utf8');

const search = `<Link 
                href={\`/go/\${product.id}\`}
                target="_blank"
                className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-600/30 hover:shadow-xl hover:-translate-y-0.5"
              >
                Comprar Agora
                <ExternalLink size={20} />
              </Link>`;

const replace = `<a 
                href={\`/go/\${product.id}\`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-600/30 hover:shadow-xl hover:-translate-y-0.5"
              >
                Comprar Agora
                <ExternalLink size={20} />
              </a>`;

content = content.replace(search, replace);
fs.writeFileSync('app/produto/[slug]/page.tsx', content);
