import {createDrawerNavigator} from '@react-navigation/drawer';

// components
import CustomDrawer from './CustomDrawer.js';
import TabNavigation from './TabNavigation.js';

const Drawer = createDrawerNavigator();
function DrawerNavigation() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: '#00ffac33',
      }}
      drawerContent={props => {
        return <CustomDrawer {...props} />;
      }}>
      <Drawer.Screen
        name="HomePage"
        component={TabNavigation}
        options={{
          drawerLabel: 'Shop',
          drawerLabelStyle: {
            color: '#fff',
            fontSize: 20,
          },
        }}
      />
      <Drawer.Screen
        name="PlantCareScreen"
        component={TabNavigation}
        options={{
          drawerLabel: 'Plant Care',
          drawerLabelStyle: {
            color: '#fff',
            fontSize: 20,
          },
        }}
      />

      <Drawer.Screen
        name="CommunityScreen"
        component={TabNavigation}
        options={{
          drawerLabel: 'Community',
          drawerLabelStyle: {
            color: '#fff',
            fontSize: 20,
          },
        }}
      />
      <Drawer.Screen
        name="MyAccountScreen"
        component={TabNavigation}
        options={{
          drawerLabel: 'My Account',
          drawerLabelStyle: {
            color: '#fff',
            fontSize: 20,
          },
        }}
      />
      <Drawer.Screen
        name="TrackOrderScreen"
        component={TabNavigation}
        options={{
          drawerLabel: 'Track Order',
          drawerLabelStyle: {
            color: '#fff',
            fontSize: 20,
          },
        }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigation;
