/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  distDir: process.env.LESSSO_TEST_BUILD === "1" ? ".next-test" : ".next",
  ...(process.env.LESSSO_TEST_BUILD === "1" ? { allowedDevOrigins: ["127.0.0.1"], agentRules: false } : {}),
  reactStrictMode: true,
  poweredByHeader: false,

};

export default nextConfig;

