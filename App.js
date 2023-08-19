import React from 'react';
import Navigator from './src/screens/Navigator';
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import {colors} from './src/constants';
import {Provider} from 'react-redux';
import store from './src/redux/store';

const App = () => {
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
