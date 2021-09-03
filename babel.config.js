const path = require('path');
const MODULE_RESOLVER = [
  'module-resolver',
  {
    extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
    root: [path.resolve('./')],
    alias: {
      "@component": "./src/component",
      "@redux": "./src/redux",
      "@saga": "./src/saga",
      "@screen": "./src/screen",
      "@image": "./src/img",
      "@api": "./src/api",
      "@navigation": "./src/navigation",
      "@utils": "./src/utils",

    }
  },
];

const WILDCARD = ['wildcard', {
  'exts': ["js"]
}]

module.exports = {
  // plugins: [MODULE_RESOLVER, WILDCARD],
  presets: ['module:metro-react-native-babel-preset'],
  overrides: [
    {
      exclude: /node_modules/,
      plugins: [MODULE_RESOLVER, WILDCARD]
    }
  ]
};
// module.exports = {
//   presets: ['module:metro-react-native-babel-preset'],
// };
