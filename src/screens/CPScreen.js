import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import CPSearch from '../components/CPSearch';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const CPScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <CPSearch></CPSearch>
      <Button title="Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

export default CPScreen;
