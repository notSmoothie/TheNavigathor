import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import MainScreen from './src/screens/MainScreen';
import CPScreen from './src/screens/CPScreen';
import ScheduleScreen from './src/screens/ScheduleScreen';
import {LogBox} from 'react-native';

const RootStack = createStackNavigator();

const App = () => {
  LogBox.ignoreAllLogs;
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
          name="Home"
          component={MainScreen}
          options={{headerShown: false}}
        />
        <RootStack.Screen
          name="Schedule"
          component={ScheduleScreen}
          options={{headerShown: false}}
        />
        <RootStack.Screen
          name="CP"
          component={CPScreen}
          options={{headerShown: false}}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
