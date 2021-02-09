import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Preload from '../screens/Preload';
import Login from '../screens/Login';
import Register from '../screens/Register';
import ChooseProperty from '../screens/ChooseProperty';
import MainDrawer from '../stacks/MainDrawer';

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#F5F6FA',
          elevation: 0,
          shadowOpacity: 0,
        },
      }}>
      <Stack.Screen
        name="Preload"
        component={Preload}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: true}}
      />

      <Stack.Screen
        name="ChooseProperty"
        component={ChooseProperty}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="MainDrawer"
        component={MainDrawer}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
