import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import * as FileSystem from 'expo-file-system';

import ChooseiCal from './ChooseiCal';
import StyleSwitch from './StyleSwitch';
import FilterSwitch from './FilterSwitch';
import Schedule from './Schedule';

import {LightMode, DarkMode} from '../styles/MapStyles';
import CanteenView from './CanteenView';

import MapViewDirections from 'react-native-maps-directions';
import NavigateMe from './NavigateMe';
import {or} from 'react-native-reanimated';

import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

import DropDownItem from 'react-native-drop-down-item';

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

  const [mapStyle, setMapStyle] = useState(DarkMode);
  const [markerImage] = useState(require('../assets/location.png'));

  const IC_ARR_DOWN = require('../assets/chevron/jozef.png');
  const IC_ARR_UP = require('../assets/chevron/stefan.png');

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

  function RenderItems(props) {
    return props.items.map((a) => {
      return (
        <Text key={uuidv4()} style={{padding: 0, color: "rgb(255,215,0)"}}>
          {a}
        </Text>
      );
    });
  }

  function Footer() {
    if (showFooter && !showSettings) {
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
              order={markers[id].fetch_attribute.split(',')[1]}
              lightMode={mapStyle == LightMode}></CanteenView>
          </View>
        );
      } else {
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

        var items = [];
        var item = {
          title: '',
          body: '',
        };
        for (let i = 0; i < filteredRooms.length; i++) {
          if (
            i == 0 ||
            filteredRooms[i].roomType.idRoomType !=
              filteredRooms[i - 1].roomType.idRoomType
          ) {
            if (i > 0) {
              items.push({title: item.title, body: item.body});
              item.title = '';
              item.body = '';
            }
            item.title = filteredRooms[i].roomType.name;
          }
          item.body =
            item.body +
            (item.body == '' ? '' : ';') +
            filteredRooms[i].name +
            ' - (' +
            filteredRooms[i].number +
            ')';
        }

        const state = {
          contents: items,
        };

        return (
          <View style={styles.footer}>
            <Text style={{textAlign: 'center', padding: 5, color: "rgb(255,215,0)", fontWeight:"bold"}}>
              {name} - {description}
            </Text>
            <ScrollView style={{alignSelf: 'stretch'}}>
              {state.contents
                ? state.contents.map((param, i) => {
                    return (
                      <DropDownItem
                        key={i}
                        style={styles.dropDownItem}
                        contentVisible={false}
                        invisibleImage={IC_ARR_DOWN}
                        visibleImage={IC_ARR_UP}
                        header={
                          <View>
                            <Text
                              style={{
                                fontSize: 20,
                                padding: 5,
                                color: 'rgb(255,215,0)',
                                fontWeight: 'bold',
                              }}>
                              {param.title}
                            </Text>
                          </View>
                        }>
                        <RenderItems
                          items={param.body.split(';')}></RenderItems>
                      </DropDownItem>
                    );
                  })
                : null}
              <View />
            </ScrollView>
          </View>
        );
      }
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
    if (!filterMode) {
      filterSchedule();
      setFilterMode(true);
    } else {
      setMarkers(originalMarkers);
      setFilterMode(false);
    }
  };

  const changeMapStyle = () => {
    if (mapStyle == LightMode) {
      setMapStyle(DarkMode);
    } else if (mapStyle == DarkMode) {
      setMapStyle(LightMode);
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
              <Pressable
                onPress={() => {
                  props.navigation.navigate('Schedule', {
                    schedule: schedule,
                  });
                }}>
                <Text style={styles.menuButton}>Show Schedule</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  props.navigation.navigate('CP');
                }}>
                <Text style={styles.menuButton}>Find CP</Text>
              </Pressable>
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
        showsUserLocation={false}
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
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  body: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  footer: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    borderColor: 'rgb(158,158,158)',
    width: '99%',
    height: '40%',
    position: 'absolute',
    alignContent: 'center',
    justifyContent: 'center',
    padding: 8,
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
