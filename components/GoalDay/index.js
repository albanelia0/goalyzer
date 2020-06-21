import React from 'react'
import {styles} from './styles'
import mobileScreen from '../../constants/Layout'
import { Text, View,TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

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
  const isSmallScreen = () => mobileScreen.isSmallDevice && {minWidth: 282}

  return (
    <View style={{...styles.wrapper, ...getStatusStyle()}}>
      <View style={styles.goalDayContainer}>
        <Text style={{...styles.textGoal, ...isSmallScreen()}}>{goalDay}</Text>
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
