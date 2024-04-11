/** @type {import('next').NextConfig} */
const nextConfig = {
    // Learn: in Image tag, When using an external URL, you must add it to remotePatterns in next.config.js. This action is Tt protect your application from malicious users, configuration is required in order to use external images
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                port: ''
            }
        ]
    }
};

export default nextConfig;
