import React from 'react'
import { ThemeProvider } from 'styled-components'
import { AuthProvider } from './src/hooks/auth';
import FlashMessage from "react-native-flash-message";

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

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Routes />
        <FlashMessage position='top' />
      </ThemeProvider>
    </AuthProvider>
  );
};