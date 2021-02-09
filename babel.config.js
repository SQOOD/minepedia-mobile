module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ["module-resolver", {
      "root": ["./"],
      "alias": {
        "@img": "./assets/images",
        "@gql": "./data/graphql",
        "@atom": "./data/atoms",
        "@page": "./components/pages",
        "@block": "./components/blocks",
        "@const": "./data/constants"
      }
    }]
    ]
  };
};
