/*
Webpack
一个现代 JavaScript 应用程序的模块打包器，获取具有依赖关系的模块，并生成表示这些模块的静态资源；
当 webpack 处理应用程序时，它会在内部从一个或多个入口点递归地构建一个依赖关系图，依赖图包含着应用程序中所需的每个模块，然后将项目中所需的每一个模块组合成一个或多个 bundles，它们均为静态资源
四个核心概念：入口(entry)、输出(output)、加载器(loader)、插件(plugins)

入口(entry):
指示 webpack 应该使用哪个模块，来作为构建其内部 依赖图(dependency graph) 的开始;
*/
module.exports = {
  entry: './src/main.js',
  entry: {
    main: './path/to/my/entry/file.js',
  },
  entry: ['./src/file_1.js', './src/file_2.js'],
  // 多入口
  entry: { // 配置 2 个单独的入口点,在 vendor.js 中存入未做修改的必要 library 或文件（例如 Bootstrap, jQuery, 图片等），然后将它们打包在一起成为单独的 chunk。内容哈希保持不变，这使浏览器可以独立地缓存它们，从而减少了加载时间。
    main: './src/app.js',
    vendor: './src/vendor.js',
  },
  // 多页面,生成三个独立分离的依赖图
  entry: {
    pageOne: './src/pageOne/index.js',
    pageTwo: './src/pageTwo/index.js',
    pageThree: './src/pageThree/index.js',
  },
}

/*
输出(output):
告诉 webpack 在哪里输出它所创建的 bundle，以及如何命名这些文件；
*/
var path = require('path')
module.exports = {
  output: {
    path: path.resolve(__dirname, './dist'), //  bundle 生成位置
    filename: 'build.js', // 主要输出文件,存在dist文件夹中
    chunkFilename: 'chunk[id].js?[chunkhash]', // chunk文件命名
    publicPath: '/dist/',
  },
  output: {
    filename: '[name].js', // 对应entry有多个入口，输出如./dist/app.js, ./dist/vendor.js
  },
}

/*
加载器(loader)：
webpack 只能理解 JavaScript 和 JSON 文件，loader 让 webpack 能够去处理其他类型的文件，并将它们转换为有效模块，添加到依赖图中；
必须属性：test 和 use/loader,告诉webpack 编译器，当碰到「在 require()/import 语句中被解析为 '.txt' 的路径」时，在你对它打包之前，先 use(使用)loader预处理转换一下；

test：匹配规则，针对符合规则的文件进行处理;
use：字符串、数组（每一项既可以是字符串也可以是一个对象，当我们需要在webpack 的配置文件中对 loader 进行配置，就需要将其编写为一个对象，并且在此对象的 options 字段中进行配置）
*/
module.exports = {
  module: { // 必须定义在module中
    rules: [{
      test: /\.txt$/,
      use: 'raw-loader'
    }, {
      test: /\.css$/, // 指示 webpack 对每个 .css 使用 css-loader
      use: ['style-loader', 'css-loader']
    },{
      test: /\.css$/, // 指示 webpack 对每个 .css 使用 css-loader
      loader: 'style-loader!css-loader'
    }, { // loader 从右到左（或从下到上）地取值执行,以下从 sass-loader 开始执行，然后继续执行 css-loader，最后以 style-loader 为结束
      test: /\.css$/,
      use: [{
          loader: 'style-loader'
        },
        {
          loader: 'css-loader',
          options: {
            modules: true
          }
        },
        {
          loader: 'sass-loader'
        }
      ]
    }],
  },
};

/*
插件(plugins):
扩展webpack功能，包括：打包优化，资源管理，注入环境变量
想要使用一个插件，你只需要 require() 它，然后把它添加到 plugins 数组中。多数插件可以通过选项(option)自定义。你也可以在一个配置文件中因为不同目的而多次使用同一个插件，这时需要通过使用 new 操作符来创建一个插件实例。
*/
module.exports = {
  plugins: [
    new HtmlWebpackPlugin({ // 插件,html-webpack-plugin 为应用程序生成一个 HTML 文件，并自动将生成的所有 bundle 注入到此文件中
      template: './src/index.html'
    }),
    new webpack.ProgressPlugin(),
  ],
}

/*
配置（Configuration）:
模式(mode):启用 webpack 内置在相应环境下的优化，值包括development、production(默认)、none
 development：将 process.env.NODE_ENV 的值设置为 development
 production：将 process.env.NODE_ENV 的值设置为 production
*/
module.exports = {
  mode: 'development'
}


/*
打包处理:
1 删除掉 devServer 相关的配置项
2 将图片和字体文件输出到指定的文件夹中
3 自动删除dist目录
4 分离第三方包（将使用的vue等第三方包抽离到 vender.js 中）
5 压缩混淆JS 以及 指定生成环境
6 抽取和压缩CSS文件
7 压缩HTML页面
8 配合vue的异步组件，实现按需加载功能
*/

// 2 将图片和字体文件输出到指定的文件夹中
module.exports = {
  module: {
    rules: [{
      test: /\.(jpg|png|gif|bmp|jpeg)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'images/[hash:7].[ext]' // 指定文件输出路径和输出文件命令规则,作用：将图片输出到images文件夹中，文件名采用7位的哈希值（MD5），并且保持原来的图片文件扩展名
        }
      }
    }]
  }
}
// 3 自动删除dist目录
const cleanWebpackPlugin = require('clean-webpack-plugin')
module.exports = {
  plugins: [
    // 创建一个删除文件夹的插件，删除dist目录
    new cleanWebpackPlugin(['./dist'])
  ]
}
// 4 分离第三方包（将使用的vue等第三方包抽离到 vender.js 中）
module.exports = {
  entry: {
    app: path.join(__dirname, './src/js/main.js'), // 项目代码入口
    vendor: ['vue', 'vue-router', 'axios'] // 第三方包入口
  },
  output: {
    filename: 'js/[name].[chunkhash].js', //修改输出文件路径和命名规则
  },
  plugins: [
    // 3 抽离第三方包
    new webpack.optimize.CommonsChunkPlugin({
      // 将 entry 中指定的 ['vue', 'vue-router', 'axios'] 打包到名为 vendor 的js文件中
      // 第三方包入口名称，对应 entry 中的 vendor 属性
      name: 'vendor',
    }),
  ]
}
// 压缩混淆JS 以及 指定生成环境
module.exports = {
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      // 压缩
      compress: {
        // 移除警告
        warnings: false
      }
    }),

    // 指定环境为生产环境：vue会根据这一项启用压缩后的vue文件
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ]
}
// 7 压缩HTML页面
module.exports = {
  plugins: [new htmlWebpackPlugin({
    // 模板页面
    template: path.join(__dirname, './index.html'),

    // 压缩HTML
    minify: {
      // 移除空白
      collapseWhitespace: true,
      // 移除注释
      removeComments: true,
      // 移除属性中的双引号
      removeAttributeQuotes: true
    }
  }), ]
}
// 8 配合vue的异步组件，实现按需加载功能

// 第一步：修改组件引用方式
// 方式一: require.ensure()
const NewsList = r => require.ensure([], () => r(require('../components/news/newslist.vue')), 'news')
// 方式二: import() -- 推荐
// 注意：/* webpackChunkName: "newsinfo" */ 是一个特殊的语法，表示生成js文件的名称
const NewsInfo = () => import(/* webpackChunkName: "newsinfo" */ '../components/news/newsinfo.vue')

// 第二步：修改 webpack 配置文件的output
module.exports = {
  output: {
    // ------添加 chunkFilename, 指定输出js文件的名称------
    chunkFilename: 'js/[name].[chunkhash].js',
  },
}