import React, {useState} from 'react';
import {Text, Button, View, StyleSheet} from 'react-native';
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
          <Text>Odkiaľ:</Text>
          <View style={styles.inputContainer}>
            <GooglePlacesInput
              notifyChange={(loc) =>
                getCoordsOfOrigin(loc)
              }></GooglePlacesInput>
          </View>
        </View>
        <View style={styles.smallerContainer}>
          <Text>Kam:</Text>
          <View style={styles.inputContainer}>
            <GooglePlacesInput
              notifyChange={(loc) =>
                getCoordsOfDestination(loc)
              }></GooglePlacesInput>
          </View>
        </View>
        <Button title="Navigate me!" onPress={() => handleGetDirections()} />
      </View>
      <Button title="Home" onPress={() => props.navigation.navigate('Home')} />
    </View>
  );
};

const styles = StyleSheet.create({
  containerGoogle: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  smallerContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ecf0f1',
  },
  inputContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ecf0f1',
  },
  wrapper: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ecf0f1',
  },
});
//        <Button onPress={this.handleGetDirections} title="Get Directions" />
export default CPNavigationButton;
