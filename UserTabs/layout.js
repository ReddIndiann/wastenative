import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeIcon,ChatBubbleLeftIcon,ClockIcon } from 'react-native-heroicons/outline';// Assuming you are using Expo, change this if not

import HomeScreen from '../Pages/HomeScreen';
import History from '../Pages/History';
import UserInfo from '../Pages/UserInfo';

const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    height: '10%',
    elevation: 0.1,
    backgroundColor: '#179A72',
    width: '95%',
    bottom: '2%',
    left: '2%',
    borderRadius: '16',
    shadowColor: '#000',
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
  },
  tabBarActiveTint:{
    color:"white"
  }
};

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={screenOptions}
      tabBarActiveTint
    >
      <Tab.Screen
        name="History"
        component={History}
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
        name="Cart"
        component={UserInfo}
        options={{
          tabBarIcon: ({ color, size }) => (
            <ChatBubbleLeftIcon color="white" size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;