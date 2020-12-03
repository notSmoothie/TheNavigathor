import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  Button,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import * as FileSystem from 'expo-file-system';

import ChooseiCal from './ChooseiCal';
import StyleSwitch from './StyleSwitch';
import FilterSwitch from './FilterSwitch';

import {NavigaThorMode, RetroMode} from '../styles/MapStyles';
import CanteenView from './CanteenView';

import MapViewDirections from 'react-native-maps-directions';
import NavigateMe from './NavigateMe';
import {or} from 'react-native-reanimated';

import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const GOOGLE_MAPS_APIKEY = 'AIzaSyC_kX1KDkC4pyRUR8ZPXAYre9-Nu1vn60Y';

const Main = (props) => {
  const originalMarkers = props.markers;
  const originalRooms = props.rooms;

  const [map, setMap] = useState();

  const [schedule, setSchedule] = useState([]);
  const [filterMode, setFilterMode] = useState(false);

  const [rooms, setRooms] = useState(originalRooms);
  const [buildingRooms, setBuildingRooms] = useState([]);

  const [markers, setMarkers] = useState(originalMarkers);
  const [latestMarkerId, setLatestMarkerId] = useState();

  const [showFooter, setShowFooter] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [mapStyle, setMapStyle] = useState(NavigaThorMode);
  const [markerImage] = useState(require('../assets/location.png'));

  const [showRoute, setShowRoute] = useState(false);
  const [myLocation, setMyLocation] = useState({
    latitude: 48.730425397478086,
    longitude: 21.245568194134698,
  });

  async function loadSchedule() {
    const schedulePath = FileSystem.documentDirectory.concat(
      'jsonizedIcs.json',
    );
    const fileInfo = await FileSystem.getInfoAsync(schedulePath);
    if (fileInfo.exists) {
      const schedule = await FileSystem.readAsStringAsync(schedulePath);
      setSchedule(JSON.parse(schedule));
    }
  }

  useEffect(function () {
    loadSchedule();
  }, []);

  function filterSchedule() {
    var count = 1;
    const filteredMarkers = markers.filter((marker) => {
      var hue = null;
      schedule.map((e) => {
        if (
          e.location.toUpperCase().includes(marker.title.toUpperCase()) ||
          marker.fetch_attribute != undefined
        ) {
          hue = marker;
          hue.id = count;
        }
      });
      if (hue != undefined) {
        count++;
        return hue;
      }
    });
    setMarkers(filteredMarkers);
  }

  function getRoomsInBuilding(id) {
    const roomsInBuilding = rooms.filter((element) => {
      if (
        element.building.name
          .toUpperCase()
          .includes(markers[id].title.toUpperCase())
      ) {
        return element;
      }
    });
    setBuildingRooms(roomsInBuilding);
  }

  function Footer() {
    if (showFooter) {
      if (latestMarkerId == undefined) {
        return <View style={styles.footer}></View>;
      }
      var id = latestMarkerId;
      const name = markers[id].title;
      const description = markers[id].description;

      if (markers[id].fetch_attribute != null) {
        return (
          <View style={styles.footer}>
            <CanteenView
              canteenType={markers[id].fetch_attribute.split(',')[0]}
              order={markers[id].fetch_attribute.split(',')[1]}></CanteenView>
          </View>
        );
      }
      else {
        var filteredRooms = buildingRooms.filter((element) => {
          if (element.name != null && element.name.length > 0) {
            return element;
          }
        });

        filteredRooms = filteredRooms.sort(function (a, b) {
          var roomNameA = a.roomType.name.toUpperCase();
          var roomNameB = b.roomType.name.toUpperCase();
          if (roomNameA < roomNameB) {
            return -1;
          }
          if (roomNameA > roomNameB) {
            return 1;
          }

          return 0;
        });

        var roomsToRender = [];
        for (let i = 0; i < filteredRooms.length; i++) {
          if (
            i == 0 ||
            filteredRooms[i].roomType.idRoomType !=
              filteredRooms[i - 1].roomType.idRoomType
          ) {
            roomsToRender.push(
              <Text
                key={uuidv4()}
                style={{textAlign: 'center', fontSize: 20, padding: 5}}>
                {filteredRooms[i].roomType.name}
              </Text>,
            );
          }
          roomsToRender.push(
            <Text
              key={uuidv4()}
              style={{textAlign: 'center', padding: 5}}>
              {filteredRooms[i].name} - ({filteredRooms[i].number})
            </Text>,
          );
        }
      }

      return (
        <View style={styles.footer}>
          {/* <NavigateMe
            latlng={markers[id].latlng}
            callBack={navigateMeToMarker}></NavigateMe> */}
          <Text style={{textAlign: 'center', padding: 5}}>
            {name} - {description}
          </Text>
          <ScrollView horizontal={false} showsHorizontalScrollIndicator={false}>
            {roomsToRender}
          </ScrollView>
        </View>
      );
    } else {
      return null;
    }
  }

  const navigateMeToMarker = () => {
    setShowRoute(true);
  };

  function Navigation() {
    if (showRoute) {
      return (
        <MapViewDirections
          origin={myLocation}
          destination={markers[latestMarkerId].latlng}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={4}
          mode={'WALKING'}
          strokeColor="rgb(123, 123, 123)"
        />
      );
    } else {
      return <></>;
    }
  }
  /*
  <MapViewDirections
  origin={myCurrentDestination}
  destination={myDestination}
  apikey={GOOGLE_MAPS_APIKEY}
  strokeWidth={3}
  mode={'WALKING'}
  strokeColor="hotpink"
/>
*/

  const switchFiltering = () => {
    if (filterMode == false) {
      filterSchedule();
      setFilterMode(true);
    } else if (filterMode == true) {
      setMarkers(originalMarkers);
      setFilterMode(false);
    }
  };

  const changeMapStyle = () => {
    if (mapStyle == NavigaThorMode) {
      setMapStyle(RetroMode);
    } else if (mapStyle == RetroMode) {
      setMapStyle(NavigaThorMode);
    }
  };

  const Settings = (mapStyle) => {
    if (showSettings) {
      return (
        <View style={styles.settingsContainer}>
          <Pressable
            style={styles.settingsBack}
            onPress={() => {
              setShowSettings(false);
            }}></Pressable>
          <View style={styles.settings}>
            <View style={styles.settingsMenu}>
              <StyleSwitch
                style={styles.menuButton}
                mapStyle={changeMapStyle}></StyleSwitch>
              <FilterSwitch
                style={styles.menuButton}
                filterMode={switchFiltering}></FilterSwitch>
              <ChooseiCal style={styles.menuButton}></ChooseiCal>
              {/* <Button
                title="Find CP!"
                onPress={() => props.navigation.navigate('CP')}
              /> */}
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <Pressable
          style={styles.settingsIcon}
          onPress={() => {
            setShowSettings(true);
          }}>
          <Image source={require('../assets/settings.png')} />
        </Pressable>
      );
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={(ref) => {
          setMap(ref);
        }}
        provider={PROVIDER_GOOGLE}
        style={styles.body}
        onLayout={() => {
          map.setCamera({
            heading: -27.5,
            center: {
              latitude: 48.733033959741185,
              longitude: 21.24518905793565,
            },
            zoom: 15.7,
          });
        }}
        toolbarEnabled={false}
        loadingEnabled={true}
        rotateEnabled={false}
        showsCompass={false}
        onPress={() => {
          setShowFooter(false);
          map.animateCamera({
            center: {
              latitude: 48.733033959741185,
              longitude: 21.24518905793565,
            },
            zoom: 15.7,
          });
        }}
        // onRegionChangeComplete={() => {
        //   map.setCamera({
        //     heading: -27.5,
        //   });
        // }}
        onUserLocationChange={(e) =>
          setMyLocation({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
          })
        }
        onMarkerPress={(marker) => {
          setLatestMarkerId(marker.nativeEvent.id - 1);
          getRoomsInBuilding(marker.nativeEvent.id - 1);
          setShowFooter(true);
          map.animateCamera({
            zoom: 17,
            center: {
              latitude: marker.nativeEvent.coordinate.latitude,
              longitude: marker.nativeEvent.coordinate.longitude,
            },
          });
        }}
        customMapStyle={mapStyle}>
        {markers.map((marker) => (
          <Marker
            identifier={String(marker.id)}
            coordinate={{
              latitude: parseFloat(marker.latlng.split(',')[0]),
              longitude: parseFloat(marker.latlng.split(',')[1]),
            }}
            title={marker.title}
            description={marker.description}
            image={markerImage}
          />
        ))}

        {/* <Navigation /> */}
      </MapView>
      <Footer></Footer>
      <Settings currentMapStyle={mapStyle}></Settings>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  body: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  footer: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderTopWidth: 2,
    borderColor: 'rgb(158,158,158)',
    width: '100%',
    height: '40%',
    position: 'absolute',
    alignContent: 'center',
    justifyContent: 'center',
  },
  settingsContainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  settings: {
    flex: 10,
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  settingsBack: {
    flex: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  settingsMenu: {
    flex: 1,
  },
  menuButton: {
    padding: 10,
    fontSize: 16,
    textAlign: 'center',
    borderRadius: 30,
    borderBottomWidth: 1,
    borderColor: 'rgb(158, 158, 158)',
  },
  settingsIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  scrollFooter: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
});

export default Main;
