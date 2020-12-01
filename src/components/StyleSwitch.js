import React from 'react';
import {Pressable, Text, View} from 'react-native';

const StyleSwitch = (props) => {
  return (
    <View>
      <Pressable onPress={props.mapStyle}>
        <Text style={props.style}>Switch Mode</Text>
      </Pressable>
    </View>
  );
};

export default StyleSwitch;
