import React from 'react';
import {Text, View, Pressable} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import * as FileSystem from 'expo-file-system';
import icsToJson from 'ics-to-json';

const ChooseiCal = (props) => {
  const selectOneFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      const convert = async (fileLocation) => {
        const icsRes = await fetch(fileLocation);
        const icsData = await icsRes.text();
        const data = icsToJson(icsData);

        var days = [];
        icsData.split('BEGIN').map((e) => {
          const matched = e.match('WKST=(.*);UNTIL=');
          if (matched != null) {
            if (matched[1] == 'MO') {
              days.push(1);
            }
            if (matched[1] == 'TU') {
              days.push(2);
            }
            if (matched[1] == 'WE') {
              days.push(3);
            }
            if (matched[1] == 'TH') {
              days.push(4);
            }
            if (matched[1] == 'FR') {
              days.push(5);
            }
          }
        });

        data.map((e, i) => {
          e.day = days[i];
        });

        return data;
      };

      const icsFile = res.uri;
      const cacheFilePath = FileSystem.documentDirectory.concat(
        'jsonizedIcs.json',
      );

      const fileInfo = await FileSystem.getInfoAsync(cacheFilePath);
      if (fileInfo.exists) {
        await FileSystem.deleteAsync(cacheFilePath, {
          idempotent: true,
        });
      }

      const string = await convert(icsFile);
      await FileSystem.writeAsStringAsync(
        cacheFilePath,
        JSON.stringify(string),
      );

      await props.loadSchedule();
    } catch (err) {
      if (DocumentPicker.isCancel) {
        return;
      } else {
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  return (
    <View>
      <Pressable
        android_ripple={{color: 'rgb(255,215,0)', borderless: 'true'}}
        onPress={() => {
          selectOneFile();
        }}>
        <Text style={props.style}>Import Schedule (.ICS)</Text>
      </Pressable>
    </View>
  );
};

export default ChooseiCal;
