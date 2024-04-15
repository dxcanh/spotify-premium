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
