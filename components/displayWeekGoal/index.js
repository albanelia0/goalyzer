import React from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import {styles} from './styles'

const DisplayWeekGoal = ({arrayAllGoal, setArrayAllGoal, storage}) => {
  const deleteGoal = (index) => {
    const newArray = arrayAllGoal.filter((_, theIndex) => theIndex !== index)
    AsyncStorage.setItem(storage, JSON.stringify(newArray))
    setArrayAllGoal(newArray)
  }

  return (
    <View style={styles.goalContainer}>
      {arrayAllGoal && arrayAllGoal.map((goal, i) => (
        <View key={i} style={styles.goalItem}>
          <Text style={styles.goalTitles}>☆ {goal}</Text>
          <TouchableOpacity onPress={() => deleteGoal(i)}>
            <Text style={styles.deleteGoal}> 🗑</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  )
}

export default DisplayWeekGoal
