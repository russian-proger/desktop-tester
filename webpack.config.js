const path = require('path');

module.exports = {
    mode: "development",
    entry: "./src/App.js",
    output: {
        path: path.join(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader"
            }
        ]
    }
};