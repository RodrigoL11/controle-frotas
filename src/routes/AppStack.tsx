import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/Home';
import Historic from '../screens/Historic';

const { Navigator, Screen } = createNativeStackNavigator();

export function App() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Home" component={Home} />
      <Screen name="Historic" component={Historic} />
    </Navigator>
  );
}