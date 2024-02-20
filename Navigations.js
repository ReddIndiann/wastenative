import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import { AuthProvider } from './context/AuthContext';

export default function Navigations() {
  return (
    <AuthProvider>
      <NavigationContainer>

      <AuthStack />
      {/* <AppStack /> */}
      </NavigationContainer>
    </AuthProvider>
  );
}
