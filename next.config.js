const withSass = require("@zeit/next-sass")
const webpack = require("webpack")

module.exports = withSass({
	lessLoaderOptions: {
		javascriptEnabled: true
	},
	webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {
		// img loaders
		config.module.rules.push(
			{
				test: /\.(svg|png|jpe?g|gif)$/,
				use: [
					{
						loader: "url-loader",
						options: {
							limit: 102400,
							fallback: "file-loader",
							publicPath: "/_next/static/images",
							outputPath: "./static/images/",
							name: "[name]-[hash].[ext]"
						}
					}
				]
			}
		)

		// typescript
		config.module.rules.push({
			test: /\.tsx?$/,
			use: [{
				loader: 'ts-loader'
			}]
		})
		return config
	},
	publicRuntimeConfig: { // Will be available on both server and client
		staticFolder: "/static"
	}
});
