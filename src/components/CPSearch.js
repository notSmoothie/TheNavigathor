import React from 'react';
import {Pressable, Button, View, TextInput} from 'react-native';
import {WebView} from 'react-native-webview';

const CPNavigationButton = (props) => {
  const [start, onChangeStart] = React.useState('Odkiaľ');
  const [end, onChangeEnd] = React.useState('Kam');

  // https://cp.hnonline.sk/kosice/
  /*
  function getRoute() {
    return fetch(
      'https://cp.hnonline.sk/kosice/?f=Technick%C3%A1+univerzita&t=Botanick%C3%A1+z%C3%A1hrada&submit=true',
    )
      .then((response) => response.json())
      .then((responseJson) => {
        setRooms(responseJson);
        console.log(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }
*/

  return (
    <View>
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => onChangeStart(text)}
        value={start}
      />
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => onChangeEnd(text)}
        value={end}
      />
      <Button title="Find CP!" onPress={() => {}} />
      <WebView source={{uri: 'http://jedalen.tuke.sk/denne-menu/'}} />
    </View>
  );
};

// <WebView source={{uri: 'http://jedalen.tuke.sk/denne-menu/'}} /></View>

export default CPNavigationButton;
