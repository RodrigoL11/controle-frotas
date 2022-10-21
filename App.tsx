import React from 'react'
import { ThemeProvider } from 'styled-components'
import { AuthProvider } from './src/hooks/auth';
import AppLoading from 'expo-app-loading'

import theme from './src/global/styles/theme'
import Routes from './src/routes/Router'

import {
  useFonts,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold
} from '@expo-google-fonts/poppins';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold
  });

  if(!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </AuthProvider>
  );
};