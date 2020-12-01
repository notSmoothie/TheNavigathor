import React, {useState} from 'react';
import {Text, View, Pressable} from 'react-native';
import DocumentPicker from 'react-native-document-picker';

const ChooseiCal = (props) => {
  const [singleFile, setSingleFile] = useState('');

  const selectOneFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      console.log('res : ' + JSON.stringify(res));
      console.log('URI : ' + res.calendarData);

      setSingleFile(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        alert('Canceled from single doc picker');
      } else {
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  return (
    <View>
      <Pressable onPress={selectOneFile}>
        <Text style={props.style}>Import schedule (.ICS)</Text>
      </Pressable>
    </View>
  );
};

export default ChooseiCal;
