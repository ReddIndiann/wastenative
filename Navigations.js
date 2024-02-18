import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pressable,Image} from 'react-native';
import SplashScreen from './Pages/SplashScreen';
import RegistrationScreen from './Pages/RegistrationScreen';
import Logincreen from './Pages/LoginScreen';
import HomeScreen from './Pages/HomeScreen';

const Stack = createNativeStackNavigator();
export default function Navigations() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen options={{headerShown: false}} name="SPLASH" component={SplashScreen} />
        <Stack.Screen options={{headerShown: false}} name="signIn" component={RegistrationScreen} />
        <Stack.Screen options={{headerShown: false}} name="login" component={Logincreen} />
        <Stack.Screen options={{headerShown: false}} name="homescreen" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
