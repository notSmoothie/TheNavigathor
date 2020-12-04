import React from 'react';
import {Pressable, Text, View} from 'react-native';

const StyleSwitch = (props) => {
  return (
    <View>
      <Pressable onPress={props.filterMode}>
        <Text style={props.style}>Filter By Schedule</Text>
      </Pressable>
    </View>
  );
};

export default StyleSwitch;
