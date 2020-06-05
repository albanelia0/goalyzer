import React from 'react'
import {styles} from './styles'
import { Image, Button,ScrollView, Text, TouchableOpacity, View } from 'react-native';

const Days = ["L", "M", "X", "J", "V", "S", "D"]
const CheckDays = () => {

  return (
    <View style={styles.container}>
      {Days.map(day =><Text style={styles.list}>{day}</Text>)}
    </View>
  )
}

export default CheckDays
