import React from 'react';
import {View, StyleSheet, Button} from 'react-native';
import Schedule from '../components/Schedule';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const ScheduleScreen = ({navigation, route}) => {
  return <Schedule navigation={navigation} setMarkerNameFromSchedule={route.params.setMarkerNameFromSchedule} setMarkerName={route.params.setMarkerName} schedule={route.params.schedule}></Schedule>;
};

export default ScheduleScreen;
