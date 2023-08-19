import React from 'react';
import Navigator from './src/screens/Navigator';
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import {colors} from './src/constants';

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
    <PaperProvider theme={theme}>
      <Navigator />
    </PaperProvider>
  );
};

export default App;
