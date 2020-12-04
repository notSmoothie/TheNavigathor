import React from 'react';
import {Pressable, Image} from 'react-native';

const NavigateMe = (props) => {
  return (
    <Pressable onPress={props.callBack} style={props.style}>
      <Image source={require('../assets/navigateicon.png')}></Image>
    </Pressable>
  );
};

export default NavigateMe;
