import axios from 'axios';
import React, {useState} from 'react';
import {
  ScrollView,
  TextInput,
  ToastAndroid,
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import DBURL from '../../config';
import SMButton from '../components/SMButton';

const DeleteScreen = ({navigation}) => {
  let [email, setEmail] = useState('');

  const deleteFn = async () => {
    try {
      await axios({
        url: `${DBURL}/deleteAccount`,
        method: 'delete',
        data: {email: email},
      })
        .then(res => {
          if (res.data.status) {
            ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
            navigation.navigate('LoginScreen');
          } else {
            ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
          }
        })
        .catch(err => {
          ToastAndroid.show(err, ToastAndroid.SHORT);
        });
    } catch (err) {
      ToastAndroid.show(err, ToastAndroid.SHORT);
    }
  };

  return (
    <ScrollView
      style={{
        backgroundColor: '#fff',
        padding: 20,
      }}
      contentContainerStyle={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={{marginVertical: 20}}>
        <Image
          source={require('../images/Logo1.png')}
          style={{width: 170, height: 30}}
          resizeMode="contain"
        />

        <Text style={{paddingVertical: 10, fontSize: 14, color: '#002140'}}>
          Masukan No. Handphone Anda dan tunggu kode autentik dikirimkan
        </Text>
      </View>
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TextInput
          placeholder="enter email"
          onChangeText={e => setEmail(e)}
          style={{
            width: '100%',
            backgroundColor: '#E6E8EB',
            borderRadius: 10,
            paddingHorizontal: 15,
            color: '#004A61CC',
          }}
          placeholderTextColor="#004A61CC"
          keyboardType="email-address"
        />

        <SMButton
          value="Delete Account"
          width="100%"
          background="#fff"
          color="red"
          radius={40}
          size={18}
          onClick={deleteFn}
          Style={{
            borderWidth: 2,
            borderColor: '#eee',
            borderStyle: 'solid',
          }}
        />
      </View>
    </ScrollView>
  );
};

export default DeleteScreen;
