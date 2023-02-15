import {createNativeStackNavigator} from '@react-navigation/native-stack';

// components
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen.js';
import ForgetPasswordScreen from '../screens/ForgetPasswordScreen.js';
import SignUpScreen from '../screens/SignUpScreen.js';
import DrawerNavigation from './DrawerNavigation';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import YourBagScreen from '../screens/YourBagScreen';
import InformationPage from '../screens/InformationPage';
import LastScreen from '../screens/LastScreen';
import YourFavouriteScreen from '../screens/YourFavouriteScreen';
import ProfileScreen from '../screens/ProfileScreen';
import DeleteScreen from '../screens/DeleteScreen';
import AdminTabNavigation from './AdminTabNavigation';

const Stack = createNativeStackNavigator();
function StackNavigation() {
  return (
    <Stack.Navigator screenOptions={{animation: 'slide_from_right'}}>
      <Stack.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ForgetPasswordScreen"
        component={ForgetPasswordScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HomeScreen"
        component={DrawerNavigation}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProductDetailScreen"
        component={ProductDetailScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="YourBagScreen"
        component={YourBagScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="InformationPage"
        component={InformationPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LastScreen"
        component={LastScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="YourFavouriteScreen"
        component={YourFavouriteScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DeleteScreen"
        component={DeleteScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AdminTabNavigation"
        component={AdminTabNavigation}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default StackNavigation;
