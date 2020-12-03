import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import CPSearch from '../components/CPSearch';
// import Geolocation from 'react-native-geolocation-service';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const CPScreen = ({navigation}) => {
  // navigator.geolocation = require(GEOLOCATION_PACKAGE);
  return <CPSearch navigation={navigation}></CPSearch>;
};

export default CPScreen;
