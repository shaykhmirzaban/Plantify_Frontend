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
import {deleteFProduct} from '../Store/FavouriteSlice';
import {addProduct} from '../Store/ProductSlice';

function YourFavouriteScreen({navigation}) {
  // redux
  const dispatch = useDispatch();
  const data = useSelector(state => state.Favourite);

  const deleteItemFn = id => {
    dispatch(deleteFProduct(id));
    ToastAndroid.show('Successfully Remove Item', ToastAndroid.SHORT);
  };

  const addProductFn = val => {
    if (val) {
      dispatch(addProduct(val));
      ToastAndroid.show('Successfully add in your card', ToastAndroid.SHORT);
    } else {
      ToastAndroid.show('Value is not recive', ToastAndroid.SHORT);
    }
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
          <Image
            resizeMode="contain"
            style={{width: 170, height: 55}}
            source={require('../images/Logo1.png')}
          />

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
              Your Favourite
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
                            <TouchableOpacity onPress={() => addProductFn(val)}>
                              <Image source={require('../images/bag.png')} />
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
        </View>
      </ScrollView>
    </>
  );
}

export default YourFavouriteScreen;
