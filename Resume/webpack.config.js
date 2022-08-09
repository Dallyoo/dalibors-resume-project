const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const postcssPresetEnv = require("postcss-preset-env");
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// We are getting 'process.env.NODE_ENV' from the NPM scripts
const devMode = process.env.NODE_ENV !== "production";

/** @type {import('webpack').Configuration} */
module.exports = {
    devtool: devMode ? "source-map" : "eval-source-map",
    // Set the caching filesystem
    cache: {
        type: "filesystem",
        version: "dev_1",
    },
    // Tells Webpack which built-in optimizations to use
    // If you leave this out, Webpack will default to "production"
    mode: devMode ? "development" : "production",
    // Specify output path and bundle name
    output: {
        // Specify the base path
        path: path.resolve(__dirname, "wwwroot"),
        // The name of the output bundle.
        filename: `js/[name]${devMode ? "" : ".[contenthash]"}.js`,
    },
    // Webpack needs to know where to start the bundling process
    entry: {
        // Main bundle entrypoint
        "bundle": path.resolve(__dirname, "wwwroot_src/ts/main.ts"),
        "bundle.min": path.resolve(__dirname, "wwwroot_src/ts/main.ts"),
    },
    // Externals so we dont bundle our imported libraries, as we use then as CDN and or standalone JS files
    externals: {
        bootstrap: "bootstrap",
        jquery: ["$", "jQuery"]
    },
    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".scss", ".css"],
    },
    module: {
        // Array of rules that tells Webpack how the modules (output)
        // will be created
        rules: [
            {
                // All files with a ".ts" or ".tsx" extension will be handled by "ts-loader".
                test: /\.tsx?$/, loader: "ts-loader"
            },
            {
                // All output ".js" files will have any sourcemaps re-processed by "source-map-loader".
                test: /\.js$/,
                enforce: "pre",
                use: ["source-map-loader"],
            },
            {
                // Look for Sass files and process them according to the
                // rules specified in the different loaders
                test: /\.(sa|sc|c)ss$/,
                // Use the following loaders from right-to-left, so it will
                // use sass-loader first and ending with MiniCssExtractPlugin
                use: [
                    {
                        // Extracts the CSS into a separate file and uses the
                        // defined configurations in the "plugins" section
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        // Interprets CSS
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            importLoaders: 2
                        }
                    },
                    {
                        // Use PostCSS to minify and autoprefix with vendor rules
                        // for older browser compatibility
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                // We instruct PostCSS to autoprefix and minimize our
                                // CSS when in production mode, otherwise don"t do
                                // anything.
                                ident: "postcss",
                                plugins: devMode
                                    ? () => []
                                    : () => [
                                        postcssPresetEnv({
                                            // Compile our CSS code to support browsers
                                            // that are used in more than 1% of the
                                            // global market browser share. You can modify
                                            // the target browsers according to your needs
                                            // by using supported queries.
                                            // https://github.com/browserslist/browserslist#queries
                                            browsers: [">1%"]
                                        }),
                                        require("cssnano")()
                                    ]
                            }
                        }
                    },
                    {
                        // URL resolve loader for copying URLs used in CSS files
                        loader: "resolve-url-loader"
                    },
                    {
                        // Adds support for Sass files, if using Less, then
                        // Use the sass-loader
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                            sassOptions: {
                                includePaths: [
                                    // Includes for node modules bootstrap and bootstrap-dark-5
                                    nodeModulesPath + "/bootstrap/scss/",
                                    nodeModulesPath
                                ],
                            }
                        },
                    },
                ],
            },
            {
                // Adds support to load images in CSS rules
                test: /\.(png|jpe?g|gif|svg)$/,
                type: "asset/resource",
                generator: {
                    filename: `assets/img/[name]${devMode ? "" : ".[contenthash]"}[ext]`,
                },
            },
            {
                // Adds support for fonts
                test: /\.(woff(2)?|ttf|eot)$/,
                type: "asset/resource",
                generator: {
                    filename: `assets/fonts/[name]${devMode ? "" : ".[contenthash]"}[ext]`,
                },
            },
        ],
    },
    plugins: [
        // Configuration options for MiniCssExtractPlugin
        // In case of imported CSS files through JS/TS
        new MiniCssExtractPlugin({
            filename: devMode ? "css/styles.css" : "css/styles.[contenthash].css",
        }),
        // Copy plugin for required static files
        new CopyPlugin({
            patterns: [
                {
                    // Our static files
                    from: "assets/",
                    to: "assets/",
                    toType: "dir",
                    context: "wwwroot_src/",
                    globOptions: {
                        dot: true,
                    },
                },
            ],
        }),
        // Clean static folders, because we do use hashes
    ],
    // Minify JS files on production mode
    optimization: {
        minimize: devMode ? false : true,
        minimizer: [
            new TerserPlugin({
                extractComments: false,
                test: /\.min.js(\?.*)?$/i,
                terserOptions: {
                    sourceMap: true,
                },
            }),
        ],
    },
};