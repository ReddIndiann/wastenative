import { FlatList, StyleSheet, Text, TouchableOpacity, View,SafeAreaView,Image } from 'react-native'
import {useEffect,useState} from 'react'
import axios from 'axios'
import UserIcon from '../Images/userIcon.png'

export default function ChatScreen() {
  const [companies, setCompanies] = useState([]);
  useEffect(() => {
    axios.get('http://190.168.31.30:5000/api/drivers/companies')
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
        <Image 
          source={{ uri:UserIcon }} 
          style={styles.image}
        />
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