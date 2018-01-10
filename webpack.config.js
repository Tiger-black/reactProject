module.exports = {
    entry: './app/index.js',
    output: {
        path: './dist',
        filename: 'bundle.js'
    },
    module: {
        loaders: [ //如果我们需要一个css就需要一个css的loader
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            },
            {
                test: /\.js|jsx$/,
                exclude: /node_nodules/,
                loader: 'babel-loader',
                query:{
                    presets:['react','es2015']
                }
            }
        ]
    }
}