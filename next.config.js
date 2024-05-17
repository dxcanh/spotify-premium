/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "pfudyqocrsepnnfgysmi.supabase.co"
        ]
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

module.exports =  nextConfig;
module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'i.scdn.co',
          port: '',
          pathname: '/image/**',
        },
      ],
    },
  }