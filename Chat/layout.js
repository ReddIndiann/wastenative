import React, { useEffect, useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ChatScreen from './ChatScreen';
import ChatRoom from './ChatRoom';
import Channels from './Channel';
import { StreamChat } from 'stream-chat';
import { AuthContext } from '../context/AuthContext';
import { OverlayProvider, Chat } from 'stream-chat-expo';
import {PencilSquareIcon} from 'react-native-heroicons/outline';
import { useNavigation} from '@react-navigation/native';

const API_KEY = "77k783gt8gs7";
const client = StreamChat.getInstance(API_KEY);
const ChatStack = createStackNavigator();

const ChatStackScreen = () => {
    const { userInfo, streamToken } = useContext(AuthContext);
    const user_id = userInfo.id;
    const user_name = userInfo.username;
    const navigation = useNavigation();

    useEffect(() => {
        const connectUser = async () => {
            try {
                await client.connectUser({
                    id: user_id,
                    name: user_name,
                    image: 'user_image',
                }, streamToken);
            } catch (error) {
                console.error("Error connecting user to Stream Chat:", error);
                console.log("User ID:", user_id);
                console.log(streamToken)
            }
        };

        connectUser();

        return () => {
            client.disconnectUser();
        };
    }, [user_id, user_name, streamToken]);

    return (
        <OverlayProvider>
            <Chat client={client}>
                <ChatStack.Navigator initialRouteName='Channels'>
                    <ChatStack.Screen name="Channels" options={{headerShown:true,headerRight: () => (
                        <PencilSquareIcon style={{marginRight:"10%"}} onPress={() => navigation.navigate('Users')} />)
                    }} component={Channels} />
                    <ChatStack.Screen name="ChatRoom" component={ChatRoom} />
                    <ChatStack.Screen name="Users" options={{headerShown:true}} component={ChatScreen} />
                </ChatStack.Navigator>
            </Chat>
        </OverlayProvider>
    );
};

export default ChatStackScreen;
