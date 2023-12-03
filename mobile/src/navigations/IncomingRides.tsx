import Home from '@/modules/home';
import IncomingRides from '@/modules/incoming-rides';
import { FCC } from '@/types';
import { RootStackRoute } from '@/types/navigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

const IncomingRidesNavigation: FCC = () => {
  const Stack = createNativeStackNavigator<RootStackRoute>();
  return (
    <Stack.Navigator
      initialRouteName="home"
      screenOptions={{
        header: () => null,
        animation: 'fade',
      }}
    >
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="incoming" component={IncomingRides} />
    </Stack.Navigator>
  );
};

export default IncomingRidesNavigation;
