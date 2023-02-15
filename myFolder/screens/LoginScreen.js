import {useState, useEffect} from 'react';
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
import {useDispatch, useSelector} from 'react-redux';

// component
import SMButton from '../components/SMButton';
import {addUser} from '../Store/userSlice';

function LoginScreen({navigation}) {
  let [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  // redux
  const dispatch = useDispatch();
  const data = useSelector(state => state.User);

  useEffect(() => {
    if (data.email === 'admin@admin.com' && data.password === 'admin1234') {
      navigate('AdminTabNavigation');
    } else if (data.email) {
      navigate('HomeScreen');
    }
  }, []);

  const navigate = e => {
    navigation.navigate(e);
  };

  const goBack = () => {
    navigation.goBack();
  };

  const postData = async () => {
    try {
      await axios({
        url: `${DBURL}/login`,
        method: 'post',
        data: loginData,
      }).then(res => {
        if (res.data.status) {
          dispatch(addUser(loginData));
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

  const userLogin = () => {
    // Object Destructuring
    let {password, email} = loginData;
    // check
    if (email && password) {
      // email condition
      if (email.slice(email.length - 4) === '.com' && email.indexOf('@') > -1) {
        if (email === 'admin@admin.com' && password === 'admin1234') {
          navigate('AdminTabNavigation');
        } else {
          postData();
        }
      } else {
        ToastAndroid.show('Email is not correct', ToastAndroid.LONG);
      }
    } else {
      ToastAndroid.show('Crediantial error', ToastAndroid.LONG);
    }
  };

  return (
    <ScrollView
      // contentContainerStyle={{flex: 1}}
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
                Login
              </Text>
              <Text
                style={{fontSize: 17, color: '#0D986A', paddingVertical: 5}}>
                Masukan NISN dan password untuk memulai belajar sekarang
              </Text>
            </View>
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
                onChangeText={e => setLoginData({...loginData, email: e})}
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
                onChangeText={e => setLoginData({...loginData, password: e})}
              />
            </View>
          </View>

          {/* forget password */}
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}>
            <Text
              onPress={() => navigate('ForgetPasswordScreen')}
              style={{
                textDecorationLine: 'underline',
                textDecorationColor: '#004A61',
                textDecorationStyle: 'solid',
                fontSize: 13,
                color: '#004A61',
                paddingVertical: 5,
              }}>
              Lupa password
            </Text>
          </View>
        </View>
      </View>

      <View style={{marginBottom: 30}}>
        <SMButton
          value="MULAI BELAJAR"
          width="100%"
          background="#0D986A"
          radius={40}
          size={18}
          onClick={userLogin}
        />

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            // paddingVertical: 10,
            // marginVertical: 20,
          }}>
          <Text style={{fontSize: 15, color: '#004A6166', paddingVertical: 15}}>
            New User?{' '}
            <Text
              onPress={() => navigate('SignUpScreen')}
              style={{color: '#004A61CC', fontWeight: 'bold'}}>
              Sign Up
            </Text>{' '}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

export default LoginScreen;
