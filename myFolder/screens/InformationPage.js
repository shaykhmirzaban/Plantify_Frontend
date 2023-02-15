import React from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {useSelector} from 'react-redux';
import SMButton from '../components/SMButton';
import DBURL from '../../config';
import axios from 'axios';

const InformationPage = ({navigation, route}) => {
  let [userValue, setUserValue] = React.useState({
    phoneNo: 0,
    Address: '',
  });
  let {totalAmount} = route.params;
  let {data} = useSelector(state => state.Product);

  const lastScreenFn = () => {
    if (userValue.phoneNo && userValue.Address) {
      let val = {data, userValue};
      axios({
        url: `${DBURL}/checkout`,
        method: 'post',
        data: val,
      })
        .then(res => {
          navigation.navigate('LastScreen', {id: res.data.data._id});
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      ToastAndroid.show('Please filled all field', ToastAndroid.SHORT);
    }
  };

  return (
    <ScrollView
      style={{
        width: '100%',
        backgroundColor: '#fff',
        padding: 20,
        // marginVertical: 10,
      }}>
      {/* Information */}
      <View>
        <Text style={{fontSize: 30, color: '#0D986A', fontWeight: 'bold'}}>
          Information
        </Text>
        <Text style={{fontSize: 16, color: '#0D986A', paddingVertical: 10}}>
          Your information is secure don't worry and fill in all fields it's our
          responsibility to secure your information.
        </Text>
      </View>
      {/* form */}
      <View style={{marginVertical: 10}}>
        {/* phone no */}
        <View style={{width: '100%', paddingVertical: 10}}>
          <Text
            style={{
              color: '#004A61CC',
              fontSize: 16,
              paddingVertical: 10,
              fontWeight: 'bold',
            }}>
            Phone no.
          </Text>
          <TextInput
            placeholder="123-22321223"
            keyboardType="phone-pad"
            maxLength={11}
            style={{
              width: '100%',
              height: 60,
              backgroundColor: '#E6E8EB',
              borderRadius: 10,
              paddingHorizontal: 15,
              borderColor: '#FCFCFC',
              borderWidth: 2,
              borderStyle: 'solid',
            }}
            placeholderTextColor="#004A61CC"
            onChangeText={e => setUserValue({...userValue, phoneNo: e})}
          />
        </View>
        {/* address */}
        <View style={{width: '100%', paddingVertical: 10}}>
          <Text
            style={{
              color: '#004A61CC',
              fontSize: 16,
              fontWeight: 'bold',
              paddingVertical: 10,
            }}>
            Address
          </Text>
          <TextInput
            placeholder="A.B.C Road Karachi"
            keyboardType="default"
            numberOfLines={5}
            style={{
              width: '100%',
              backgroundColor: '#E6E8EB',
              borderRadius: 10,
              paddingHorizontal: 15,
              borderColor: '#FCFCFC',
              borderWidth: 2,
              borderStyle: 'solid',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}
            placeholderTextColor="#004A61CC"
            onChangeText={e => setUserValue({...userValue, Address: e})}
          />
        </View>
      </View>
      {/* payment sumary */}
      <View
        style={{
          backgroundColor: '#9CE5CB',
          padding: 15,
          borderRadius: 15,
        }}>
        <Text style={{fontSize: 22, color: '#002140'}}>Payment summary</Text>

        <View style={{paddingVertical: 15}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 5,
            }}>
            <Text style={{fontSize: 16, color: '#002140'}}>Subtotal</Text>
            <Text style={{fontSize: 16, color: '#002140'}}>${totalAmount}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 5,
            }}>
            <Text style={{fontSize: 16, color: '#002140'}}>Delivery Fee</Text>
            <Text style={{fontSize: 16, color: '#002140'}}>$80</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 5,
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 18, color: '#002140'}}>
              Total Amount
            </Text>
            <Text style={{fontWeight: 'bold', fontSize: 18, color: '#002140'}}>
              ${totalAmount > 1200 ? totalAmount - 80 : totalAmount + 80}
            </Text>
          </View>
        </View>
      </View>
      {/* checkout button */}
      <SMButton
        value="Checkout"
        width="100%"
        background="#0D986A"
        radius={40}
        size={18}
        // marginTop={0}
        Style={{marginBottom: 50}}
        onClick={lastScreenFn}
      />
    </ScrollView>
  );
};

export default InformationPage;
