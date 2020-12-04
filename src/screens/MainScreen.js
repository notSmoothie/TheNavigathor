import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import Main from '../components/Main';
import AnimatedSplash from 'react-native-animated-splash-screen';

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
      Rooms.value = Rooms.value.filter((e) => {
        if (
          e.roomType.name.toUpperCase().includes('Učebňa'.toUpperCase()) ||
          e.roomType.name.toUpperCase().includes('Telocvičňa'.toUpperCase()) ||
          e.roomType.name.toUpperCase().includes('Rysovňa'.toUpperCase()) ||
          e.roomType.name.toUpperCase().includes('Poslucháreň'.toUpperCase()) ||
          e.roomType.name
            .toUpperCase()
            .includes('Laboratórium'.toUpperCase()) ||
          e.roomType.name.toUpperCase().includes('Kabinet'.toUpperCase()) ||
          e.roomType.name
            .toUpperCase()
            .includes('Internetová miestnosť'.toUpperCase()) ||
          e.roomType.name.toUpperCase().includes('Bufet'.toUpperCase()) ||
          e.roomType.name.toUpperCase().includes('Aula'.toUpperCase()) ||
          e.roomType.name.toUpperCase().includes('Ateliér'.toUpperCase())
        ) {
          return e;
        }
      });

      // rooms = rooms.sort(function (a, b) {
      //   var roomNameA = a.roomType.name.toUpperCase();
      //   var roomNameB = b.roomType.name.toUpperCase();
      //   if (roomNameA < roomNameB) {
      //     return -1;
      //   }
      //   if (roomNameA > roomNameB) {
      //     return 1;
      //   }

      //   return 0;
      // });

      return (
        <Main
          navigation={navigation}
          markers={Markers.value}
          rooms={Rooms.value}></Main>
      );
    } else {
      return (
        <AnimatedSplash
          translucent={true}
          isLoaded={() => {
            if (Markers.loading != null && Rooms.loading != null) {
              if (Markers.loading == false && Rooms.loading == false) {
                return true;
              }
              return false;
            }
            return false;
          }}
          logoImage={require('../assets/logo.png')}
          backgroundColor={'#000000'}
          logoHeight={250}
          logoWidth={250}></AnimatedSplash>
      );
    }
  }

  return <FetchMultipleResourceAtOnce></FetchMultipleResourceAtOnce>;
};

export default MainScreen;
