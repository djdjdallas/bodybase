const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "pbs.twimg.com",
      "images.unsplash.com",
      "logos-world.net",
    ],
  },
  webpack: (config, options) => {
    // Adds a rule for .node files
    config.module.rules.push({
      test: /\.node$/,
      loader: "node-loader",
      options: {
        name: "[name].[ext]", // This line is optional, customize as needed
      },
    });

    // Ensure Webpack will include .node files in the output directory
    if (!options.isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        "onnxruntime-node": "commonjs onnxruntime-node",
      });
    }

    // Add alias for onnxruntime-web and ensure only one instance is used
    config.resolve.alias = {
      ...config.resolve.alias,
      "@onnxruntime/web": path.resolve(
        __dirname,
        "node_modules/onnxruntime-web"
      ),
      "onnxruntime-node": path.resolve(
        __dirname,
        "node_modules/onnxruntime-node"
      ),
    };

    return config;
  },
};

module.exports = nextConfig;
