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
        {
          protocol: 'https',
          hostname: 'pfudyqocrsepnnfgysmi.supabase.co',
          port: '',
          pathname: '/storage/v1/object/public/images/**',
        }
      ],
      
    },
  }