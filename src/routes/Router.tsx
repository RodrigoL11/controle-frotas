import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import {App}  from './AppStack';
import {Auth} from './AuthStack';
import { useAuth } from '../hooks/auth';
import { View, Text } from 'react-native';

export default function Routes() {
  const { authData, loading } = useAuth();
  if(loading) {
    return(
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Carregando aplicativo...</Text>
      </View>
    )
  }
  return (
    <NavigationContainer>
        {authData ? <App /> : <Auth />}
    </NavigationContainer>
  )
}