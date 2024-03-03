import {useState} from 'react';
import { Channel, ChannelList, MessageInput, MessageList } from 'stream-chat-expo';
import { View, StyleSheet } from 'react-native';
import {useNavigation} from '@react-navigation/native'
import ChatRoom from './ChatRoom';

const Channels = () => {
  const navigation = useNavigation(); // Make sure navigation is defined
  const [channel, setChannel] = useState();

  return (
    <View style={styles.container}>
      <ChannelList onSelect={(channel) => {
        setChannel(channel);
        navigation.navigate('ChatRoom', { channel });
      }} />
    </View>
  );
};

export default Channels;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
