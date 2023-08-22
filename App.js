import React from 'react';
import Navigator from './src/screens/Navigator';
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import {colors} from './src/constants';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import {LogBox} from 'react-native';

const App = () => {
  LogBox.ignoreLogs([
    '@rnmapbox/maps: Non v10 implementations are deprecated and will be removed in next version - see https://github.com/rnmapbox/maps/wiki/Deprecated-RNMapboxImpl-Maplibre',
  ]);
  const theme = {
    ...DefaultTheme,
    dark: false,
    colors: {
      ...DefaultTheme.colors,
      primary: colors.yellow,
    },
  };

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <Navigator />
      </PaperProvider>
    </Provider>
  );
};

export default App;
