import {ScrollView, View, Text, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

function DetailScreen() {
  return (
    <ScrollView
      nestedScrollEnabled={true}
      style={{
        flex: 1,
      }}
      contentContainerStyle={{
        backgroundColor: '#fff',
      }}>
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
          <TouchableOpacity>
            {/* <Image
              source={require('../images/hamburger.png')}
              style={{width: 40, height: 40}}
              resizeMode="contain"
            /> */}
            <Icon name="menu" size={27} color="#002140" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export default DetailScreen;
