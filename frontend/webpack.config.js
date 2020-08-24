const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpritePlugin = require('svg-sprite-loader/plugin');
const CopyPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const isProd = process.env.NODE_ENV === 'production';
const config = {
  devtool: 'cheap-module-eval-source-map',
  sourceMap: true
};
if (isProd) {
  config.devtool = '';
  config.sourceMap = false;
}
console.log(config)
module.exports = {
  entry: {
    main: path.resolve(__dirname, 'src/main.ts')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
          transpileOnly: true
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'vue-style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: config.sourceMap
            }
          }
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'vue-style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: config.sourceMap
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: config.sourceMap
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /favicon\.ico$/,
        loader: 'file-loader',
        options: {
          name: 'favicon.ico'
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          name: 'img/[name].[ext]?[hash]'
        }
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        options: {
          extract: true
        }
      }
    ]
  },
  resolve: {
    extensions: ['.vue', '.ts', '.js', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  devServer: {
    historyApiFallback: true,
    overlay: true,
    contentBase: path.join(__dirname, 'dist'),
    port: 9000,
    proxy: {
      // '/api': {
      //   target: 'http://localhost:3000'
      // },
      '/upload': {
        target: 'http://localhost:3000'
      },
    }
  },
  performance: {
    hints: false
  },
  devtool: config.devtool,
  plugins: [
    new VueLoaderPlugin(),
    new CopyPlugin({ patterns: [
      {
        from: path.resolve(__dirname, 'src/assets/images/favicon.ico'),
        to: path.resolve(__dirname, 'dist')
      }
    ]}),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/index.html')
    }),
    new SpritePlugin({ plainSprite: true }),
  ]
};
