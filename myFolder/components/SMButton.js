import {View} from 'react-native';
import {Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

function Button(prompt) {
  let {
    value,
    onClick,
    width,
    height,
    background,
    color,
    fontWeight,
    radius,
    size,
    marginTop,
    Style,
    icon,
  } = prompt;
  return (
    <TouchableOpacity
      onPress={onClick}
      style={{
        width: width ?? 150,
        height: height ?? 50,
        marginTop: marginTop ?? 25,
        backgroundColor: background ?? '#000',
        borderRadius: radius ?? 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        flexDirection: 'row',
        ...Style,
      }}>
      <Text
        style={{
          color: color ?? '#fff',
          fontWeight: fontWeight ?? 'bold',
          fontSize: size ?? 16,
        }}>
        {value ? value : 'asd'}
      </Text>
      {icon && <View style={{paddingLeft: 10}}>{icon}</View>}
    </TouchableOpacity>
  );
}

export default Button;
