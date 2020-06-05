import React from 'react'
import {styles} from './styles'
import { Image, Button,ScrollView, Text, TouchableOpacity, View } from 'react-native';

const Days = ["L", "M", "X", "J", "V", "S", "D"]
const CheckDays = () => {

  return (
    <View style={styles.container}>
      <View style={styles.days}>
        {Days.map((day, i) =><Text key={i} style={styles.daysList}>{day}</Text>)}
      </View>
      <View style={styles.squareContainer}>
        <View style={styles.squarecontent}/>
        <View style={styles.squarecontent}/>
        <View style={styles.squarecontent}/>
        <View style={styles.squarecontent}/>
        <View style={styles.squarecontent}/>
        <View style={styles.squarecontent}/>
        <View style={styles.squarecontent}/>
      </View>
    </View>
  )
}

export default CheckDays
