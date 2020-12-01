/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {StyleSheet, View, Text, ScrollView, Image} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

const App: () => React$Node = () => {
  const [map, setMap] = useState();
  const [markers, setMarkers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [latestMarker, setLatestMarker] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false);

  function getRooms() {
    return fetch('https://at.tuke.sk/api/room')
      .then((response) => response.json())
      .then((responseJson) => {
        setRooms(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  //getRooms()
  //console.log(rooms);

  function getMarkers() {
    return fetch('http://18.157.253.130:3000/markers')
      .then((response) => response.json())
      .then((responseJson) => {
        setMarkers(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const mapStyle = [
    {
      stylers: [
        {
          visibility: 'on',
        },
      ],
    },
    {
      elementType: 'geometry',
      stylers: [
        {
          visibility: 'on',
        },
      ],
    },
    {
      elementType: 'labels.text.fill',
      stylers: [
        {
          visibility: 'on',
        },
      ],
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'administrative',
      elementType: 'geometry',
      stylers: [
        {
          color: '#757575',
        },
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'administrative.country',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9e9e9e',
        },
      ],
    },
    {
      featureType: 'landscape',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#303030',
        },
      ],
    },
    {
      featureType: 'landscape.man_made',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#ffd700',
        },
        {
          weight: 2.5,
        },
      ],
    },
    {
      featureType: 'poi',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#757575',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [
        {
          color: '#181818',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#167000',
        },
        {
          saturation: -45,
        },
        {
          visibility: 'on',
        },
        {
          weight: 4,
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#616161',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#1b1b1b',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#2c2c2c',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#8a8a8a',
        },
      ],
    },
    {
      featureType: 'road.arterial',
      elementType: 'geometry',
      stylers: [
        {
          color: '#373737',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [
        {
          color: '#3c3c3c',
        },
        {
          visibility: 'on',
        },
      ],
    },
    {
      featureType: 'road.highway.controlled_access',
      elementType: 'geometry',
      stylers: [
        {
          color: '#4e4e4e',
        },
      ],
    },
    {
      featureType: 'road.local',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#1a1a1a',
        },
        {
          saturation: -35,
        },
      ],
    },
    {
      featureType: 'road.local',
      elementType: 'geometry.stroke',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'road.local',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#ffd700',
        },
      ],
    },
    {
      featureType: 'transit',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'transit',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#757575',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        {
          color: '#000000',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#01a6f9',
        },
      ],
    },
  ];

  const BuildingContent = (props) => {
    return (
      <View
        style={{
          height: 130,
          width: 130,
          marginLeft: 20,
          borderWidth: 0.5,
          borderColor: '#dddddd',
        }}>
        <View style={{flex: 1}}>
          <Text>{props.name}</Text>
        </View>
        <View style={{flex: 1, paddingLeft: 10}}>
          <Text>{props.description}</Text>
        </View>
      </View>
    );
  };

  function Overlay() {
    if (showOverlay) {
      var name = '';
      var description = '';
      markers.map((marker) => {
        if (marker.id == latestMarker.id) {
          name = marker.title;
          description = marker.description;
        }
      });

      return (
        <View style={styles.footer}>
          <ScrollView showsHorizontalScrollIndicator={false}>
            <BuildingContent name={name} description={description} />
          </ScrollView>
        </View>
      );
    } else {
      return null;
    }
  }
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
          getMarkers();
        }}
        toolbarEnabled={false}
        rotateEnabled={false}
        showsCompass={false}
        onPress={() => {
          setShowOverlay(false);
          map.animateCamera({
            heading: -27.5,
            center: {
              latitude: 48.733033959741185,
              longitude: 21.24518905793565,
            },
            zoom: 15.7,
          });
        }}
        onMarkerPress={() => {
          setShowOverlay(true);
        }}
        onRegionChangeComplete={() => {
          map.setCamera({
            heading: -27.5,
          });
        }}
        customMapStyle={mapStyle}>
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            identifier={String(marker.id)}
            coordinate={{
              latitude: parseFloat(marker.latlng.split(',')[0]),
              longitude: parseFloat(marker.latlng.split(',')[1]),
            }}
            title={marker.title}
            description={marker.description}
            onPress={(marker) => {
              setLatestMarker(marker.nativeEvent);
              map.animateCamera({
                zoom: 17,
                center: {
                  latitude: marker.nativeEvent.coordinate.latitude,
                  longitude: marker.nativeEvent.coordinate.longitude,
                },
              });
            }}
          />
        ))}
      </MapView>
      <Overlay></Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  body: {
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
});

export default App;
