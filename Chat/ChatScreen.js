import { FlatList, StyleSheet, Text, TouchableOpacity, View,SafeAreaView,Image } from 'react-native'
import {useEffect,useState,useContext} from 'react'
import axios from 'axios'
import UserIcon from '../Images/userIcon.png'
import { Avatar } from "@react-native-material/core";

export default function ChatScreen() {
  const [companies, setCompanies] = useState([]);
  useEffect(() => {
    axios.get('http://190.168.4.77:5000/api/drivers/companies')
    .then(res=>{
      console.log(res.data)
      setCompanies(res.data)
    })
  }, [])

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity 
        style={styles.item}
        onPress={() => navigation.navigate('CompanyDetails', { companyId: item.id })}
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