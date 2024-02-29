import React from 'react';
import { Channel, MessageList, MessageInput } from 'stream-chat-expo';
import { useRoute } from '@react-navigation/native';

export default function ChatRoom() {
  const route = useRoute();
  const { channel } = route.params; // Extracting channel from navigation params

  return (
    <Channel channel={channel}>
      <MessageList />
      <MessageInput />
    </Channel>
  );
}

// You can add styles if needed