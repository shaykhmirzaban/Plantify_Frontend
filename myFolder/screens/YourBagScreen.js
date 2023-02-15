import {useState, useEffect} from 'react';
import {
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSelector, useDispatch} from 'react-redux';
import {addProduct, deleteProduct, decrementItem} from '../Store/ProductSlice';

function YourBagScreen({navigation}) {
  // redux
  const dispatch = useDispatch();
  const data = useSelector(state => state.Product);

  const deleteItemFn = id => {
    dispatch(deleteProduct(id));
    ToastAndroid.show('Successfully Remove Item', ToastAndroid.SHORT);
  };

  const incrementFn = val => {
    dispatch(addProduct(val));
  };

  const decrement = val => {
    if (val.quantity > 1) {
      dispatch(decrementItem(val));
    } else {
      dispatch(deleteProduct(val._id));
    }
  };

  const getTotal = () => {
    let total = 0;

    if (data.data) {
      data.data.map(val => {
        total = total + Number(val.quantity) * Number(val.price);
      });
    }

    return total;
  };

  const navigate = name => {
    navigation.navigate(name, {totalAmount: getTotal()});
  };

  return (
    <>
      <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
        {/* header */}
        <View
          style={{
            backgroundColor: '#fff',
            padding: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
            <Image
              resizeMode="contain"
              style={{width: 170, height: 55}}
              source={require('../images/Logo1.png')}
            />
          </TouchableOpacity>

          <View style={{flexDirection: 'row'}}>
            <View style={{paddingRight: 15}}>
              <Icon name="search" size={27} color={'#002140'} />
            </View>

            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Icon name="menu" size={27} color={'#002140'} />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{width: '100%', paddingHorizontal: 20, paddingVertical: 10}}>
          {/* heading */}
          <View>
            <Text style={{fontSize: 35, color: '#0D986A', fontWeight: 'bold'}}>
              Your Bag
            </Text>
          </View>

          {/* product */}
          <View style={{marginVertical: 20}}>
            {data.data && data.data.length > 0 ? (
              data.data.map(val => {
                return (
                  <View
                    key={val._id}
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginVertical: 15,
                    }}>
                    {/* left side */}
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '80%',
                        flexWrap: 'wrap',
                      }}>
                      <View>
                        <Image
                          source={{uri: val.image}}
                          style={{
                            width: 80,
                            height: 80,
                          }}
                        />
                      </View>

                      {/* content */}
                      <View
                        style={{
                          justifyContent: 'space-between',
                          flexWrap: 'wrap',
                        }}>
                        <Text
                          style={{
                            width: 170,
                            fontSize: 16,
                            color: '#002140',
                            fontWeight: 'bold',
                          }}>
                          {val.name}
                        </Text>

                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            {/* plus */}
                            <TouchableOpacity
                              onPress={() => incrementFn(val)}
                              style={{
                                width: 35,
                                height: 35,
                                backgroundColor: '#eee',
                                borderRadius: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <Icon name="add" size={25} color="#002140" />
                            </TouchableOpacity>

                            {/* quantity */}
                            <Text
                              style={{
                                paddingHorizontal: 10,
                                fontSize: 16,
                                fontWeight: 'bold',
                                color: '#0D986A',
                              }}>
                              {val.quantity}
                            </Text>

                            {/* minus */}
                            <TouchableOpacity
                              onPress={() => decrement(val)}
                              style={{
                                width: 35,
                                height: 35,
                                backgroundColor: '#eee',
                                borderRadius: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <Icon name="remove" size={25} color="#002140" />
                            </TouchableOpacity>
                          </View>

                          <TouchableOpacity
                            onPress={() => deleteItemFn(val._id)}>
                            <Icon name="delete" size={35} color="#0D986A" />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>

                    {/* right side */}
                    <View
                      style={{
                        width: '20%',
                        alignItems: 'flex-end',
                      }}>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: 'bold',
                          color: '#002140',
                        }}>
                        ${val.price}
                      </Text>
                    </View>
                  </View>
                );
              })
            ) : (
              <View style={{paddingVertical: 15}}>
                <Text style={{fontSize: 16, color: '#333'}}>Empty Card</Text>
              </View>
            )}
          </View>

          {/* Dilevery */}
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            {/* left side */}
            <View
              style={{flexDirection: 'row', width: '90%', flexWrap: 'wrap'}}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: '#E3FDF4',
                  borderRadius: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon name="local-shipping" color="#0D986A" size={25} />
              </View>
              {/* Content */}
              <View style={{paddingHorizontal: 10}}>
                <Text
                  style={{fontSize: 20, color: '#002140', fontWeight: 'bold'}}>
                  Delivery
                </Text>
                <Text style={{width: 200, fontSize: 16, color: '#002140'}}>
                  Order above $1200 to get free delivery.
                </Text>
              </View>
            </View>

            {/* right side */}
            <View>
              <Text
                style={{fontSize: 20, fontWeight: 'bold', color: '#002140'}}>
                $80
              </Text>
            </View>
          </View>

          {/* total */}
          <View
            style={{
              marginVertical: 20,
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              borderTopColor: '#00214045',
              borderTopWidth: 2,
              borderTopStyle: 'solid',
              paddingTop: 10,
            }}>
            <Text style={{fontSize: 27, color: '#002140', fontWeight: 'bold'}}>
              Total
            </Text>
            <Text style={{fontSize: 27, color: '#002140', fontWeight: 'bold'}}>
              $
              {getTotal() === 0
                ? '00'
                : getTotal() > 1200
                ? getTotal()
                : getTotal() + 80}
            </Text>
          </View>
        </View>
      </ScrollView>
      {/* fixed bottom bar */}
      {data.data && data.data.length > 0 && (
        <View
          style={{
            backgroundColor: '#0B845C',
            width: '100%',
            height: 60,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            paddingHorizontal: 20,
            paddingVertical: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 8,
            },
            shadowOpacity: 0.44,
            shadowRadius: 10.32,

            elevation: 16,
          }}>
          <TouchableOpacity
            onPress={() => navigate('InformationPage')}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontSize: 20, color: '#fff', fontWeight: 'bold'}}>
              Checkout
            </Text>
          </TouchableOpacity>

          <View>
            <Text style={{fontSize: 20, color: '#fff', fontWeight: 'bold'}}>
              $
              {getTotal() === 0
                ? '00'
                : getTotal() > 1200
                ? getTotal()
                : getTotal() + 80}
            </Text>
          </View>
        </View>
      )}
    </>
  );
}

export default YourBagScreen;
