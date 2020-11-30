/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

const App: () => React$Node = () => {
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.body}
        region={{
          latitude: 48.730068,
          longitude: 21.24589,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}></MapView>
        <View style={styles.footer}>
          <Text>Footer</Text>
        </View>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  body: {
    flex: 10
  },
  footer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default App;
