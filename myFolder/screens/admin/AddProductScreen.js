import DropDownPicker from 'react-native-dropdown-picker';
import {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ToastAndroid,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DBURL from '../../../config';
import SMButton from '../../components/SMButton';
// firebase
// import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import axios from 'axios';

function AddProductScreen() {
  const [flag, setFlag] = useState(false);
  const [image, setImage] = useState('');
  const [data, setData] = useState({
    image: '',
  });
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('name');
  const [items, setItems] = useState([
    {label: 'Indoor', value: 'Indoor'},
    {label: 'Outdoor', value: 'Outdoor'},
    {label: 'Seeds', value: 'Seeds'},
    {label: 'Planters', value: 'Planters'},
  ]);

  const selectImage = async () => {
    const result = await launchImageLibrary({mediaType: 'photo'});
    if (result.assets[0].uri) {
      setImage(result.assets[0].uri);
    }
  };

  const deleteImageFn = () => {
    setImage('');
    ToastAndroid.show('successfully delete', ToastAndroid.SHORT);
  };

  const uploadImage = async () => {
    if (image) {
      setFlag(true);
      const uri = image;
      const filename = uri.substring(uri.lastIndexOf('/') + 1);
      const uploadUri =
        Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

      const task = storage().ref(filename).putFile(uploadUri);

      try {
        await task;
        const url = await storage().ref(filename).getDownloadURL();
        data.image = url;
      } catch (e) {
        console.error(e);
      }

      ToastAndroid.show('Successfully upload image', ToastAndroid.SHORT);
      setImage(null);
      setFlag(false);
    } else {
      ToastAndroid.show('Select Image', ToastAndroid.SHORT);
    }
  };

  const uploadData = async () => {
    data.category = value;
    try {
      await axios({
        url: `${DBURL}/plant`,
        method: 'post',
        data: data,
      }).then(res => {
        if (res.data.status) {
          ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
          setData({
            image: '',
          });
        } else {
          ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
        }
      });
    } catch (err) {
      ToastAndroid.show(err, ToastAndroid.SHORT);
    }
  };

  return (
    <ScrollView style={{padding: 20, backgroundColor: '#fff', flex: 1}}>
      {/* heading */}
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 10,
        }}>
        <Text style={{fontSize: 30, color: '#002140', fontWeight: 'bold'}}>
          Add Product
        </Text>
      </View>

      {/* form */}
      <View>
        <TextInput
          placeholder="Title"
          style={Style.inputFieldStyle}
          placeholderTextColor="#004a61bd"
          onChangeText={e => setData({...data, title: e})}
        />
        <TextInput
          placeholder="Name"
          style={Style.inputFieldStyle}
          onChangeText={e => setData({...data, name: e})}
          placeholderTextColor="#004a61bd"
        />
        <TextInput
          placeholder="Description"
          style={Style.inputFieldStyle}
          numberOfLines={4}
          onChangeText={e => setData({...data, description: e})}
          placeholderTextColor="#004a61bd"
        />
        <TextInput
          placeholder="Price"
          style={Style.inputFieldStyle}
          onChangeText={e => setData({...data, price: e})}
          keyboardType="number-pad"
          placeholderTextColor="#004a61bd"
        />
        <TextInput
          placeholder="size"
          style={Style.inputFieldStyle}
          onChangeText={e => setData({...data, size: e})}
          keyboardType="number-pad"
          placeholderTextColor="#004a61bd"
        />
        <TextInput
          placeholder="color code"
          style={Style.inputFieldStyle}
          onChangeText={e => setData({...data, colorCode: e})}
          placeholderTextColor="#004a61bd"
        />

        <View style={{width: 100, height: 60}}>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            dropDownContainerStyle={{
              backgroundColor: '#EAF8FF',
              borderWidth: 0,
              borderTopWidth: 2,
              borderColor: '#fff',
            }}
            style={[
              Style.inputFieldStyle,
              {color: '#004a61bd', marginVertical: 5},
            ]}
            textStyle={{color: '#004a61bd', fontWeight: 'bold'}}
          />
        </View>
      </View>

      {/* button section */}
      <View style={{marginVertical: 20}}>
        {/* select Image */}
        <View>
          <SMButton
            value="Select Image"
            width="100%"
            background="#fff"
            color="#0D986A"
            radius={40}
            size={18}
            marginTop={10}
            onClick={selectImage}
            Style={{
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 8,
              },
              shadowOpacity: 0.46,
              shadowRadius: 11.14,

              elevation: 3,

              borderColor: '#0D986A',
              borderWidth: 2,
              borderStyle: 'solid',
            }}
            icon={<Icon name="image" size={27} color={'#0D986A'} />}
          />
        </View>

        {image && (
          <View style={{position: 'relative'}}>
            <Image
              style={{
                width: 200,
                height: 200,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 10,
                borderRadius: 10,
              }}
              source={{uri: image}}
            />
            <TouchableOpacity
              onPress={deleteImageFn}
              style={{
                position: 'absolute',
                top: 5,
                right: -5,
                padding: 5,
                borderRadius: 50,
                backgroundColor: '#fff',
              }}>
              <Icon name="delete" size={27} color={'red'} />
            </TouchableOpacity>
          </View>
        )}

        {/* ulpoad image */}
        <View>
          <SMButton
            value={
              flag ? (
                <ActivityIndicator
                  size="large"
                  color="#0D986A"
                  animating={flag}
                />
              ) : (
                'Add'
              )
            }
            width="100%"
            background="#fff"
            color="#0D986A"
            radius={40}
            size={18}
            marginTop={10}
            onClick={uploadImage}
            Style={{
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 8,
              },
              shadowOpacity: 0.46,
              shadowRadius: 11.14,

              elevation: 3,

              borderColor: '#0D986A',
              borderWidth: 2,
              borderStyle: 'solid',
            }}
          />
        </View>

        {/* ulpoad data */}
        <View style={{marginBottom: 30}}>
          <SMButton
            value="Upload Data"
            width="100%"
            background="#0D986A"
            radius={40}
            size={18}
            onClick={uploadData}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const Style = StyleSheet.create({
  inputFieldStyle: {
    width: '100%',
    height: 55,
    fontSize: 16,
    paddingLeft: 10,
    fontWeight: '600',
    marginVertical: 5,

    backgroundColor: '#FCFCFC',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E6E8EB',
    borderStyle: 'solid',
  },
});

export default AddProductScreen;
