/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['localhost', 'http://67.205.168.95'],
    },
    output: 'standalone',
}

module.exports = nextConfig
