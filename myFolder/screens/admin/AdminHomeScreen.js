import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ToastAndroid,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DBURL from '../../../config';
import axios from 'axios';
import {RefreshControl} from 'react-native-gesture-handler';

const AdminHomeScreen = () => {
  let [data, setData] = useState([]);
  let [flag, setFlag] = useState(false);
  // get Data
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

  const deleteItemFn = async id => {
    await axios({
      url: `${DBURL}/plant`,
      method: 'delete',
      data: {id: id},
    })
      .then(res => {
        ToastAndroid.show('Successfully delete an item', ToastAndroid.show);
        getData();
      })
      .catch(err => {
        ToastAndroid.show(err, ToastAndroid.show);
      });
  };

  const refreshData = () => {
    setFlag(true);
    setTimeout(() => {
      setFlag(false);
      getData();
    }, 1000);
  };

  return (
    <ScrollView
      style={{flex: 1, backgroundColor: '#fff', padding: 20}}
      refreshControl={
        <RefreshControl refreshing={flag} onRefresh={refreshData} />
      }>
      {/* All Product */}
      <View>
        <Text style={{fontSize: 27, fontWeight: 'bold', color: '#002140'}}>
          All Product
        </Text>
      </View>

      {/* product */}
      <View style={{marginVertical: 20}}>
        {data && data.length > 0 ? (
          data.map(val => {
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
                          width: 100,
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text>
                          {val.description.length > 30
                            ? `${val.description.slice(0, 30)}...`
                            : val.description}{' '}
                          :{' '}
                        </Text>
                      </View>

                      <TouchableOpacity onPress={() => deleteItemFn(val._id)}>
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
    </ScrollView>
  );
};

export default AdminHomeScreen;
