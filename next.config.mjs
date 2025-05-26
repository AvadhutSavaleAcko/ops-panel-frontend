/* eslint-disable */
import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const SentryWebpackPluginOptions = {
  silent: true
};

const basePath = "";

const env = dotenv.config();
dotenvExpand(env);

let plugins = [];

let withBundleAnalyzer = null;

if (process.env.ANALYZE === "true") {
  withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: true
  });

  plugins = [withBundleAnalyzer, ...plugins];
}

const revision = (process.env.GIT_REVISION || "head").toString().trim();

const nextAssetPrefix = process.env.NEXT_ASSET_PREFIX
  ? process.env.NEXT_ASSET_PREFIX + "/" + revision
  : "";

const imageOutputPath = "static/";
const imageStaticBase = "/_next/" + imageOutputPath;

const getNextImageVirtualPath = () => {
  return `${process.env.NEXT_IMAGE_BASE_PREFIX}/_next/image`;
};

function getCompleteImgOutputPath() {
  let basePath = "";

  if (nextAssetPrefix) {
    basePath = nextAssetPrefix + imageStaticBase;
  } else {
    basePath = imageStaticBase;
  }

  return basePath;
}

const nextConfig = {
  async rewrites() {
    // Guess why did I do this
    return [
      {
        source: "/ops-panel",
        destination: "/entry_point"
      },
      {
        source: "/gi/auto-storefront/winback-challan/details",
        destination: "/winback-challan/details"
      }
    ];
  },
  images: {
    domains: [
      process.env.CONTAINER_ASSETS_BUCKET,
      "www.acko.com",
      process.env.S3_BUCKET || "",
      process.env.STOREFRONT_S3_BUCKET || "",
      "central-frontend-prod.ackoassets.com",
      "acko-brand.ackoassets.com"
    ],
    path: getNextImageVirtualPath()
  },
  productionBrowserSourceMaps: true,
  assetPrefix: nextAssetPrefix,
  publicRuntimeConfig: {
    appEnv: process.env.APP_ENV
  },
  webpack: (config, { dev, buildId, isServer, webpack }) => {
    const splitChunks = config.optimization && config.optimization.splitChunks;

    if (splitChunks) {
      splitChunks.maxAsyncRequests = 20;
      splitChunks.cacheGroups = {
        default: false,
        vendors: false,
        framework: {
          name: "framework",
          chunks: "all",
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          priority: 40
        },
        lib: {
          test(module) {
            return module.size() > 900000;
          },
          name(module) {
            return /node_modules\/(.*)/
              .exec(module.identifier())[1]
              .replace(/\/|\\/g, "_");
          },
          priority: 30,
          minChunks: 1,
          reuseExistingChunk: true
        },
        commons: {
          name: false,
          chunks: "all",
          minChunks: 16,
          priority: 20
        },
        shared: {
          name: false,
          priority: 10,
          minChunks: 2,
          reuseExistingChunk: true
        }
      };
    }

    let rules = config.module.rules;
    rules = [
      ...rules,
      {
        test: /\.svg$/,
        oneOf: [
          {
            resourceQuery: /url/,
            loader: "svg-url-loader",
            options: {
              limit: 20 * 1024,
              noquotes: true
            }
          },
          {
            loader: "@svgr/webpack",
            options: {
              svgoConfig: {
                plugins: {
                  removeViewBox: false
                }
              }
            }
          }
        ]
      }
    ];

    config.plugins.push(
      new webpack.DefinePlugin({
        "process.env.NEXT_IS_SERVER": JSON.stringify(isServer.toString())
      })
    );
    config.module.rules = rules;
    const env = Object.keys(process.env).reduce((acc, envItem) => {
      acc[`process.env.${envItem}`] = JSON.stringify(process.env[envItem]);
      return acc;
    }, {});
    env["process.env.SENTRY_RELEASE"] = JSON.stringify(buildId);
    config.plugins.push(new webpack.DefinePlugin(env));

    return config;
  }
};

const exportConfig = plugins.reduceRight(
  (wrappedConfig, plugin) => plugin(wrappedConfig),
  nextConfig
);

export default exportConfig;
