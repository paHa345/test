/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental:{
        serverActions: true
    },
    images: {
        domains: ['https://rhjm8idplsgk4vxo.public.blob.vercel-storage.com'],
      },
}

module.exports = nextConfig
