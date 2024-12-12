/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vobaklixhkvwmmmpajeb.supabase.co',
        pathname: '/storage/v1/object/public/**',
      }
    ],
    domains: ['localhost'],
  },
  compiler: {
    styledComponents: true
  }
};

module.exports = nextConfig; 