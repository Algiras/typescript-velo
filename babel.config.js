module.exports = function (api) {
  api.cache(true);

  const presets = [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
        },
      },
    ],
    "@babel/preset-typescript",
  ];

  return {
    presets,
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "public/API": "./tests/fakes/API",
            "wix-data": "./wix-data",
          },
        },
      ],
    ],
  };
};
