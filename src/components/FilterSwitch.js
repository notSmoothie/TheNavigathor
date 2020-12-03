import React from 'react';
import {Pressable, Text, View} from 'react-native';

const StyleSwitch = (props) => {
  return (
    <View>
      <Pressable onPress={props.filterMode}>
        <Text style={props.style}>Switch Filter</Text>
      </Pressable>
    </View>
  );
};

export default StyleSwitch;
