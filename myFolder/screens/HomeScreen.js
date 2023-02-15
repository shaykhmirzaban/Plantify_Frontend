import axios from 'axios';
import {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  TextInput,
  ToastAndroid,
  RefreshControl,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DBURL from '../../config';
// import Video from 'react-native-video';

function HomeScreen({navigation}) {
  let [data, setData] = useState([]);
  let [empty, setEmpty] = useState('');
  let [flag, setFlag] = useState(false);
  let [topic, setTopic] = useState([
    {name: 'Top Pick', flag: true},
    {name: 'Indoor', flag: false},
    {name: 'Outdoor', flag: false},
    {name: 'Seeds', flag: false},
    {name: 'Planters', flag: false},
  ]);
  let [item, setItem] = useState([]);
  let [resfresh, setRefresh] = useState(false);

  // navigate
  const navigate = (e, d) => {
    navigation.navigate(e, d);
  };

  // data fetch
  const getData = async () => {
    setFlag(true);
    try {
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
          setEmpty(err.data.message);
        });
      setFlag(false);
    } catch (err) {
      ToastAndroid.show(err, ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const sortItem = async e => {
    setRefresh(true);

    setTopic(val => {
      return val.map(v => {
        if (v.name === e.name) {
          return {...v, flag: true};
        } else {
          return {...v, flag: false};
        }
      });
    });

    let sortingData = data
      .map(val => {
        if (val.category === e.name) {
          return val;
        }
      })
      .filter(Boolean);

    setItem(sortingData);
    setTimeout(() => setRefresh(false), 1000);
  };

  const searchFn = text => {
    if (text) {
      let filterValue = data.filter(item => {
        let particularData = item.name && item.name.toUpperCase();
        let userValue = text.toUpperCase();
        return particularData.indexOf(userValue) > -1;
      });
      setItem(filterValue);
    } else {
      setItem([]);
    }
  };

  return (
    <ScrollView
      nestedScrollEnabled={true}
      style={{
        flex: 1,
      }}
      contentContainerStyle={{
        backgroundColor: '#fff',
      }}
      refreshControl={<RefreshControl refreshing={flag} onRefresh={getData} />}>
      {/* header */}
      <View
        style={{
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
            <Icon name="notifications" size={27} color="#002140" />
          </View>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Icon name="menu" size={27} color="#002140" />
          </TouchableOpacity>
        </View>
      </View>

      {/* banner */}
      <View style={{paddingHorizontal: 15, width: '100%'}}>
        <View style={{borderRadius: 40}}>
          <ImageBackground
            style={{
              width: '100%',
              height: 180,
            }}
            imageStyle={{borderRadius: 10}}
            resizeMode="contain"
            source={require('../images/banner.png')}>
            {/* text */}
            <View
              style={{
                width: '60%',
                height: '100%',
                paddingHorizontal: 15,
                paddingVertical: 10,
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 20, color: '#002140', fontWeight: 700}}>
                There’s a Plant for everyone
              </Text>

              <View
                style={{
                  paddingVertical: 15,
                }}>
                <Text style={{fontSize: 16, color: '#002140', fontWeight: 600}}>
                  Get your 1st plant
                </Text>
                <Text style={{fontSize: 16, color: '#002140', fontWeight: 600}}>
                  @ 40% off
                </Text>
                <View
                  style={{
                    width: 70,
                    borderBottomWidth: 5,
                    borderBottomColor: '#0D986A',
                    borderStyle: 'solid',
                    paddingVertical: 5,
                  }}></View>
              </View>
            </View>
          </ImageBackground>
        </View>
      </View>

      {/* search area */}
      <View
        style={{
          paddingHorizontal: 15,
          width: '100%',
          paddingVertical: 15,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            width: '82%',
            height: 55,
            borderColor: '#002140',
            borderWidth: 1,
            borderStyle: 'solid',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: 15,
            paddingHorizontal: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon name="search" size={30} color="#002140" />
            <TextInput
              placeholder="Search"
              placeholderTextColor={'#002140'}
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                width: 180,
                paddingLeft: 10,
              }}
              onChangeText={e => searchFn(e)}
            />
          </View>
          <Image
            source={require('../images/scane.png')}
            style={{width: 25, height: 25}}
            resizeMode="contain"
          />
        </View>

        <View style={{width: '15%'}}>
          <Image
            source={require('../images/setting.png')}
            style={{width: '100%', height: 55}}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* topic */}
      <ScrollView
        horizontal={true}
        nestedScrollEnabled={true}
        style={{
          paddingHorizontal: 15,
          marginHorizontal: 20,
          flex: 1,
        }}
        contentContainerStyle={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        showsHorizontalScrollIndicator={false}>
        {/* <Text
          onPress={() => setItem([])}
          style={{
            color: '#0D986A',
            fontWeight: 'bold',
            fontSize: 17,
            paddingRight: 15,
          }}>
          Top Pick
        </Text> */}
        {topic &&
          topic.map((val, index) => {
            return (
              <Text
                onPress={() => {
                  sortItem(val);
                }}
                key={index}
                style={{
                  fontSize: 17,
                  color: val.flag ? '#0D986A' : '#002140',
                  paddingHorizontal: 15,
                  fontWeight: val.flag ? 'bold' : '600',
                }}>
                {val.name}
              </Text>
            );
          })}
      </ScrollView>

      {/* all cards */}
      <View
        style={{
          width: '100%',
          padding: 15,
        }}>
        {empty ? (
          <View>
            <Text>Empty</Text>
          </View>
        ) : item && item.length > 0 ? (
          resfresh ? (
            <ActivityIndicator
              color={'#000'}
              size="large"
              animating={resfresh}
            />
          ) : (
            item.map(val => {
              return (
                <TouchableOpacity
                  key={val._id}
                  onPress={() => navigate('ProductDetailScreen', val)}>
                  <ImageBackground
                    style={{
                      width: '100%',
                      height: 200,
                      backgroundColor: val.color_code,
                      borderRadius: 25,
                      marginVertical: 25,
                      flexDirection: 'row',
                      alignItems: 'flex-end',
                      padding: 20,
                    }}
                    source={require('../images/circle.png')}>
                    <View
                      style={{
                        width: '60%',
                        height: '100%',
                      }}>
                      <View style={{width: '100%'}}>
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
                            fontSize: 35,
                            color: '#002140',
                            fontWeight: 'bold',
                          }}>
                          {val.name.length > 9
                            ? `${val.name.slice(0, 7)}...`
                            : val.name}
                        </Text>
                      </View>

                      <View
                        style={{
                          width: '100%',
                          flexDirection: 'row',
                          paddingVertical: 20,
                          justifyContent: 'space-between',
                        }}>
                        <Text
                          style={{
                            color: '#002140',
                            fontSize: 22,
                            fontWeight: 'bold',
                          }}>
                          ${val.price}
                        </Text>

                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Image
                            source={require('../images/hart.png')}
                            style={{width: 30, height: 30}}
                            resizeMode="contain"
                          />
                          {/* <Icon name="favorite" color="#002140" size={35} /> */}
                          <Image
                            source={require('../images/bag.png')}
                            style={{width: 50, height: 50, marginHorizontal: 5}}
                            resizeMode={'contain'}
                          />
                        </View>
                      </View>
                    </View>

                    <View style={{width: '40%', height: '100%'}}>
                      <Image
                        source={{uri: val.image}}
                        style={{
                          width: 200,
                          height: 200,
                          position: 'relative',
                          right: 15,
                          bottom: 10,
                        }}
                        resizeMode="contain"
                      />
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              );
            })
          )
        ) : (
          data &&
          data.length > 0 &&
          data.map(val => {
            return (
              <TouchableOpacity
                key={val._id}
                onPress={() => navigate('ProductDetailScreen', val)}>
                <ImageBackground
                  style={{
                    width: '100%',
                    height: 200,
                    backgroundColor: val.color_code,
                    borderRadius: 25,
                    marginVertical: 25,
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    padding: 20,
                  }}
                  source={require('../images/circle.png')}>
                  <View
                    style={{
                      width: '60%',
                      height: '100%',
                    }}>
                    <View style={{width: '100%'}}>
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
                          fontSize: 35,
                          color: '#002140',
                          fontWeight: 'bold',
                        }}>
                        {val.name.length > 9
                          ? `${val.name.slice(0, 7)}...`
                          : val.name}
                      </Text>
                    </View>

                    <View
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                        paddingVertical: 20,
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          color: '#002140',
                          fontSize: 22,
                          fontWeight: 'bold',
                        }}>
                        ${val.price}
                      </Text>

                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Image
                          source={require('../images/hart.png')}
                          style={{width: 30, height: 30}}
                          resizeMode="contain"
                        />
                        {/* <Icon name="favorite" color="#002140" size={35} /> */}
                        <Image
                          source={require('../images/bag.png')}
                          style={{width: 50, height: 50, marginHorizontal: 5}}
                          resizeMode={'contain'}
                        />
                      </View>
                    </View>
                  </View>

                  <View style={{width: '40%', height: '100%'}}>
                    <Image
                      source={{uri: val.image}}
                      style={{
                        width: 200,
                        height: 200,
                        position: 'relative',
                        right: 15,
                        bottom: 10,
                      }}
                      resizeMode="contain"
                    />
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            );
          })
        )}
      </View>

      {/* video */}
      {/* <View
        style={{
          paddingHorizontal: 20,
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
        <View style={styles.container}>
          <Video
            source={require('../video/video.mp4')}
            ref={ref => {
              this.player = ref;
            }}
            onBuffer={this.onBuffer}
            onEnd={this.onEnd}
            onError={this.videoError}
            style={styles.backgroundVideo}
            resizeMode="contain"
            paused={false}
          />
        </View>
        <View style={{paddingVertical: 5}}>
          <Text style={{fontSize: 16, color: '#333333'}}>
            Caring for plants should be fun. That’s why we offer 1-on-1 virtual
            consultations from the comfort of your home or office.{' '}
          </Text>
          <Text style={{fontSize: 16, fontWeight: 'bold', color: '#0D986A'}}>
            Learn More
          </Text>
        </View>
      </View> */}

      {/* bottom part */}
      <View style={{paddingHorizontal: 15, marginTop: 20}}>
        <View
          style={{
            width: 100,
            height: 5,
            backgroundColor: '#002140',
            borderRadius: 10,
          }}></View>

        <View style={{paddingVertical: 10}}>
          <Text
            style={{
              color: '#002140',
              fontSize: 30,
              fontWeight: 'bold',
            }}>
            Plant a Life
          </Text>

          <Text
            style={{
              color: '#002140c7',
              fontSize: 25,
              fontWeight: 'bold',
              paddingVertical: 5,
            }}>
            Live amongst Living
          </Text>

          <Text
            style={{
              color: '#0021407a',
              fontSize: 20,
              fontWeight: 'bold',
              paddingVertical: 5,
            }}>
            Spread the joy
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundVideo: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
});

export default HomeScreen;
