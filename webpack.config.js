var path = require('path') // this is so we have path so we can set the output path
module.exports = {
        mode: "development",
        entry:{
                main: "./client/src/js/main.jsx",
        },
        output:{
                filename:"bundle.js",
                path: path.join(__dirname, "./client"),
        },
        module: {
                rules: [
                        {
                                test: /\.(js|jsx)$/,
                                exclude: /node_modules/,
                                use: {
                                        loader: "babel-loader"
                                }
                        }
                ]
        }
};
