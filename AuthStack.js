import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './Pages/SplashScreen';
import LoginScreen from './Pages/LoginScreen';
import RegistrationScreen from './Pages/RegistrationScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="SPLASH" component={SplashScreen} />
      <Stack.Screen options={{ headerShown: false }} name="login" component={LoginScreen} />
      <Stack.Screen options={{ headerShown: false }} name="signIn" component={RegistrationScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
