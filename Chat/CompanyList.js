import { View, Text } from 'react-native'
import {useEffect} from 'react'
import axios from 'axios'

const CompanyList = () => {
    useEffect(()=>{
      axios.get("http://172.20.10.5:5000/api/drivers/companies").then(res=>{
        console.log(res.data)
      })
    },[])
  return (
    <View>
      <Text></Text>
    </View>
  )
}

export default CompanyList