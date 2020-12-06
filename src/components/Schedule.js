import React from 'react';
import {View, Text, ScrollView, StyleSheet, Pressable} from 'react-native';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

const Schedule = (props) => {
  var schedule = props.schedule.sort(function (a, b) {
    if (a.day < b.day) {
      return -1;
    }
    if (a.day > b.day) {
      return 1;
    }

    return 0;
  });

  var mon = [];
  var tue = [];
  var wed = [];
  var thu = [];
  var fri = [];

  schedule.map((e) => {
    if (e.day == 1) {
      var type;
      if (
        e.summary.split('(')[1].toUpperCase().includes('Cvičenie'.toUpperCase())
      ) {
        type = 'Cvičenie';
      } else if (
        e.summary
          .split('(')[1]
          .toUpperCase()
          .includes('Prednáška'.toUpperCase())
      ) {
        type = 'Prednáška';
      } else if (
        e.summary.split('(')[1].toUpperCase().includes('Seminár'.toUpperCase())
      ) {
        type = 'Seminár';
      }

      const startDate = e.startDate
        .split('T')[1]
        .slice(0, 2)
        .concat(':')
        .concat(e.startDate.split('T')[1].slice(2, 4));
      const endDate = e.endDate
        .split('T')[1]
        .slice(0, 2)
        .concat(':')
        .concat(e.endDate.split('T')[1].slice(2, 4));
      const date = '['
        .concat(startDate)
        .concat(' - ')
        .concat(endDate)
        .concat(']');
      var roomAndBuilding = e.location.split('(');
      roomAndBuilding = roomAndBuilding[roomAndBuilding.length - 1].slice(
        0,
        roomAndBuilding[roomAndBuilding.length - 1].length - 1,
      );
      const subject = e.summary.split('(')[0];

      mon.push(
        <Pressable
          onPress={() => {
            props.setMarkerName(roomAndBuilding);
            props.setMarkerNameFromSchedule(true);
            props.navigation.navigate('Home');
          }}
          android_ripple={{color: 'rgb(255,215,0)', borderless: 'true'}}>
          <View style={styles.predmet}>
            <Text
              key={uuidv4()}
              style={{fontWeight: 'bold', color: 'rgb(255,215,0)'}}>
              {subject}
            </Text>
            <Text
              key={uuidv4()}
              style={{fontWeight: 'bold', color: 'rgb(255,215,0)'}}>
              ({type})
            </Text>
            <Text key={uuidv4()} style={styles.subject}>
              Od: {startDate}
            </Text>
            <Text key={uuidv4()} style={styles.subject}>
              Do: {endDate}
            </Text>
            <Text key={uuidv4()} style={styles.subject}>
              Učebňa: {roomAndBuilding}
            </Text>
          </View>
        </Pressable>,
      );
    }
    if (e.day == 2) {
      var type;
      if (
        e.summary.split('(')[1].toUpperCase().includes('Cvičenie'.toUpperCase())
      ) {
        type = 'Cvičenie';
      } else if (
        e.summary
          .split('(')[1]
          .toUpperCase()
          .includes('Prednáška'.toUpperCase())
      ) {
        type = 'Prednáška';
      } else if (
        e.summary.split('(')[1].toUpperCase().includes('Seminár'.toUpperCase())
      ) {
        type = 'Seminár';
      }

      const startDate = e.startDate
        .split('T')[1]
        .slice(0, 2)
        .concat(':')
        .concat(e.startDate.split('T')[1].slice(2, 4));
      const endDate = e.endDate
        .split('T')[1]
        .slice(0, 2)
        .concat(':')
        .concat(e.endDate.split('T')[1].slice(2, 4));
      const date = '['
        .concat(startDate)
        .concat(' - ')
        .concat(endDate)
        .concat(']');
      var roomAndBuilding = e.location.split('(');
      roomAndBuilding = roomAndBuilding[roomAndBuilding.length - 1].slice(
        0,
        roomAndBuilding[roomAndBuilding.length - 1].length - 1,
      );
      const subject = e.summary.split('(')[0];

      tue.push(
        <Pressable
          onPress={() => {
            props.setMarkerName(roomAndBuilding);
            props.setMarkerNameFromSchedule(true);
            props.navigation.navigate('Home');
          }}
          android_ripple={{color: 'rgb(255,215,0)', borderless: 'true'}}>
          <View style={styles.predmet}>
            <Text
              key={uuidv4()}
              style={{fontWeight: 'bold', color: 'rgb(255,215,0)'}}>
              {subject}
            </Text>
            <Text
              key={uuidv4()}
              style={{fontWeight: 'bold', color: 'rgb(255,215,0)'}}>
              ({type})
            </Text>
            <Text key={uuidv4()} style={styles.subject}>
              Od: {startDate}
            </Text>
            <Text key={uuidv4()} style={styles.subject}>
              Do: {endDate}
            </Text>
            <Text key={uuidv4()} style={styles.subject}>
              Učebňa: {roomAndBuilding}
            </Text>
          </View>
        </Pressable>,
      );
    }
    if (e.day == 3) {
      var type;
      if (
        e.summary.split('(')[1].toUpperCase().includes('Cvičenie'.toUpperCase())
      ) {
        type = 'Cvičenie';
      } else if (
        e.summary
          .split('(')[1]
          .toUpperCase()
          .includes('Prednáška'.toUpperCase())
      ) {
        type = 'Prednáška';
      } else if (
        e.summary.split('(')[1].toUpperCase().includes('Seminár'.toUpperCase())
      ) {
        type = 'Seminár';
      }

      const startDate = e.startDate
        .split('T')[1]
        .slice(0, 2)
        .concat(':')
        .concat(e.startDate.split('T')[1].slice(2, 4));
      const endDate = e.endDate
        .split('T')[1]
        .slice(0, 2)
        .concat(':')
        .concat(e.endDate.split('T')[1].slice(2, 4));
      const date = '['
        .concat(startDate)
        .concat(' - ')
        .concat(endDate)
        .concat(']');
      var roomAndBuilding = e.location.split('(');
      roomAndBuilding = roomAndBuilding[roomAndBuilding.length - 1].slice(
        0,
        roomAndBuilding[roomAndBuilding.length - 1].length - 1,
      );
      const subject = e.summary.split('(')[0];

      wed.push(
        <Pressable
          onPress={() => {
            props.setMarkerName(roomAndBuilding);
            props.setMarkerNameFromSchedule(true);
            props.navigation.navigate('Home');
          }}
          android_ripple={{color: 'rgb(255,215,0)', borderless: 'true'}}>
          <View style={styles.predmet}>
            <Text
              key={uuidv4()}
              style={{fontWeight: 'bold', color: 'rgb(255,215,0)'}}>
              {subject}
            </Text>
            <Text
              key={uuidv4()}
              style={{fontWeight: 'bold', color: 'rgb(255,215,0)'}}>
              ({type})
            </Text>
            <Text key={uuidv4()} style={styles.subject}>
              Od: {startDate}
            </Text>
            <Text key={uuidv4()} style={styles.subject}>
              Do: {endDate}
            </Text>
            <Text key={uuidv4()} style={styles.subject}>
              Učebňa: {roomAndBuilding}
            </Text>
          </View>
        </Pressable>,
      );
    }
    if (e.day == 4) {
      var type;
      if (
        e.summary.split('(')[1].toUpperCase().includes('Cvičenie'.toUpperCase())
      ) {
        type = 'Cvičenie';
      } else if (
        e.summary
          .split('(')[1]
          .toUpperCase()
          .includes('Prednáška'.toUpperCase())
      ) {
        type = 'Prednáška';
      } else if (
        e.summary.split('(')[1].toUpperCase().includes('Seminár'.toUpperCase())
      ) {
        type = 'Seminár';
      }

      const startDate = e.startDate
        .split('T')[1]
        .slice(0, 2)
        .concat(':')
        .concat(e.startDate.split('T')[1].slice(2, 4));
      const endDate = e.endDate
        .split('T')[1]
        .slice(0, 2)
        .concat(':')
        .concat(e.endDate.split('T')[1].slice(2, 4));
      const date = '['
        .concat(startDate)
        .concat(' - ')
        .concat(endDate)
        .concat(']');
      var roomAndBuilding = e.location.split('(');
      roomAndBuilding = roomAndBuilding[roomAndBuilding.length - 1].slice(
        0,
        roomAndBuilding[roomAndBuilding.length - 1].length - 1,
      );
      const subject = e.summary.split('(')[0];

      thu.push(
        <Pressable
          onPress={() => {
            props.setMarkerName(roomAndBuilding);
            props.setMarkerNameFromSchedule(true);
            props.navigation.navigate('Home');
          }}
          android_ripple={{color: 'rgb(255,215,0)', borderless: 'true'}}>
          <View style={styles.predmet}>
            <Text
              key={uuidv4()}
              style={{fontWeight: 'bold', color: 'rgb(255,215,0)'}}>
              {subject}
            </Text>
            <Text
              key={uuidv4()}
              style={{fontWeight: 'bold', color: 'rgb(255,215,0)'}}>
              ({type})
            </Text>
            <Text key={uuidv4()} style={styles.subject}>
              Od: {startDate}
            </Text>
            <Text key={uuidv4()} style={styles.subject}>
              Do: {endDate}
            </Text>
            <Text key={uuidv4()} style={styles.subject}>
              Učebňa: {roomAndBuilding}
            </Text>
          </View>
        </Pressable>,
      );
    }
    if (e.day == 5) {
      var type;
      if (
        e.summary.split('(')[1].toUpperCase().includes('Cvičenie'.toUpperCase())
      ) {
        type = 'Cvičenie';
      } else if (
        e.summary
          .split('(')[1]
          .toUpperCase()
          .includes('Prednáška'.toUpperCase())
      ) {
        type = 'Prednáška';
      } else if (
        e.summary.split('(')[1].toUpperCase().includes('Seminár'.toUpperCase())
      ) {
        type = 'Seminár';
      }

      const startDate = e.startDate
        .split('T')[1]
        .slice(0, 2)
        .concat(':')
        .concat(e.startDate.split('T')[1].slice(2, 4));
      const endDate = e.endDate
        .split('T')[1]
        .slice(0, 2)
        .concat(':')
        .concat(e.endDate.split('T')[1].slice(2, 4));
      const date = '['
        .concat(startDate)
        .concat(' - ')
        .concat(endDate)
        .concat(']');
      var roomAndBuilding = e.location.split('(');
      roomAndBuilding = roomAndBuilding[roomAndBuilding.length - 1].slice(
        0,
        roomAndBuilding[roomAndBuilding.length - 1].length - 1,
      );
      const subject = e.summary.split('(')[0];

      fri.push(
        <Pressable
          onPress={() => {
            props.setMarkerName(roomAndBuilding);
            props.setMarkerNameFromSchedule(true);
            props.navigation.navigate('Home');
          }}
          android_ripple={{color: 'rgb(255,215,0)', borderless: 'true'}}>
          <View style={styles.predmet}>
            <Text
              key={uuidv4()}
              style={{fontWeight: 'bold', color: 'rgb(255,215,0)'}}>
              {subject}
            </Text>
            <Text
              key={uuidv4()}
              style={{fontWeight: 'bold', color: 'rgb(255,215,0)'}}>
              ({type})
            </Text>
            <Text key={uuidv4()} style={styles.subject}>
              Od: {startDate}
            </Text>
            <Text key={uuidv4()} style={styles.subject}>
              Do: {endDate}
            </Text>
            <Text key={uuidv4()} style={styles.subject}>
              Učebňa: {roomAndBuilding}
            </Text>
          </View>
        </Pressable>,
      );
    }
  });

  var scheduleToRender = [];
  if (mon.length != 0) {
    scheduleToRender.push(
      <View style={styles.row}>
        <View style={styles.col}>
          <View style={styles.day}>
            <Text key={uuidv4()} style={styles.dayText}>
              Monday
            </Text>
          </View>
          <View style={{padding: '2%'}}>{mon}</View>
        </View>
      </View>,
    );
  }

  if (tue.length != 0) {
    scheduleToRender.push(
      <View style={styles.row}>
        <View style={styles.col}>
          <View style={styles.day}>
            <Text key={uuidv4()} style={styles.dayText}>
              Tuesday
            </Text>
          </View>
          <View style={{padding: '2%'}}>{tue}</View>
        </View>
      </View>,
    );
  }

  if (wed.length != 0) {
    scheduleToRender.push(
      <View style={styles.row}>
        <View style={styles.col}>
          <View style={styles.day}>
            <Text key={uuidv4()} style={styles.dayText}>
              Wednesday
            </Text>
          </View>
          <View style={{padding: '2%'}}>{wed}</View>
        </View>
      </View>,
    );
  }

  if (thu.length != 0) {
    scheduleToRender.push(
      <View style={styles.row}>
        <View style={styles.col}>
          <View style={styles.day}>
            <Text key={uuidv4()} style={styles.dayText}>
              Thursday
            </Text>
          </View>
          <View style={{padding: '2%'}}>{thu}</View>
        </View>
      </View>,
    );
  }

  if (fri.length != 0) {
    scheduleToRender.push(
      <View style={styles.row}>
        <View style={styles.col}>
          <View style={styles.day}>
            <Text key={uuidv4()} style={styles.dayText}>
              Friday
            </Text>
          </View>
          <View style={{padding: '2%'}}>{fri}</View>
        </View>
      </View>,
    );
  }

  return <ScrollView style={styles.container}>{scheduleToRender}</ScrollView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'black',
    alignContent: 'center',
  },
  row: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  subject: {
    color: 'rgb(255,215,0)',
  },
  predmet: {
    padding: '3%',
    borderWidth: 1,
    borderColor: 'rgb(255,215,0)',
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 5
  },
  day: {
    backgroundColor: 'rgb(255,215,0)',
    padding: '2%',
  },
  dayText: {
    fontSize: 30,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  col: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
});

export default Schedule;
