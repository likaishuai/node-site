const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/app.js',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname,'./dev')
    },
// 配置webserver
devServer:{
    contentBase: path.join(__dirname, './dev'),
    compress: true,
    port: 8000,
    proxy: {
        '/api':{
            target:"http://localhost:3000"
        }
    }
},
//配置loader 解析各类文件（file-loader  url-loader）
module :{
    rules: [
        {
            test:/\.(png|jpg|gif)$/i,
            use:[
                {
                    loader: 'url-loader',
                    options:{
                        limit: 1,
                    } 
                },
            ],
        },
        {
            test: /\.html$/i,
            use: {
                loader: 'string-loader'
            }
        },
        {
            test:/\.hbs$/i,
            use:{
                loader: 'handlebars-loader'
            }
        },
        {
            test:/\.(scss|css)/i,
            use:  ['style-loader','css-loader','sass-loader']
        }
    ],
},

//配置插件
plugins: [
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './index.html'
    }),
    new CopyPlugin([
        {from:"./src/public",to: "./public"}
    ])
]

}