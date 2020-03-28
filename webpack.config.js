const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Export the function other than export the object
// When call this arrow function, webpack will return the object
module.exports = (env) => {
    const isProduction = env === 'production';
    const CSSExtract = new ExtractTextPlugin('styles.css');

    //console.log('env: ', env);
    return {
        entry: './src/app.js',
        output: {
            path: path.join(__dirname, 'public', 'dist'),
            filename: 'bundle.js'
        },
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
                }, {
                test: /\.s?css$/,
                use: CSSExtract.extract({
                  use: [
                    {
                      loader: 'css-loader',
                      options: {
                          sourceMap: true
                      }
                    },
                    {
                      loader: 'sass-loader',
                      options: {
                          sourceMap: true
                      }
                    }
                  ]
                })
            }]
    },
    plugins: [
        CSSExtract
    ],
    // The both are source map in dev-tool for the bug-mapping behavior
    devtool: isProduction ? 'source-map' : 'inline-source-map', 
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        // This served up index.html file in the public folder, as a result, we got the 404 at every single time
        historyApiFallback: true,
        // The bundle.js(map) and styles.css(map) don't need to show at folder 'public'
        publicPath: '/dist/'
    }
  };
};





