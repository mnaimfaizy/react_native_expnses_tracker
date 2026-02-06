const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Firebase JS SDK ships some modules as .mjs/.cjs; Metro needs to know these extensions.
config.resolver.sourceExts = Array.from(
  new Set([...(config.resolver.sourceExts || []), "cjs", "mjs"])
);

module.exports = config;
