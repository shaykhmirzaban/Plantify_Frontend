import axios from 'axios';
import {useEffect, useState} from 'react';

import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  ToastAndroid,
  ImageBackground,
  StyleSheet,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import DBURL from '../../config';
import {useDispatch, useSelector} from 'react-redux';
import {addProduct} from '../Store/ProductSlice';
import {addFProduct} from '../Store/FavouriteSlice';

function ProductDetailScreen({navigation, route}) {
  let [data, setData] = useState();
  let [item, setItem] = useState(route.params);

  // redux
  let dispatch = useDispatch();
  let productDataLength = useSelector(state => state.Product);

  // get data
  const getData = async () => {
    await axios({
      url: `${DBURL}/plant`,
      method: 'get',
    })
      .then(res => {
        if (res.data.status) {
          setData(res.data.data);
        } else {
          ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
        }
      })
      .catch(err => {
        ToastAndroid.show(err, ToastAndroid.SHORT);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const navigate = (e, d) => {
    navigation.push(e, d);
  };

  const addProductFn = () => {
    dispatch(addProduct(item));
    ToastAndroid.show(
      `${item.name} is successfully add in a card`,
      ToastAndroid.SHORT,
    );

    // if (productDataLength.data && productDataLength.data.length > 0) {
    //   await productDataLength.data.forEach(val => {
    //     if (val._id === item._id) {
    //       setFlag(true);
    //     }
    //   });
    // } else {
    //   dispatch(addProduct(item));
    //   ToastAndroid.show(
    //     `${item.name} is successfully add in a card`,
    //     ToastAndroid.SHORT,
    //   );
    //   setFlag(true);
    // }

    // if (flag) {
    //   ToastAndroid.show('Item already in card', ToastAndroid.SHORT);
    // } else {
    //   dispatch(addProduct(item));
    //   ToastAndroid.show(
    //     `${item.name} is successfully add in a card`,
    //     ToastAndroid.SHORT,
    //   );
    //   setFlag(true);
    // }
  };

  const favouriteProductFn = () => {
    dispatch(addFProduct(item));
    ToastAndroid.show(`${item.name} add in favourite`, ToastAndroid.SHORT);
  };

  const getTotal = () => {
    let total = 0;

    if (productDataLength.data) {
      productDataLength.data.map(val => {
        total = total + Number(val.quantity) * Number(val.price);
      });
    }

    return total;
  };

  return (
    <>
      <ScrollView
        style={{backgroundColor: '#fff', flex: 1}}
        nestedScrollEnabled={true}>
        {/* header */}
        <View style={[Styles.header, {backgroundColor: item.color_code}]}>
          <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
            <Image
              resizeMode="contain"
              style={{width: 170, height: 55}}
              source={require('../images/Logo1.png')}
            />
          </TouchableOpacity>

          <View style={{flexDirection: 'row'}}>
            <View style={{paddingRight: 15}}>
              <Icon name="search" size={27} color="#002140" />
            </View>
            <TouchableOpacity>
              <Icon name="menu" size={27} color="#002140" />
            </TouchableOpacity>
          </View>
        </View>

        {/* product screen */}
        <View style={[Styles.productStyle, {backgroundColor: item.color_code}]}>
          {/* top bar */}
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#002140',
                  paddingRight: 10,
                }}>
                {item.title}
              </Text>
              <Image
                source={require('../images/hand.png')}
                style={{width: 25, height: 25}}
                resizeMode={'contain'}
              />
            </View>

            <View style={Styles.ratingStyle}>
              <Icon name="star" color="#0D986A" size={20} />
              <Text
                style={{
                  fontSize: 16,
                  color: '#0D986A',
                  fontWeight: 'bold',
                  paddingLeft: 5,
                }}>
                4.8
              </Text>
            </View>
          </View>

          <View style={{width: '100%'}}>
            <Text
              style={{
                fontSize: 40,
                color: '#002140',
                fontWeight: 'bold',
              }}>
              {item.name}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginVertical: 10,
            }}>
            <View>
              <View style={{paddingVertical: 15}}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#002140c2',
                    fontWeight: 'bold',
                  }}>
                  Price
                </Text>
                <Text
                  style={{fontSize: 18, color: '#002140', fontWeight: 'bold'}}>
                  ${item.price}
                </Text>
              </View>

              <View style={{paddingBottom: 15}}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#002140c2',
                    fontWeight: 'bold',
                  }}>
                  Size
                </Text>
                <Text
                  style={{fontSize: 18, color: '#002140', fontWeight: 'bold'}}>
                  {item.size}” h
                </Text>
              </View>
            </View>

            <View
              style={{
                alignItems: 'center',
                marginVertical: 10,
              }}>
              <TouchableOpacity onPress={addProductFn}>
                <Image
                  source={require('../images/bag.png')}
                  style={Styles.bagStyle}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={Styles.favouriteStyle}
                onPress={favouriteProductFn}>
                <Icon name="favorite" color="#002140" size={35} />
                {/* <Image
                  source={require('../images/hart.png')}
                  style={{width: 30, height: 30}}
                  resizeMode="contain"
                /> */}
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <Image
              source={{uri: item.image}}
              style={{
                width: 270,
                height: 270,
                position: 'absolute',
                bottom: -100,
                left: 20,
              }}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* OVERVIEW */}
        <View style={{width: '100%', padding: 20, marginTop: 20}}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: '#002140'}}>
            Overview
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: 10,
            }}>
            {/* water */}
            <View style={{flexDirection: 'row'}}>
              <Icon name="opacity" color="#FCCC1F" size={30} />
              <View style={{paddingLeft: 5}}>
                <Text
                  style={{color: '#0D986A', fontSize: 18, fontWeight: 'bold'}}>
                  250ml
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#002140c2',
                    fontWeight: 'bold',
                  }}>
                  Water
                </Text>
              </View>
            </View>

            {/* light */}
            <View style={{flexDirection: 'row'}}>
              <Icon name="wb-sunny" color="#FCCC1F" size={30} />
              <View style={{paddingLeft: 5}}>
                <Text
                  style={{color: '#0D986A', fontSize: 18, fontWeight: 'bold'}}>
                  35-40%
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#002140c2',
                    fontWeight: 'bold',
                  }}>
                  Light
                </Text>
              </View>
            </View>

            {/* Fertilizer */}
            <View style={{flexDirection: 'row'}}>
              <Icon name="grain" color="#FCCC1F" size={25} />
              <View style={{paddingLeft: 5}}>
                <Text
                  style={{color: '#0D986A', fontSize: 18, fontWeight: 'bold'}}>
                  250gm
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#002140c2',
                    fontWeight: 'bold',
                  }}>
                  Fertilizer
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Plant Bio */}
        <View style={{width: '100%', paddingHorizontal: 20}}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: '#002140'}}>
            Plant Bio
          </Text>

          <Text style={{fontSize: 16, color: '#002140c2', paddingVertical: 10}}>
            No green thumb required to keep our artificial watermelon peperomia
            plant looking lively and lush anywhere you place it.
          </Text>
        </View>

        {/* some more images */}
        <View
          style={{
            width: '100%',
            paddingHorizontal: 20,
            paddingVertical: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Image
            source={require('../images/plantPart3.png')}
            style={{borderRadius: 10}}
          />
          <Image
            source={require('../images/plantPart1.png')}
            style={{borderRadius: 10}}
          />
          <Image
            source={require('../images/plantPart2.png')}
            style={{borderRadius: 10}}
          />
        </View>

        {/* similar plants */}
        <View
          style={{width: '100%', paddingHorizontal: 20, marginVertical: 20}}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#002140',
              paddingVertical: 10,
            }}>
            Similar Plants
          </Text>

          {/* PLANTS */}
          <View style={{marginVertical: 10}}>
            <ScrollView
              horizontal={true}
              nestedScrollEnabled={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              {data &&
                data.length > 0 &&
                data.map(val => {
                  return (
                    <TouchableOpacity
                      key={val._id}
                      onPress={() => navigate('ProductDetailScreen', val)}
                      style={{marginHorizontal: 15}}>
                      <ImageBackground
                        style={{
                          width: 250,
                          backgroundColor: val.color_code
                            ? val.color_code
                            : '#9CE5CB',
                          borderRadius: 25,
                          padding: 15,
                          position: 'relative',
                        }}
                        source={require('../images/circle.png')}>
                        <View
                          style={{
                            width: '70%',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              fontSize: 18,
                              fontWeight: 'bold',
                              color: '#002140',
                            }}>
                            {val.title}
                          </Text>
                          <Image
                            source={require('../images/hand.png')}
                            style={{width: 25, height: 25}}
                            resizeMode={'contain'}
                          />
                        </View>

                        <Text
                          style={{
                            fontSize: 25,
                            fontWeight: 'bold',
                            color: '#002140',
                          }}>
                          {val.name}
                        </Text>

                        <View
                          style={{
                            flexDirection: 'row',
                            marginVertical: 10,
                            width: '70%',
                            justifyContent: 'space-between',
                          }}>
                          <Text
                            style={{
                              fontSize: 23,
                              color: '#002140',
                              fontWeight: 'bold',
                            }}>
                            ${val.price}
                          </Text>
                          <Icon name="favorite" color="#002140" size={35} />
                        </View>

                        <Image
                          source={{uri: val.image}}
                          style={{
                            width: 150,
                            height: 150,
                            position: 'absolute',
                            top: -10,
                            right: -50,
                          }}
                          resizeMode="contain"
                        />
                      </ImageBackground>
                    </TouchableOpacity>
                  );
                })}
            </ScrollView>
          </View>
        </View>

        {/* banner */}
        <View
          style={{
            width: '100%',
            paddingHorizontal: 20,
            paddingVertical: 15,
            backgroundColor: '#F5EDA8',
            flexDirection: 'row',
            marginBottom: 30,
          }}>
          <View style={{width: '60%'}}>
            <Text style={{fontSize: 20, color: '#002140', fontWeight: 'bold'}}>
              That very plant?
            </Text>
            <Text
              style={{fontSize: 16, color: '#002140c2', paddingVertical: 10}}>
              Just Scan and the AI will know exactly
            </Text>

            <TouchableOpacity
              style={{
                width: 120,
                height: 45,
                borderColor: '#0D986A',
                borderWidth: 2,
                borderStyle: 'solid',
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: '#0D986A', fontWeight: 'bold'}}>
                Scane Now
              </Text>
            </TouchableOpacity>
          </View>

          <Image
            source={require('../images/scaneImage.png')}
            style={{width: 120, height: 120}}
          />
        </View>
      </ScrollView>

      {/* fixed bottom bar */}
      <View style={Styles.bottomStyle}>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={() => navigation.navigate('YourBagScreen')}>
          <Icon name="shopping-cart" size={25} color="#f4f4f4e0" />

          <Text style={{color: '#f4f4f4e0', fontSize: 16, paddingLeft: 10}}>
            View {productDataLength.data ? productDataLength.data.length : 0}{' '}
            items
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
    </>
  );
}

const Styles = StyleSheet.create({
  header: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  productStyle: {
    width: '100%',
    height: 370,
    paddingHorizontal: 20,
    paddingVertical: 10,
    position: 'relative',
    borderBottomRightRadius: 150,
    borderBottomLeftRadius: 150,
  },
  ratingStyle: {
    flexDirection: 'row',
    width: 80,
    height: 35,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0D986A',
  },
  bagStyle: {
    marginVertical: 15,
  },
  favouriteStyle: {
    backgroundColor: '#fff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    marginBottom: 15,
  },
  bottomStyle: {
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
  },
});

export default ProductDetailScreen;
