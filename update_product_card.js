const fs = require('fs');
let content = fs.readFileSync('components/products/ProductCard.tsx', 'utf8');

// The block to replace
const search = `        <Link 
          href={product.id ? \`/go/\${product.id}\` : \`/produto/\${product.slug}\`} 
          target={product.id ? "_blank" : undefined} 
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-1.5 rounded-lg text-xs font-bold uppercase transition-colors text-center block"
        >
          Ir para Loja
        </Link>`;

const replace = `        {product.id ? (
          <a 
            href={\`/go/\${product.id}\`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-1.5 rounded-lg text-xs font-bold uppercase transition-colors text-center block"
          >
            Ir para Loja
          </a>
        ) : (
          <Link 
            href={\`/produto/\${product.slug}\`} 
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-1.5 rounded-lg text-xs font-bold uppercase transition-colors text-center block"
          >
            Ir para Loja
          </Link>
        )}`;

content = content.replace(search, replace);
fs.writeFileSync('components/products/ProductCard.tsx', content);
