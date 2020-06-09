import React from 'react'
import {styles} from './styles'
import isSmallDevice from '../../constants/Layout'
import { Text, View, TouchableHighlight, ScrollView, SafeAreaView } from 'react-native';

const GoalDay = ({goalDay}) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.goalDayContainer}>
        <Text style={styles.textGoal}>{goalDay}</Text>
        <View style={styles.iconContainer}>
          <TouchableHighlight style={styles.done}>
            <Text style={styles.iconText}>✔️</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.failed}>
            <Text style={styles.iconText}>𝖷</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.deleted}>
            <Text style={styles.iconText}>🗑</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  )
}

export default GoalDay
