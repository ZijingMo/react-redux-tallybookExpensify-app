const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


// This variable specifies the environment in which an application is running such as development, staging, production, testing, etc.
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'test') {
  // Using dev-dependency 'dotenv' to simplify the process 
  require('dotenv').config({ path: '.env.test' });
} else if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: '.env.development' });
}


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
        CSSExtract,
        // They are for client side firebase setup
        new webpack.DefinePlugin({
          'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
          'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
          'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
          'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
          'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
          'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
          'process.env.FIREBASE_APP_ID': JSON.stringify(process.env.FIREBASE_APP_ID),
          'process.env.FIREBASE_MEASUREMENT_ID': JSON.stringify(process.env.FIREBASE_MEASUREMENT_ID)
        })
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





