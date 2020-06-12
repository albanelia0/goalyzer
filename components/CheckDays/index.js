import React from 'react'
import {styles} from './styles'
import isSmallDevice from '../../constants/Layout'
import { Text, View } from 'react-native';

const Days = ["L", "M", "X", "J", "V", "S", "D"]
const CheckDays = () => {

  return (
    <View style={styles.container}>
      <View style={styles.days}>
        {Days.map((day, i) => {
          return (
            <View key={i} style={styles.squareContainer}>
              <Text style={isSmallDevice ? styles.smallDaysList:daysList }>{day}</Text>
              <View style={isSmallDevice? styles.smallSquareContent: squareContainer}/>
            </View>
          )
        })}
      </View>
    </View>
  )
}

export default CheckDays
