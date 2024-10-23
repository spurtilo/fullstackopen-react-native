import { Platform } from 'react-native';

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    textWhite: '#FFFFFF',
    textError: '#d73a4a',
    mainBackground: '#e1e4e8',
    whiteBackground: '#FFFFFF',
    appBar: '#24292e',
    primary: '#0366d6',
  },
  fontSizes: {
    body: 14,
    subHeading: 16,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System',
    }),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
};

export default theme;
