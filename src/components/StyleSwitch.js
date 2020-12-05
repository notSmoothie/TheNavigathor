import React from 'react';
import {Pressable, Text, View, Image} from 'react-native';

const StyleSwitch = (props) => {
  return (
    <View>
      <Pressable onPress={props.mapStyle}>
        <Text style={props.style}>Light/Dark Mode</Text>
        {props.mode ? (
          <Image source={require('../assets/chevron/jozef.png')}></Image>
        ) : (
          <Image source={require('../assets/chevron/stefan.png')}></Image>
        )}
      </Pressable>
    </View>
  );
};

export default StyleSwitch;
