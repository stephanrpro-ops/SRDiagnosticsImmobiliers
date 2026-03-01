/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { typedRoutes: true },
  async redirects() {
    return [
      { source: '/prestations/ppt', destination: '/prestations', permanent: true },
      { source: '/prestations/dtg', destination: '/prestations', permanent: true }
    ];
  }
};

export default nextConfig;
