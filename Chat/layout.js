import { createStackNavigator } from '@react-navigation/stack';
import { useEffect } from 'react';
const ChatStack = createStackNavigator();
import ChatScreen from './ChatScreen';
import {StreamChat} from 'stream-chat';
const API_KEY = "77k783gt8gs7";
const client = StreamChat.getInstance(API_KEY);

const ChatStackScreen = () => (

  <ChatStack.Navigator>
    <ChatStack.Screen name="Chat" component={ChatScreen} />
    <ChatStack.Screen name="ChatRoom" component={ChatRoom} />
  </ChatStack.Navigator>
);

