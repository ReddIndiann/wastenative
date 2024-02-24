import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './UserTabs/layout';
import UserInfo from './Pages/UserInfo';
import DriverTabs from './DriverTabs/layout';
import InfoScreen from './Pages/InfoScreen';
import CompanyList from './Chat/CompanyList';
const Stack = createNativeStackNavigator();

const AppStack = ({ initialRouteName }) => {
  return (
    <Stack.Navigator initialRouteName={initialRouteName}>
      <Stack.Screen options={{ headerShown: false }} name="Tabs" component={Tabs} />
      <Stack.Screen options={{ headerShown: false }} name="DriverTabs" component={DriverTabs} />
      <Stack.Screen options={{ headerShown: false }} name="InfoScreen" component={InfoScreen} />
      <Stack.Screen options={{ headerShown: false }} name="UserInfo" component={UserInfo} />
      <Stack.Screen options={{headerShown:false}} name='CompanyList' component={CompanyList}/>
    </Stack.Navigator>
  );
};

export default AppStack;
