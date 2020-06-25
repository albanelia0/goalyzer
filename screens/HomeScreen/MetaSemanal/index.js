import React, {useState, useEffect} from 'react';

import Input from '../../../components/Input'

import {styles} from './styles'
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
  KeyboardAvoidingView
} from 'react-native';
import CheckDays from '../../../components/CheckDays'

export default function MetaSemanal({navigation}) {
  const [value, setValue]= useState('')
  const [arrayAllGoal, setArrayAllGoal] = useState([])
  const [arrayAllTask, setArrayAllTask] = useState([])

  useEffect(() => {
    AsyncStorage.getItem('allGoalWeek').then(json => {
      const parsedJson = JSON.parse(json) || []
      setArrayAllGoal(parsedJson)
    })

  }, [])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      AsyncStorage.getItem('taskForDay').then(json => {
        const parsedJson = JSON.parse(json) || []
        setArrayAllTask(parsedJson)
      })
    })
    return unsubscribe
  }, [navigation])

  const onInputSubmit = () => {
    if (value !== '') {
      setArrayAllGoal(prev => {
        const arrayWithNewItem = [...prev, value]
        AsyncStorage.setItem('allGoalWeek', JSON.stringify(arrayWithNewItem))
        return arrayWithNewItem
      })
      setValue('')
    } else return
  }

  const deleteGoal = (index) => {
    const newArray = arrayAllGoal.filter((_, theIndex) => theIndex !== index)
    AsyncStorage.setItem('allGoalWeek', JSON.stringify(newArray))
    setArrayAllGoal(newArray)
  }

  const dayComplete = () => {
    const goalAlmostSuccess = arrayAllTask.some(dayStatus => dayStatus.success === true)
    const greenStatus = arrayAllTask.every(dayStatus => dayStatus.success === true)
    const redStatus = arrayAllTask.every(dayStatus => dayStatus.failed === true)
    const goalAlmostRed = arrayAllTask.some(item => item.failed && !item.success)
    const defaultStatus = arrayAllTask.every(dayStatus => !dayStatus.success && !dayStatus.failed)

    if (greenStatus) {
      return 'greenStatus'
    } else if(goalAlmostSuccess) {
      return 'goalAlmostSuccess'
    } else if(redStatus) {
      return 'redStatus'
    }else if(goalAlmostRed){
      return 'goalAlmostRed'
    } else if(defaultStatus){
      return 'default'
    }
  }

  return (
    <KeyboardAvoidingView>
      <ScrollView style={styles.allWeekContainer} keyboardShouldPersistTaps='handled'>
        <View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Meta Semanal</Text>
            <Text>🔔</Text>
          </View>
         <CheckDays dayComplete={dayComplete()} />
         <Input value={value} onPress={onInputSubmit} onChangeText={text => setValue(text)}/>
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
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
