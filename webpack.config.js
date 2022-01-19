const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 基于webpack5

const CssminiMizerWebpackPlugin = require('css-minimizer-webpack-plugin')

const toml = require('toml')
const yaml = require('yaml')
const json5 = require('json5')
 
// 多入口文件导致会把引入的文件分别打包到各自的js

module.exports = {
  // entry: './src/index.js',
  // entry: { // 多入口
  //   index: './src/index.js',
  //   another: './src/another-modules.js'
  // },
  // entry: { // 多入口
    // index: {
    //   import: './src/index.js',
    //   dependOn: 'shared'
    // },
    // another: {
    //   import: './src/another-modules.js',
    //   dependOn: 'shared'
    // },
    // shared: 'lodash' // 将loash抽离，并命名shared
  // },
  entry: { // 多入口
    index: './src/index.js',
    another: './src/another-modules.js'
  },
  // entry: { // 多入口
  //   index: './src/index.js',
  // },
  output: { 
    // filename: 'bundle.js' ,
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, './dist'),
    clean: true,
    assetModuleFilename: 'images/[contenthash][ext]'
  },
  mode: 'development',

  devtool: 'inline-source-map',

  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      inject: 'body' // 打包到哪个标签
    }),

    new MiniCssExtractPlugin({
      filename: 'style/[contenthash].css'
    })  // 配置打包 抽离css 文件
  ],

  optimization: { // 优化项写这里
    minimizer: [
      new CssminiMizerWebpackPlugin()
    ],

    splitChunks: { // webpack内置插件，抽离多文件公共资源
      chunks: 'all'
    } 
  },

  devServer: {
    static: './dist'
  },
  module: {
    rules: [
      {
        test: /\.woff|woff2|eto|ttf|otf$/, // 字体
        type: 'asset/resource', // 生成单独文件

      },

      {
        test: /\.jpg$/,
        type: 'asset/resource', // 生成单独文件
        // generator: {
        //   filename: 'images/test.jpg' // 优先级高于 assetModuleFilename
        // }
      },

      {
        test: /\.svg/,
        type: 'asset/inline',// 生成url路径
      },

      {
        test: /\.txt/,
        type: 'asset/source', //导出资源源代码
      },

      {
        test: /\.png/,
        type: 'asset', // 自动选择类型  大于8k 为 resource  小于8k为inline
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024 * 1024 // 4M
          }
        }
      },

      {
        test: /\.(css|less)/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'], //  先通过 lessloader cssloader 识别处理css文件  再通过style-loader放入文件中 
        
      },
      {
        test: /\.(csv|tsv)/,
        use: [ 'csv-loader'], //  先通过 lessloader cssloader 识别处理css文件  再通过style-loader放入文件中 
        
      },

      {
        test: /\.(xml)/,
        use: ['xml-loader'], //  先通过 lessloader cssloader 识别处理css文件  再通过style-loader放入文件中 
        
      },
      {
        test: /\.toml$/,
        type: 'json',
        parser: {
          parse: toml.parse
        }
      },
      {
        test: /\.yaml$/,
        type: 'json',
        parser: {
          parse: yaml.parse
        }
      },
      {
        test: /\.json5$/,
        type: 'json',
        parser: {
          parse: json5.parse
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              [
                '@babel/plugin-transform-runtime'
              ]
            ]
          }
        }
      }
    ]
  }
}