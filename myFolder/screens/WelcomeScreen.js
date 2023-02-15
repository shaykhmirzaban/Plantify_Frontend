import {
  View,
  Text,
  ImageBackground,
  Image,
  StatusBar,
  ScrollView,
} from 'react-native';

// component
import SMButton from '../components/SMButton';

function WelcomeScreen({navigation}) {
  const naviagte = e => {
    navigation.navigate(e);
  };
  return (
    <ScrollView
      style={{backgroundColor: '#fff'}}
      contentContainerStyle={{height: '100%'}}>
      <StatusBar backgroundColor={'#0D986A'} barStyle={'light-content'} />
      {/* top part */}
      <View
        style={{
          width: '100%',
          height: '55%',
          backgroundColor: '#0D986A',
          borderBottomLeftRadius: 35,
          borderBottomRightRadius: 35,
        }}>
        <ImageBackground
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          source={require('../images/Vector.png')}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image
              resizeMode="center"
              style={{width: 200, height: 200}}
              source={require('../images/Logo.png')}
            />
            <Text
              style={{
                letterSpacing: 10,
                color: '#fff',
                marginVertical: 10,
                fontWeight: 'bold',
                fontSize: 28,
              }}>
              PLANTIFY
            </Text>
          </View>
        </ImageBackground>
      </View>

      {/* bottom part */}
      <View
        style={{
          padding: 25,
          height: '45%',
          justifyContent: 'space-between',
        }}>
        {/* top part */}
        <View>
          <View>
            <Text
              style={{
                color: '#0D986A',
                fontSize: 22,
                fontWeight: '700',
                letterSpacing: 2,
              }}>
              GET READY
            </Text>
            <Text
              style={{
                color: '#0D986A',
                fontSize: 22,
                fontWeight: '700',
                letterSpacing: 2,
              }}>
              BE HIGYENIC
            </Text>
          </View>
          <Text style={{fontSize: 16, color: '#0D986A', marginTop: 15}}>
            Jelajahi AiLearn untuk menambah kemampuanmu dalam mengoperasikan
            Adobe Illustrator
          </Text>
        </View>
        <SMButton
          value="MASUK"
          width="100%"
          background="#0D986A"
          radius={40}
          size={18}
          onClick={() => naviagte('LoginScreen')}
        />
      </View>
    </ScrollView>
  );
}

export default WelcomeScreen;
