import { FlatList, StyleSheet, Text, TouchableOpacity, View,SafeAreaView,Image } from 'react-native'
import {useEffect,useState,useContext} from 'react'
import axios from 'axios'
import UserIcon from '../Images/userIcon.png'
import { Avatar } from "@react-native-material/core";
import { useChatContext } from 'stream-chat-expo';
import { AuthContext } from '../context/AuthContext';

export default function ChatScreen() {
  const [companies, setCompanies] = useState([]);
  const {client}= useChatContext();
  const {userInfo}= useContext(AuthContext);
  const myId = userInfo.id;
  const receiverId = companies._id;
  useEffect(() => {
    axios.get('http://172.20.10.5:5000/api/drivers/companies')
    .then(res=>{
      console.log(res.data)
      setCompanies(res.data)
    })
    console.log(myId,receiverId)
  }, [])

  const startChannel = async (userId) => {
    const channel = client.channel('messaging', {
      members: [myId, userId],
    });
    await channel.watch();
    navigation.navigate('ChatRoom', { channel }); // Navigate to ChatRoom with the channel
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity 
        style={styles.item}
        onPress={() => startChannel(item._id)}
      >
        <Avatar label={item.username} size={45} style={{ marginRight: "3%", }}/>
        <Text style={styles.text}>{item.username}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex:1,alignItems:"center"}}>
      <FlatList
      style={{width:"100%",gap:10,marginTop:"5%"}}
        data={companies}
        renderItem={renderItem}
        keyExtractor={item => item.id ? item.id.toString() : Math.random().toString()}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'dodgerblue',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    width: '100%',
    height: 70,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
})