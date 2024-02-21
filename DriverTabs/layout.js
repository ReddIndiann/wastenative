import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeIcon,ChatBubbleLeftIcon,ClockIcon } from 'react-native-heroicons/outline';// Assuming you are using Expo, change this if not

import HomeScreen from './HomeScreen';
import HaulRequests from './HaulRequests';
import DriverInfo from './DriverInfo';


const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    height: '10%',
    position: 'absolute',
    elevation: 0.1,
    backgroundColor: '#179A72',
    width: '95%',
    bottom: '0.5%',
    left: '2%',
    borderRadius: '16',
    shadowColor: '#000',
    bottom:"1%"
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
        component={HaulRequests}
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
          tabBarIcon: ({ color, size }) => (
            <ChatBubbleLeftIcon color="white" size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default DriverTabs;