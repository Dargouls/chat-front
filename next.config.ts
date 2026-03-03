import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '/superminichat',
  async redirects() {
    return [
      {
        // Tenta capturar quem chega no domínio antigo
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'superminichat.vercel.app', // DOMÍNIO ANTIGO
          },
        ],
        destination: 'https://www.gabrielzv.com/chat-ai/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
