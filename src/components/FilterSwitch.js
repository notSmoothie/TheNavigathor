import React from 'react';
import {Pressable, Text, View, Image} from 'react-native';

const StyleSwitch = (props) => {
  return (
    <View>
      <Pressable
        android_ripple={{color: 'rgb(255,215,0)', borderless: 'true'}}
        style={{flexDirection: 'row', alignItems: 'center'}}
        onPress={props.filterMode}>
        <Text style={props.style}>Filter By Schedule</Text>
        {props.mode ? (
          <Image
            style={{
              position: 'absolute',
              right: 10,
            }}
            source={require('../assets/switch_on.png')}></Image>
        ) : (
          <Image
            style={{
              position: 'absolute',
              right: 10,
            }}
            source={require('../assets/switch_off.png')}></Image>
        )}
      </Pressable>
    </View>
  );
};

export default StyleSwitch;
