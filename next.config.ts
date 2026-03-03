import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '/superminichat',
  async redirects() {
    return [
      {
        // Se alguém vier pelo domínio antigo na raiz
        source: '/',
        destination: 'https://www.gabrielzv.com/chat-ai',
        permanent: true, // Erro 301 (bom para SEO)
      },
    ];
  },
};

export default nextConfig;
