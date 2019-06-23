const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin")
const options = require("./options")
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;
const moduleCssLoader = {
	loader: "css-loader",
	options: {
		modules: true
	}
};
module.exports = function(env) {
	const styleLoader = env.production
		? MiniCssExtractPlugin.loader
		: "style-loader";
	const babelLoader = {
		loader: "babel-loader",
	};
	return {
		mode: env.production ? "production" : "development",
		context:path.join(__dirname,'../'),
		entry:`./src/demoes/${options.name}/main.ts`,
		output: {
			pathinfo: false,
			path: options.outputPath,
			filename: options.js.filename,
            chunkFilename: options.js.chunkFilename,
            publicPath:'/'
		},
		optimization: {
			splitChunks: {
				cacheGroups: {
					commons: {
						name: "commons",
						chunks: "initial",
						minChunks: 2
					}
				}
			}
		},
		resolve: {
			alias: {
				src: path.join(__dirname, "../src")
			},
			extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
		},
		module: {
			rules: [
				{
					test: /\.jsx?$/,
					include: path.join(__dirname, "../src"),
					use: babelLoader
				},
				{
					test: /\.tsx?$/,
					include: path.join(__dirname, "../src"),
					use: babelLoader
				},
				{
					test: cssRegex,
					include: path.join(__dirname, "../src"),
					exclude: cssModuleRegex,
					use: [styleLoader, "css-loader", "postcss-loader"]
				},
				{
					test: lessRegex,
					include: path.join(__dirname, "../src"),
					exclude: lessModuleRegex,
					use: [
						styleLoader,
						"css-loader",
						"postcss-loader",
						"less-loader"
					]
				},
				{
					test: cssModuleRegex,
					include: path.join(__dirname, "../src"),
					use: [styleLoader, moduleCssLoader, "postcss-loader"]
				},
				{
					test: lessModuleRegex,
					include: path.join(__dirname, "../src"),
					use: [
						styleLoader,
						moduleCssLoader,
						"postcss-loader",
						"less-loader"
					]
				},
				{
					test: /\.(jpe?g|png|svg|bmp|gif)$/,
					include: path.join(__dirname, "../src"),
					use: {
						loader: "url-loader",
						options: {
							limit: 5000,
							name(file) {
								return options.assets;
							}
						}
					}
                },
                {
                    test:/\.glsl$/,
                    use:"raw-loader"
                }
			]
		},
		plugins: [
			new HtmlWebpackPlugin({
                template:options.template,
                filename:options.html
            }),
			new webpack.DefinePlugin({
				"module.IS_DEV": !env.production,
				"module.IS_PROD": env.production,
				"module.IS_RENDER": env.render
			}),
			new ForkTsCheckerWebpackPlugin(),
			!env.production && new webpack.HotModuleReplacementPlugin(),
			env.production &&
				new MiniCssExtractPlugin({
					filename: options.css.filename,
					chunkFilename: options.css.chunkFilename
				})
		].filter(Boolean),
		devtool: env.production ? "none" : "cheap-eval-source-map"
	};
};
