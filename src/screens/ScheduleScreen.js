import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import Schedule from '../components/Schedule';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const ScheduleScreen = ({navigation, route}) => {
  return (
    <View style={styles.container}>
      <Schedule schedule={route.params}></Schedule>
      <Button title="Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

export default ScheduleScreen;
