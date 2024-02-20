import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './UserTabs/layout';
import UserInfo from './Pages/UserInfo';
const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="Tabs" component={Tabs} />
      
    </Stack.Navigator>
  );
};

export default AppStack;
