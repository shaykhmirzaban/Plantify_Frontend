import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {View} from 'react-native';
// redux

// components
import AddProductScreen from '../screens/admin/AddProductScreen';
import AdminHomeScreen from '../screens/admin/AdminHomeScreen';

const Tab = createBottomTabNavigator();

function AdminTabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarActiveTintColor: '#000',
        tabBarActiveBackgroundColor: '#fff',
        tabBarStyle: {
          height: 60,
          backgroundColor: '#FFF',
          shadowColor: '#000000',
          shadowOffset: {
            width: 0,
            height: 15,
          },
          shadowOpacity: 0.24,
          shadowRadius: 16.41,
          elevation: 20,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        },
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="AdminHomeScreen"
        component={AdminHomeScreen}
        options={{
          tabBarIcon: () => {
            return (
              <View
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: '#eee',
                  borderRadius: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 5,
                }}>
                <Icon name="home" size={30} color="#002140" />
              </View>
            );
          },
          tabBarShowLabel: false,
          tabBarItemStyle: {
            borderTopLeftRadius: 20,
          },
        }}
      />
      <Tab.Screen
        name="AddproductScreen"
        component={AddProductScreen}
        options={{
          tabBarIcon: () => {
            return (
              <View
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: '#eee',
                  borderRadius: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 5,
                }}>
                <Icon name="add" size={30} color="#002140" />
              </View>
            );
          },
          tabBarShowLabel: false,
          tabBarItemStyle: {
            borderTopLeftRadius: 20,
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default AdminTabNavigation;
