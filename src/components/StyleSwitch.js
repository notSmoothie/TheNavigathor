import React from 'react';
import {Pressable, Text, View, Image} from 'react-native';

const StyleSwitch = (props) => {
  return (
    <View>
      <Pressable
        style={{flexDirection: 'row', alignItems: 'center'}}
        onPress={props.mapStyle}>
        <Text style={props.style}>Light Mode</Text>
        {props.mode ? (
          <Image
            style={{
              position: 'absolute',
              right: 10,
            }}
            source={require('../assets/switch_off.png')}></Image>
        ) : (
          <Image
            style={{
              position: 'absolute',
              right: 10,
            }}
            source={require('../assets/switch_on.png')}></Image>
        )}
      </Pressable>
    </View>
  );
};

export default StyleSwitch;
