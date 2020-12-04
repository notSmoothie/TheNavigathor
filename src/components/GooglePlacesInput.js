import React, {useEffect} from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {
  Jedlíkova,
  BoženyNemcovej,
  FerkaUrbánka,
  HlavnáStanica,
  EasterEgg,
} from '../data/MyPlacesData';

navigator.geolocation = require('react-native-geolocation-service');

const GooglePlacesInput = (props) => {
  useEffect(function () {
    /*
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );*/
  }, []);

  return (
    <GooglePlacesAutocomplete
      currentLocation={true}
      currentLocationLabel="From current location"
      placeholder="Search"
      minLength={2}
      autoFocus={true}
      returnKeyType={'search'}
      listViewDisplayed={'auto'}
      fetchDetails={true}
      predefinedPlaces={[
        Jedlíkova,
        HlavnáStanica,
        FerkaUrbánka,
        BoženyNemcovej,
        EasterEgg,
      ]}
      onPress={(data, details = null) => {
        props.notifyChange(details.geometry.location);
      }}
      query={{
        components: 'country:sk',
        key: 'AIzaSyC_kX1KDkC4pyRUR8ZPXAYre9-Nu1vn60Y',
        language: 'sk',
      }}
      nearbyPlacesAPI="GooglePlacesSearch"
      debounce={300}
    />
  );
};

export default GooglePlacesInput;
