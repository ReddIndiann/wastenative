import {useState} from 'react';
import { Channel, ChannelList, MessageInput, MessageList } from 'stream-chat-expo';
import { View, StyleSheet } from 'react-native';
import ChatRoom from './ChatRoom';

const Channels = () => {
  const [channel,setChannel] = useState();
  if(channel){
    return <Channel channel={channel} >
      <MessageList />
      <MessageInput />
    </Channel>
  }
  return (
    <View style={styles.container}>
      <ChannelList onSelect={(channel)=>setChannel(channel)} />
    </View>
  );
};

export default Channels;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
