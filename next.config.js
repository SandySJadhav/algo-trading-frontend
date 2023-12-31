/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    compiler: {
        removeConsole: true
    },
    env: {
        environment: process.env.environment,
        APIM_ENV: process.env.APIM_ENV,
        FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
        FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
        FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
        FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
        FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
        FIREBASE_APP_ID: process.env.FIREBASE_APP_ID
    }
}

if (process.env.environment == 'dev') {
    nextConfig.compiler.removeConsole = false;
}

console.log(
    `\x1b[36mEnvironment:\x1b[0m`,
    `\x1b[32m${process.env.environment}\x1b[0m`
);

module.exports = nextConfig
