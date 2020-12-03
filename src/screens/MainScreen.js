import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import Main from '../components/Main';
import * as FileSystem from 'expo-file-system';

const MainScreen = ({navigation}) => {
  async function getRooms() {
    try {
      const response = await fetch(`https://at.tuke.sk/api/room`);
      const json = await response.json();
      return json;
    } catch (error) {
      console.log(error);
    }
  }

  async function getMarkers() {
    try {
      const response = await fetch(`http://18.157.253.130:3000/markers`);
      const json = await response.json();
      return json;
    } catch (error) {
      console.log(error);
    }
  }

  function useAsync(getMethod) {
    const [value, setValue] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    async function getResource() {
      try {
        setLoading(true);
        const result = await getMethod();
        setValue(result);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    }
    useEffect(() => {
      getResource();
    }, []);

    return {value, error, loading};
  }

  function FetchMultipleResourceAtOnce() {
    const Markers = useAsync(getMarkers);
    const Rooms = useAsync(getRooms);

    if (Markers.loading == false && Rooms.loading == false) {
      return (
        <Main
          navigation={navigation}
          markers={Markers.value}
          rooms={Rooms.value}></Main>
      );
    } else {
      return (
        <View>
          <Text>
            {Markers.error
              ? 'Failed to load resource Markers'
              : Markers.loading
              ? 'Loading Markers...'
              : 'Markers loaded.'}
          </Text>
          <Text>
            {Rooms.error
              ? 'Failed to load resource Rooms'
              : Rooms.loading
              ? 'Loading Rooms...'
              : 'Loaded Rooms.'}
          </Text>
        </View>
      );
    }
  }

  return <FetchMultipleResourceAtOnce></FetchMultipleResourceAtOnce>;
};

export default MainScreen;
