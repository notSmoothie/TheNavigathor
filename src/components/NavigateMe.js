import React from 'react';
import {Button} from 'react-native';

const NavigateMe = (props) => {
  return <Button title="Navigate me here!" onPress={props.callBack}></Button>;
};

export default NavigateMe;
