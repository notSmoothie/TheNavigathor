/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

const App: () => React$Node = () => {
  const [map, setMap] = useState();
  const [markers, setMarkers] = useState([]);
  const [markerId, setMarkerId] = useState('');
  const [showOverlay, setShowOverlay] = useState(false);

  function getMarkers() {
    return fetch('nah')
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
      featureType: 'administrative',
      elementType: 'geometry',
      stylers: [
        {
          visibility: 'off',
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
      featureType: 'road',
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off',
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
        if (marker.id == markerId) {
          name = marker.title;
          description = marker.description;
        }
      });

      return (
        <View style={styles.footer}>
          <ScrollView horizontal={false} showsHorizontalScrollIndicator={false}>
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
        rotateEnabled={false}
        showsCompass={false}
        onPress={() => {
          setShowOverlay(false);
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
              setMarkerId(marker.nativeEvent.id);
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
    height: '35%',
    position: 'absolute',
    alignContent: 'center',
    justifyContent: 'center',
  },
});

export default App;
