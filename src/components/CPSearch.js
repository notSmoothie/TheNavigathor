import React, {useState} from 'react';
import {Text, Button, View, StyleSheet, Pressable} from 'react-native';
import GooglePlacesInput from './GooglePlacesInput';
import getDirections from 'react-native-google-maps-directions';

const CPNavigationButton = (props) => {
  const [origin, setOrigin] = useState();
  const [destination, setDestination] = useState();

  const handleGetDirections = () => {
    const data = {
      source: {
        latitude: origin.latitude,
        longitude: origin.longitude,
      },
      destination: {
        latitude: destination.latitude,
        longitude: destination.longitude,
      },
      params: [
        {
          key: 'travelmode',
          value: 'transit', // may be "walking", "bicycling" or "transit" as well
        },
        {
          key: 'dir_action',
          value: 'navigate', // this instantly initializes navigation using the given travel mode
        },
      ],
    };

    getDirections(data);
  };

  function getCoordsOfOrigin(loc) {
    console.log(loc);
    setOrigin({
      latitude: loc.lat,
      longitude: loc.lng,
    });
  }

  function getCoordsOfDestination(loc) {
    console.log(loc);
    setDestination({
      latitude: loc.lat,
      longitude: loc.lng,
    });
  }

  return (
    <View style={styles.containerGoogle}>
      <View style={styles.wrapper}>
        <View style={styles.smallerContainer}>
          <Text style={styles.text}>Odkiaľ:</Text>
          <View style={styles.inputContainer}>
            <GooglePlacesInput 
              notifyChange={(loc) =>
                getCoordsOfOrigin(loc)
              }></GooglePlacesInput>
          </View>
        </View>
        <View style={styles.smallerContainer}>
          <Text style={styles.text}>Kam:</Text>
          <View style={styles.inputContainer}>
            <GooglePlacesInput
              notifyChange={(loc) =>
                getCoordsOfDestination(loc)
              }></GooglePlacesInput>
          </View>
        </View>
        <Pressable color="rgb(255,215,0)" onPress={() => handleGetDirections()}>
          <Text style={{color: '#000000', backgroundColor:"#ffd700", textAlign:"center", padding:"3%"}}>Navigate</Text>
          </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerGoogle: {
    flex: 1,
    backgroundColor: '#000000',
  },
  smallerContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#000000',
  },
  inputContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#000000',
  },
  text:{
    color: "rgb(255,215,0)"
  },
  wrapper: {
    flex: 1,
    padding: 10,
    backgroundColor: '#000000',
  },
});
//        <Button onPress={this.handleGetDirections} title="Get Directions" />
export default CPNavigationButton;
