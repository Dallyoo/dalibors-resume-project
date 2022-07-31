const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const postcssPresetEnv = require("postcss-preset-env");
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
// We are getting 'process.env.NODE_ENV' from the NPM scripts
const devMode = process.env.NODE_ENV !== "production";
module.exports = {
    // Set the caching filesystem
    cache: {
        type: 'filesystem',
        version: 'dev1',
    },
    // Tells Webpack which built-in optimizations to use
    // If you leave this out, Webpack will default to 'production'
    mode: devMode ? "development" : "production",
    // Webpack needs to know where to start the bundling process,
    // so we define the Sass file under './Styles' directory
    entry: {
        main: "./Styles/scss/styles.scss",
        "bundle": "./Scripts/scripts.js",
        "bundle.min": "./Scripts/scripts.js",
    },
    devtool: "source-map",
    output: {
        path: path.resolve(__dirname, "wwwroot"),
        // Specify the base path
        //publicPath: "/dist",
        // The name of the output bundle.
        filename: "js/[name].js"
    },
    module: {
        // Array of rules that tells Webpack how the modules (output)
        // will be created
        rules: [
            {
                // Look for Sass files and process them according to the
                // rules specified in the different loaders
                test: /\.(sa|sc|c)ss$/,
                // Use the following loaders from right-to-left, so it will
                // use sass-loader first and ending with MiniCssExtractPlugin
                use: [
                    {
                        // Extracts the CSS into a separate file and uses the
                        // defined configurations in the 'plugins' section
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
                                // CSS when in production mode, otherwise don't do
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
                        loader: 'resolve-url-loader'
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
                // Adds support for javascript
                test: /\.(js)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'js/[name][ext]',
                },

                // Adds support to load images in your CSS rules. It looks for
                test: /\.(png|jpe?g|gif|svg)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/img/[name][ext]',
                },
            },
            {
                //Adds support for fonts
                test: /\.(woff(2)?|ttf|eot)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[name][ext]',
                },
            }
        ]
    },
    plugins: [
        // Configuration options for MiniCssExtractPlugin. Here I'm only
        // indicating what the CSS output file name should be and
        // the location
        new MiniCssExtractPlugin({
            filename: devMode ? "css/styles.css" : "css/styles.min.css",
        }),
        // Copy plugin for required static files
        new CopyPlugin({
            patterns: [
                {
                    from: "js/",
                    to: "js",
                    toType: "dir",
                    context: "node_modules/bootstrap-dark-5/dist/",
                    globOptions: {
                        dot: true,
                        gitignore: true,
                        ignore: ["**.ts", "**.ts.map"],
                    },
                },
                {
                    from: "img/",
                    to: "assets/img",
                    toType: "dir",
                    context: "Styles/",
                    globOptions: {
                        dot: true,
                    },
                }
            ],
        }),
    ],
    // Minify JS files
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: false,
                include: /\.min\.js$/,
                terserOptions: {
                    module: false
                },
            }),
        ]
    }
};