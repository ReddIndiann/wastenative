import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import { useContext } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { AuthContext } from './context/AuthContext';

export default function Navigations() {
  const { isLoading, userToken } = useContext(AuthContext);
  if (isLoading) {
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  }
  return (
      <NavigationContainer>
        {userToken !==null ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
  );
}
