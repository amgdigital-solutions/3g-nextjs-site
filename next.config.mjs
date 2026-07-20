/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "kkygtvbunikkyrotvqom.supabase.co" },
      { protocol: "https", hostname: "www.3guae.com" },
    ],
    formats: ["image/webp", "image/avif"],
    unoptimized: true,
  },
  async redirects() {
    return [
      { source: "/about-us/:path*", destination: "/about", permanent: true },
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/visa-consultancy/:path*", destination: "/golden-visa", permanent: true },
      { source: "/visa-consultancy", destination: "/golden-visa", permanent: true },
      { source: "/services/:path*", destination: "/property-management", permanent: true },
      { source: "/services", destination: "/property-management", permanent: true },
      { source: "/sell-your-home-today/:path*", destination: "/property-management", permanent: true },
      { source: "/sell-your-home-today", destination: "/property-management", permanent: true },
    ];
  },
};

export default nextConfig;
