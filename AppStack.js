import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './UserTabs/layout';
import UserInfo from './Pages/UserInfo';
import DriverTabs from './DriverTabs/layout';
const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="Tabs" component={Tabs} />
      <Stack.Screen options={{ headerShown: false }} name="DriverTabs" component={DriverTabs} />
    </Stack.Navigator>
  );
};

export default AppStack;
