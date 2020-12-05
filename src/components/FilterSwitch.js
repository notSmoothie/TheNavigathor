import React from 'react';
import {Pressable, Text, View, Image} from 'react-native';

const StyleSwitch = (props) => {
  return (
    <View>
      <Pressable onPress={props.filterMode}>
        <Text style={props.style}>Switch Filter</Text>
        {props.filterMode ? (
          <Image source={require('../assets/chevron/jozef.png')}></Image>
        ) : (
          <Image
            style={{width: 40}}
            source={require('../assets/chevron/stefan.png')}></Image>
        )}
      </Pressable>
    </View>
  );
};

export default StyleSwitch;
