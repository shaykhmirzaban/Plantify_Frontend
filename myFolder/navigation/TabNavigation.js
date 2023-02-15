import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, View, Text} from 'react-native';

// redux
import {useSelector} from 'react-redux';

// components
import HomeScreen from '../screens/HomeScreen';
import YourBagScreen from '../screens/YourBagScreen';
import YourFavouriteScreen from '../screens/YourFavouriteScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();
function TabNavigation() {
  let {data} = useSelector(state => state.Favourite);
  let product = useSelector(state => state.Product);
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
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: () => {
            return (
              <Image
                resizeMode="contain"
                style={{width: 30, height: 30}}
                source={require('../images/home.png')}
              />
            );
          },
          tabBarShowLabel: false,
          tabBarItemStyle: {
            borderTopLeftRadius: 20,
          },
        }}
      />
      <Tab.Screen
        name="FavouriteScreen"
        component={YourFavouriteScreen}
        options={{
          tabBarIcon: () => {
            return (
              <View style={{position: 'relative'}}>
                <Image
                  resizeMode="contain"
                  style={{width: 30, height: 30}}
                  source={require('../images/hart.png')}
                />

                <View
                  style={{
                    display: data.length < 1 ? 'none' : 'flex',
                    position: 'absolute',
                    top: -10,
                    right: -10,
                    width: 20,
                    height: 20,
                    borderRadius: 30,
                    backgroundColor: '#0D986A',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: '#fff', fontWeight: 'bold'}}>
                    {data.length}
                  </Text>
                </View>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="YourBagScreen"
        component={YourBagScreen}
        options={{
          tabBarIcon: () => {
            return (
              <View style={{position: 'relative'}}>
                <Image
                  resizeMode="contain"
                  style={{width: 35, height: 35}}
                  source={require('../images/cart.png')}
                />

                <View
                  style={{
                    display: product.data.length < 1 ? 'none' : 'flex',
                    position: 'absolute',
                    top: -5,
                    right: -5,
                    width: 20,
                    height: 20,
                    borderRadius: 30,
                    backgroundColor: '#0D986A',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: '#fff', fontWeight: 'bold'}}>
                    {product.data.length}
                  </Text>
                </View>
              </View>
            );
          },
          tabBarStyle: {
            display: 'none',
          },
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarIcon: () => {
            return (
              <Image
                resizeMode="contain"
                style={{width: 30, height: 30}}
                source={require('../images/profile.png')}
              />
            );
          },

          tabBarItemStyle: {
            borderTopRightRadius: 20,
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigation;
