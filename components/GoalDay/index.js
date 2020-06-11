import React from 'react'
import {styles} from './styles'
import isSmallDevice from '../../constants/Layout'
import { Text, View,TouchableOpacity } from 'react-native';

const GoalDay = ({
  goalDay,
  onDelete,
  onSuccess,
  successStyle
}) => {
  return (
    <View style={successStyle ? styles.success : styles.wrapper}>
      <View style={styles.goalDayContainer}>
        <Text style={styles.textGoal}>{goalDay}</Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={onSuccess} style={styles.done}>
            <Text style={styles.iconText}>✔️</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.failed}>
            <Text style={styles.iconText}>𝖷</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete} style={styles.deleted}>
            <Text style={styles.iconText}>🗑</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default GoalDay
