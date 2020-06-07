import React from 'react'
import {styles} from './styles'
import isSmallDevice from '../../constants/Layout'
import { Text, View } from 'react-native';

const Days = ["L", "M", "X", "J", "V", "S", "D"]
const CheckDays = () => {

  if (isSmallDevice) {
    return (
      <View style={styles.container}>
        <View style={styles.days}>
          {Days.map((day, i) => {
            return (
              <View style={styles.squareContainer}>
                <Text key={i} style={styles.smallDaysList}>{day}</Text>
                <View style={styles.smallSquareContent}/>
              </View>
            )
          })}
        </View>
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.days}>
          {Days.map((day, i) => {
            return (
              <View style={styles.squareContainer}>
                <Text key={i} style={styles.daysList}>{day}</Text>
                <View style={styles.squareContainer}/>
              </View>
            )
          })}
        </View>
      </View>
    )
  }
}

export default CheckDays
