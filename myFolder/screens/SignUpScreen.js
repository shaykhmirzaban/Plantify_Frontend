import {useState} from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import DBURL from '../../config';

// component
import SMButton from '../components/SMButton';

function SignUpScreen({navigation}) {
  let [signUpData, setSignUpData] = useState({
    email: '',
    password: '',
  });

  const navigate = e => {
    navigation.navigate(e);
  };

  const goBack = () => {
    navigation.goBack();
  };

  const postData = async () => {
    try {
      await axios.post(`${DBURL}/signUp`, signUpData).then(res => {
        if (res.data.status) {
          ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
          navigate('HomeScreen');
        } else {
          ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
        }
      });
    } catch (err) {
      ToastAndroid.show(err, ToastAndroid.SHORT);
    }
  };

  const userSignUp = () => {
    // Object Destructuring
    let {email, password} = signUpData;

    // check
    if (email && password) {
      // email condition
      if (email.slice(email.length - 4) === '.com' && email.indexOf('@') > -1) {
        postData();
      } else {
        ToastAndroid.show('Email is not correct', ToastAndroid.LONG);
      }
    } else {
      ToastAndroid.show('Crediantial error', ToastAndroid.LONG);
    }
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
      }}
      contentContainerStyle={{
        justifyContent: 'space-between',
      }}>
      <View>
        {/* back bottom*/}
        <TouchableOpacity onPress={goBack}>
          <Image
            resizeMode="contain"
            size={{width: 60, height: 50}}
            source={require('../images/back.png')}
          />
        </TouchableOpacity>
        {/* top text */}
        <View style={{marginVertical: 10, paddingHorizontal: 10}}>
          {/* logo */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <Image
              resizeMode="contain"
              style={{width: 40, height: 40}}
              source={require('../images/greenLogo.png')}
            />
            <Text
              style={{
                fontSize: 21,
                letterSpacing: 4,
                color: '#002140',
                fontWeight: '700',
                paddingHorizontal: 20,
              }}>
              PLANTIFY
            </Text>
          </View>

          {/* heading and description */}
          <View style={{marginVertical: 10}}>
            <Text
              style={{
                color: '#0D986A',
                fontSize: 28,
                fontWeight: 'bold',
                letterSpacing: 2,
              }}>
              Signup
            </Text>
            <Text style={{fontSize: 17, color: '#0D986A', paddingVertical: 5}}>
              Masukan No. Handphone Anda dan tunggu kode autentik dikirimkan
            </Text>
          </View>
        </View>

        {/* middle part */}
        <View style={{paddingHorizontal: 10}}>
          {/* email */}
          <View>
            <Text
              style={{color: '#004A6166', fontSize: 17, paddingVertical: 5}}>
              Username/ Email
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                backgroundColor: '#FCFCFC', //
                borderRadius: 10,
                height: 55,
                borderWidth: 1,
                borderColor: '#E6E8EB',
                borderStyle: 'solid',
              }}>
              {/* icon */}
              <Icon name="mail" size={25} color="#004A61CC" />
              <TextInput
                placeholder="Masukkan Email"
                style={{
                  width: '85%',
                  fontSize: 16,
                  paddingLeft: 10,
                  fontWeight: '600',
                }}
                placeholderTextColor="#004a61bd"
                keyboardType="email-address"
                onChangeText={e => setSignUpData({...signUpData, email: e})}
              />
            </View>
          </View>

          {/* Password */}
          <View style={{marginTop: 10}}>
            <Text
              style={{color: '#004A6166', fontSize: 17, paddingVertical: 5}}>
              Password
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                backgroundColor: '#FCFCFC',
                borderRadius: 10,
                height: 55,
                borderWidth: 1,
                borderColor: '#E6E8EB',
                borderStyle: 'solid',
              }}>
              {/* icon */}
              <Icon name="lock" size={25} color="#004A61CC" />
              <TextInput
                placeholder="Masukkan Password"
                style={{
                  width: '85%',
                  fontSize: 16,
                  paddingLeft: 10,
                  fontWeight: '600',
                }}
                placeholderTextColor="#004a61bd"
                keyboardType="default"
                secureTextEntry={true}
                onChangeText={e => setSignUpData({...signUpData, password: e})}
              />
            </View>
          </View>

          {/* already have an account */}
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'flex-start',
              width: '100%',
              paddingVertical: 10,
            }}>
            <Text style={{fontSize: 15, color: '#004A6166'}}>
              Already have an account?{' '}
              <Text
                onPress={() => navigate('LoginScreen')}
                style={{color: '#004A61CC', fontWeight: 'bold'}}>
                Login
              </Text>{' '}
            </Text>
          </View>
        </View>
      </View>

      <View style={{marginBottom: 30}}>
        <SMButton
          value="KIRIM"
          width="100%"
          background="#0D986A"
          radius={40}
          size={18}
          onClick={userSignUp}
        />
      </View>
    </ScrollView>
  );
}

export default SignUpScreen;
