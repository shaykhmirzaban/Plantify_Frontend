import React from 'react';
import {ScrollView, View, Text, Image} from 'react-native';
import SMButton from '../components/SMButton';

const LastScreen = ({navigation, route}) => {
  let {id} = route.params;
  return (
    <ScrollView
      style={{
        backgroundColor: '#fff',
        position: 'relative',
      }}
      contentContainerStyle={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        source={require('../images/circle1.png')}
        style={{position: 'absolute', top: -50, right: -50}}
      />
      <View style={{width: '90%', flex: 1, justifyContent: 'space-around'}}>
        {/* order detail */}
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 20,
          }}>
          <Text style={{fontSize: 45, color: '#0D986A', fontWeight: 'bold'}}>
            Order
          </Text>
          <Text style={{fontSize: 45, color: '#0D986A', fontWeight: 'bold'}}>
            Received
          </Text>

          {/* order id */}
          <Text style={{fontSize: 16, fontWeight: 'bold', color: '#002140'}}>
            Order ID : {id}
          </Text>
        </View>

        {/* bottom part */}
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 20,
          }}>
          <Image
            source={require('../images/greenL.png')}
            style={{width: 120, height: 120}}
            resizeMode="contain"
          />

          {/* button */}
          <SMButton
            value="KIRIM"
            width="100%"
            background="#0D986A"
            radius={40}
            size={18}
            onClick={() => navigation.navigate('Home')}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default LastScreen;
