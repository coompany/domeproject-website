const path = require('path');
const mode = process.env.NODE_ENV || 'production';
const devMode = mode !== 'production';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const optimization = {
  minimizer: [
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
      sourceMap: true // set to true if you want JS source maps
    }),
    new OptimizeCSSAssetsPlugin({})
  ]
};

const rules = [
  {
    test: /\.pug$/,
    loader: 'pug-loader'
  }, {
    test: /\.scss$/,
    use: [
      MiniCssExtractPlugin.loader,
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          plugins: () => [ require('precss'), require('autoprefixer') ]
        }
      },
      'sass-loader'
    ]
  }, {
    test: /\.(png|svg|jpg|gif)$/,
    loader: 'file-loader'
  }, {
    test: /\.(woff|woff2|eot|ttf|otf)$/,
    loader: 'file-loader'
  }
];

const config = {
  entry: {
    main: ['./src/main.js', './src/style.scss']
  },
  devServer: {
    contentBase: './dist'
  },
  optimization,
  mode: mode,
  resolve: {
    alias: {
      'jquery': 'jquery/dist/jquery.slim.js',
    }
  },
  module: { rules },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new MiniCssExtractPlugin({
      filename: '[name].bundle.css'
    }),
    new HtmlWebpackPlugin({
      template: './src/index.pug',
      filename: 'index.html'
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};

module.exports = config;
