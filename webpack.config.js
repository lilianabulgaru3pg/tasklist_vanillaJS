const path = require('path');
module.exports = {
    entry: { main: './src/index.js' },
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    // module: {
    //     rules: [
    //         {
    //             test: /\.js$/,
    //             exclude: /node_modules/,
    //             use: {
    //                 loader: "babel-loader"
    //             }
    //         }
    //     ]
    // },
    devServer: {
        // contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 3000
      }
};