const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

module.exports = withNativeWind(
  (async () => {
    const {
      resolver: { sourceExts, assetExts },
      transformer,
    } = await getDefaultConfig(__dirname);

    return {
      transformer: {
        ...transformer,
        babelTransformerPath: require.resolve('react-native-svg-transformer'),
      },
      resolver: {
        assetExts: assetExts.filter(ext => ext !== 'svg'),
        sourceExts: [...sourceExts, 'svg'],
      },
    };
  })(),
  { input: './global.css' }, // Ensure this matches your Tailwind setup
);
