import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import AppStack from './AppStack';

export default function Navigations() {
  return (
    <NavigationContainer>

      <AuthStack />
      {/* <AppStack /> */}
    </NavigationContainer>
  );
}
