/** @type {import('next').NextConfig} */
const nextConfig = {
 webpack: (config, {buildID, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push({
        test: /\.env$/, loader: 'ignore-loader',
    });
    config.plugins.push(new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development'),
    }));
    return config;
 }   ,
}

export default nextConfig;
