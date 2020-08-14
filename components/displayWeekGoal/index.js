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
      {arrayAllGoal.length
        ? arrayAllGoal.map((goal, i) => (
          <View key={i} style={styles.goalItem}>
            <Text style={styles.goalTitles}>☆ {goal}</Text>
            <TouchableOpacity onPress={() => deleteGoal(i)}>
              <Text style={styles.deleteGoal}> 🗑</Text>
            </TouchableOpacity>
          </View>
          ))
        : <Text style={{fontSize: 20, padding: 10, color: '#95a792'}}>
            Aquí se mostrarán tus metas. A por ellas!💪🏼
          </Text>}
    </View>
  )
}

export default DisplayWeekGoal
