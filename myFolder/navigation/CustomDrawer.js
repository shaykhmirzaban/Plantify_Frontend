import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {Text, View, TextInput} from 'react-native';

function CustomDrawer(props) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#0B845C',
        justifyContent: 'center',
        padding: 10,
      }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{
          justifyContent: 'center',
          width: '100%',
        }}>
        <DrawerItemList {...props} />
        <View style={{marginVertical: 20, paddingHorizontal: 20}}>
          <Text style={{color: '#fff', paddingVertical: 10, fontSize: 16}}>
            Get The Dirt.
          </Text>
          <TextInput
            placeholder="Enter your email"
            placeholderTextColor={'#ffffff6e'}
            style={{
              borderWidth: 1,
              borderColor: '#FFFFFF',
              borderStyle: 'solid',
              padding: 10,
              borderRadius: 5,
              fontSize: 17,
              height: 60,
            }}
          />
        </View>
      </DrawerContentScrollView>

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'flex-start',
          paddingHorizontal: 25,
        }}>
        <Text style={{fontSize: 16, color: '#eee', fontWeight: 600}}>FAQ</Text>
        <Text style={{fontSize: 16, color: '#eee', fontWeight: 600}}>
          ABOUT US
        </Text>
        <Text style={{fontSize: 16, color: '#eee', fontWeight: 600}}>
          CONTACT US
        </Text>
      </View>

      <View
        style={{
          paddingHorizontal: 27,
          paddingTop: 10,
        }}>
        <Text
          style={{
            fontSize: 12,
            color: '#fff',
          }}>
          Created By: Shaykh Mirzaban
        </Text>
      </View>
    </View>
  );
}

export default CustomDrawer;
