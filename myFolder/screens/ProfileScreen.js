import {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {useSelector} from 'react-redux';

function ProfileScreen({navigation}) {
  let [data, setData] = useState();
  const value = useSelector(state => state.User);

  const deleteAccountFn = () => {
    navigation.navigate('DeleteScreen');
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff', padding: 10}}>
      <View
        style={{
          width: '100%',
          backgroundColor: '#9CE5CB',
          padding: 15,
          borderRadius: 15,
        }}>
        {/* user profile */}
        <View
          style={{
            paddingVertical: 10,
            backgroundColor: '#fff',
            padding: 10,
            borderRadius: 10,
            height: 60,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 20, color: '#002140'}}>User Profile</Text>
        </View>

        {/* info */}
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 20,
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              width: 60,
              height: 60,
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon name="person" color="#002140" size={45} />
          </View>

          <View style={{marginVertical: 10}}>
            <Text style={{fontSize: 17, color: '#002140'}}>
              Email: {value.email.email ? value.email.email : 'asd@gmail.com'}
            </Text>

            <View
              style={{
                marginVertical: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{fontSize: 18, color: '#002140', paddingVertical: 10}}>
                Delete an account
              </Text>
              <TouchableOpacity
                onPress={deleteAccountFn}
                style={{
                  width: 150,
                  height: 50,
                  backgroundColor: '#fff',
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: 'bold',
                    color: 'red',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  Delete <Icon name="delete" color="red" size={18} />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default ProfileScreen;
