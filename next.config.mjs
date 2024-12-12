/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "**",
            },
        ],
    },
    // async headers() {
    //     return [
    //         {
    //             source: "/:path*", // Apply to all routes
    //             headers: [
    //                 {
    //                     key: "Cache-Control",
    //                     value: "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
    //                 },
    //             ],
    //         },
    //     ];
    // },
};

export default nextConfig;
