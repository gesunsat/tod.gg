/** @type {import('next').NextConfig} */
const nextConfig = {
	// output: "standalone",
	webpack: (config) => {
		config.module.rules.push({
			test: /\.svg$/,
			use: ["@svgr/webpack"]
		});

		return config;
	},
	images: {
		unoptimized: true,
		remotePatterns: [
			{
				protocol: "https",
				hostname: "open.api.nexon.com",
				pathname: "**",
			},
		]
	},
	reactStrictMode: process.env.NODE_ENV === "production"
}

module.exports = nextConfig
