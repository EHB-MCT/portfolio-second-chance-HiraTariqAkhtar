const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/chart.jsx',
    output: {
        path: path.resolve(__dirname, 'src'),
        filename: 'chart.js',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react'],
                    }
                }
            }
        ]
    }
};