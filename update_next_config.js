const fs = require('fs');
let content = fs.readFileSync('next.config.ts', 'utf8');

const additionalPatterns = `
      { protocol: 'https', hostname: 'encrypted-tbn0.gstatic.com' },
      { protocol: 'https', hostname: 'm.media-amazon.com' },
      { protocol: 'https', hostname: 'images-na.ssl-images-amazon.com' },
      { protocol: 'https', hostname: 'down-br.img.susercontent.com' },
      { protocol: 'https', hostname: 'http2.mlstatic.com' },
`;

// Inject into the remotePatterns array
content = content.replace(
  /remotePatterns:\s*\[([\s\S]*?)\]/,
  (match, inner) => {
    return `remotePatterns: [${inner}${additionalPatterns}]`;
  }
);

fs.writeFileSync('next.config.ts', content);
