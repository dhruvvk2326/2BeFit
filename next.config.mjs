// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "v2.exercisedb.io",
                pathname: "/image/**",
            },
        ],
    },
};

export default nextConfig;
