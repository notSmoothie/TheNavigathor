import React from 'react';
import {Pressable, Text, View, Image} from 'react-native';

const StyleSwitch = (props) => {
  return (
    <View>
      <Pressable
        style={{flexDirection: 'row', alignItems: 'center'}}
        onPress={props.mapStyle}>
        <Text style={props.style}>Light/Dark Mode</Text>
        {props.mode ? (
          <Image
            style={{marginLeft: 50}}
            source={require('../assets/component14.png')}></Image>
        ) : (
          <Image
            style={{marginLeft: 50}}
            source={require('../assets/component15.png')}></Image>
        )}
      </Pressable>
    </View>
  );
};

export default StyleSwitch;
