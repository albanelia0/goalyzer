import React, {useState, useEffect} from 'react'
import {styles} from './styles'
import isSmallDevice from '../../constants/Layout'
import { Text, View,TouchableOpacity } from 'react-native';

const GoalDay = ({
  goalDay,
  onSuccess,
  onFailed,
  onDelete,
  status
}) => {
  const getStatusStyle = () => {
    switch (status) {
      case 'success':
        return styles.wrapperStatusSuccess
      case 'failed':
        return styles.wrapperStatusFailed
      default:
        return {}
    }
  }

  return (
    <View style={{...styles.wrapper, ...getStatusStyle()}}>
      <View style={styles.goalDayContainer}>
        <Text style={styles.textGoal}>{goalDay}</Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={onSuccess} style={styles.done}>
            <Text style={styles.iconText}>✔️</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onFailed} style={styles.failed}>
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
