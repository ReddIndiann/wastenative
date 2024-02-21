import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import { useContext } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { AuthContext } from './context/AuthContext';

export default function Navigations() {
  const { isLoading, userToken,userInfo } = useContext(AuthContext);
  if (isLoading) {
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  }
  const renderAppStack = () => {
    if (userInfo?.role === 'user') {
      return <AppStack initialRouteName="Tabs" />;
    } else if (userInfo?.role === 'driver') {
      return <AppStack initialRouteName="DriverTabs" />;
    } else {
      return <AuthStack />;
    }
  };

  return (
    <NavigationContainer>
      {userToken ? renderAppStack() : <AuthStack />}
    </NavigationContainer>
  );
}
