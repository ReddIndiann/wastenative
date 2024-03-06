import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeIcon,ChatBubbleLeftIcon,ClockIcon } from 'react-native-heroicons/outline';// Assuming you are using Expo, change this if not

import HomeScreen from './HomeScreen';
import HaulRequests from './HaulRequests';
import DriverInfo from './DriverInfo';
import ChatStackScreen from '../Chat/layout';


const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    height: '10%',
   
    backgroundColor: '#179A72',
    width: '100%',
   
    bordertopRadius: '16',
    shadowColor: '#000',
    
  },
};

const Tab = createBottomTabNavigator();

const DriverTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={screenOptions}
      tabBarActiveTint
    >
      <Tab.Screen
        name="HaulRequests"
        component={DriverInfo}
        options={{
          tabBarIcon: ({ color, size }) => (
            <ClockIcon color=
            'white' size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <HomeIcon color=
            "white" size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Userinfo"
        component={DriverInfo}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <ChatBubbleLeftIcon color="white" size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default DriverTabs;