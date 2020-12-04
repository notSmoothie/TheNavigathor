import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
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
      var add;
      if (e.summary.split('(')[1].toUpperCase().includes("Cvičenie".toUpperCase())) {
        add = " - CV"
      } else if (e.summary.split('(')[1].toUpperCase().includes("Prednáška".toUpperCase())) {
        add = " - P"
      } else if (e.summary.split('(')[1].toUpperCase().includes("Seminár".toUpperCase())) {
        add = " - S"
      }

      const startDate = e.startDate.split('T')[1].slice(0, 2).concat(':').concat(e.startDate.split('T')[1].slice(2, 4))
      const endDate = e.endDate.split('T')[1].slice(0, 2).concat(':').concat(e.endDate.split('T')[1].slice(2, 4))
      const date = '['.concat(startDate).concat(" - ").concat(endDate).concat("] ")
      var roomAndBuilding = e.location.split('(')
      roomAndBuilding = roomAndBuilding[roomAndBuilding.length - 1].slice(0, roomAndBuilding[roomAndBuilding.length - 1].length - 1)

      mon.push(<Text key={uuidv4()} style={styles.subject}>{date.concat(e.summary.split('(')[0]).concat(add).concat(' (').concat(roomAndBuilding).concat(")")}</Text>);
    }
    if (e.day == 2) {
      var add;
      if (e.summary.split('(')[1].toUpperCase().includes("Cvičenie".toUpperCase())) {
        add = " - CV"
      } else if (e.summary.split('(')[1].toUpperCase().includes("Prednáška".toUpperCase())) {
        add = " - P"
      } else if (e.summary.split('(')[1].toUpperCase().includes("Seminár".toUpperCase())) {
        add = " - S"
      }

      const startDate = e.startDate.split('T')[1].slice(0, 2).concat(':').concat(e.startDate.split('T')[1].slice(2, 4))
      const endDate = e.endDate.split('T')[1].slice(0, 2).concat(':').concat(e.endDate.split('T')[1].slice(2, 4))
      const date = '['.concat(startDate).concat(" - ").concat(endDate).concat("] ")
      var roomAndBuilding = e.location.split('(')
      roomAndBuilding = roomAndBuilding[roomAndBuilding.length - 1].slice(0, roomAndBuilding[roomAndBuilding.length - 1].length - 1)

      tue.push(<Text key={uuidv4()} style={styles.subject}>{date.concat(e.summary.split('(')[0]).concat(add).concat(' (').concat(roomAndBuilding).concat(")")}</Text>);
    }
    if (e.day == 3) {
      var add;
      if (e.summary.split('(')[1].toUpperCase().includes("Cvičenie".toUpperCase())) {
        add = " - CV"
      } else if (e.summary.split('(')[1].toUpperCase().includes("Prednáška".toUpperCase())) {
        add = " - P"
      } else if (e.summary.split('(')[1].toUpperCase().includes("Seminár".toUpperCase())) {
        add = " - S"
      }
      
      const startDate = e.startDate.split('T')[1].slice(0, 2).concat(':').concat(e.startDate.split('T')[1].slice(2, 4))
      const endDate = e.endDate.split('T')[1].slice(0, 2).concat(':').concat(e.endDate.split('T')[1].slice(2, 4))
      const date = '['.concat(startDate).concat(" - ").concat(endDate).concat("] ")

      var roomAndBuilding = e.location.split('(')
      roomAndBuilding = roomAndBuilding[roomAndBuilding.length - 1].slice(0, roomAndBuilding[roomAndBuilding.length - 1].length - 1)

      wed.push(<Text key={uuidv4()} style={styles.subject}>{date.concat(e.summary.split('(')[0]).concat(add).concat(' (').concat(roomAndBuilding).concat(")")}</Text>);
    }
    if (e.day == 4) {
      var add;
      if (e.summary.split('(')[1].toUpperCase().includes("Cvičenie".toUpperCase())) {
        add = " - CV"
      } else if (e.summary.split('(')[1].toUpperCase().includes("Prednáška".toUpperCase())) {
        add = " - P"
      } else if (e.summary.split('(')[1].toUpperCase().includes("Seminár".toUpperCase())) {
        add = " - S"
      }
      
      const startDate = e.startDate.split('T')[1].slice(0, 2).concat(':').concat(e.startDate.split('T')[1].slice(2, 4))
      const endDate = e.endDate.split('T')[1].slice(0, 2).concat(':').concat(e.endDate.split('T')[1].slice(2, 4))
      const date = '['.concat(startDate).concat(" - ").concat(endDate).concat("] ")

      var roomAndBuilding = e.location.split('(')
      roomAndBuilding = roomAndBuilding[roomAndBuilding.length - 1].slice(0, roomAndBuilding[roomAndBuilding.length - 1].length - 1)

      thu.push(<Text key={uuidv4()} style={styles.subject}>{date.concat(e.summary.split('(')[0]).concat(add).concat(' (').concat(roomAndBuilding).concat(")")}</Text>);
    }
    if (e.day == 5) {
      var add;  function checkAdd() {
    
      }
      if (e.summary.split('(')[1].toUpperCase().includes("Cvičenie".toUpperCase())) {
        add = " - CV"
      } else if (e.summary.split('(')[1].toUpperCase().includes("Prednáška".toUpperCase())) {
        add = " - P"
      } else if (e.summary.split('(')[1].toUpperCase().includes("Seminár".toUpperCase())) {
        add = " - S"
      }
      
      const startDate = e.startDate.split('T')[1].slice(0, 2).concat(':').concat(e.startDate.split('T')[1].slice(2, 4))
      const endDate = e.endDate.split('T')[1].slice(0, 2).concat(':').concat(e.endDate.split('T')[1].slice(2, 4))
      const date = '['.concat(startDate).concat(" - ").concat(endDate).concat("] ")

      var roomAndBuilding = e.location.split('(')
      roomAndBuilding = roomAndBuilding[roomAndBuilding.length - 1].slice(0, roomAndBuilding[roomAndBuilding.length - 1].length - 1)

      fri.push(<Text key={uuidv4()} style={styles.subject}>{date.concat(e.summary.split('(')[0]).concat(add).concat(' (').concat(roomAndBuilding).concat(")")}</Text>);
    }
  });

  var scheduleToRender = [];
  if (mon.length != 0) {
    scheduleToRender.push(
      <View style={styles.row}>
        <View style={styles.col}>
          <Text key={uuidv4()} style={{fontSize: 20}}>Monday</Text>
          {mon}
        </View>
      </View>,
    );
  }

  if (tue.length != 0) {
    scheduleToRender.push(
      <View style={styles.row}>
        <View style={styles.col}>
          <Text key={uuidv4()} style={{fontSize: 20}}>Tuesday</Text>
          {tue}
        </View>
      </View>,
    );
  }

  if (wed.length != 0) {
    scheduleToRender.push(
      <View style={styles.row}>
        <View style={styles.col}>
          <Text key={uuidv4()} style={{fontSize: 20}}>Wednesday</Text>
          {wed}
        </View>
      </View>,
    );
  }

  if (thu.length != 0) {
    scheduleToRender.push(
      <View style={styles.row}>
        <View style={styles.col}>
          <Text key={uuidv4()} style={{fontSize: 20}}>Thursday</Text>
          {thu}
        </View>
      </View>,
    );
  }

  if (fri.length != 0) {
    scheduleToRender.push(
      <View style={styles.row}>
        <View style={styles.col}>
          <Text key={uuidv4()} style={{fontSize: 20}}>Friday</Text>
          {fri}
        </View>
      </View>,
    );
  }

  return <View style={styles.container}>{scheduleToRender}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  row: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  col: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
});

export default Schedule;
