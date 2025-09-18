import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '../screens/Dashboard';
import ControlPanel from '../screens/ControlPanel';
import Schedules from '../screens/Schedules';

const Tab = createBottomTabNavigator();

export default function MainNavigator(){
  return (
    <Tab.Navigator screenOptions={{headerShown:false}}>
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Control" component={ControlPanel} />
      <Tab.Screen name="Schedules" component={Schedules} />
    </Tab.Navigator>
  );
}