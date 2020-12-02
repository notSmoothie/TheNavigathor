import React from 'react';
import {Pressable, Text, View} from 'react-native';

const CPNavigation = (props) => {
  return (
    <View>
      <Pressable
        onPress={props.mapstyle}
        style={{backgroundColor: 'yellow', padding: 15}}>
        <Text>NavigaThor</Text>
      </Pressable>
    </View>
  );
};

export default CPNavigation;
