import React from 'react';
import Navigator from './src/screens/Navigator';
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';

const App = () => {
  const theme = {
    ...DefaultTheme,
    dark: false,
  };

  return (
    <PaperProvider theme={theme}>
      <Navigator />
    </PaperProvider>
  );
};

export default App;