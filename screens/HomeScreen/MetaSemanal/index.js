import React, {useState, useEffect} from 'react';

import {styles} from './styles'
import {
  ScrollView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  AsyncStorage,
  KeyboardAvoidingView
} from 'react-native';
import CheckDays from '../../../components/CheckDays'

export default function MetaSemanal() {
  const [value, setValue]= useState('')
  const [arrayAllGoal, setArrayAllGoal] = useState([])

  useEffect(() => {
    AsyncStorage.getItem('allGoalWeek').then(json => {
      const parsedJson = JSON.parse(json) || []
      setArrayAllGoal(parsedJson)
    })
  }, [])

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

  const deleteGoal = goal => {
    const newArray = arrayAllGoal.filter(isGoal => isGoal !== goal)
    AsyncStorage.setItem('allGoalWeek', JSON.stringify(newArray))
    setArrayAllGoal(newArray)
  }
  return (
    <KeyboardAvoidingView behavior="position">
      <ScrollView style={styles.allWeekContainer} keyboardShouldPersistTaps='handled'>
        <View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Meta Semanal</Text>
            <Text>🔔</Text>
          </View>
         <CheckDays/>
         <View style={styles.inputContainer}>
           <View>
            <TextInput
              onChangeText={text => setValue(text)}
              style={styles.inputGoal}
              placeholder="Create your goal"
              value={value}
              />
           </View>
              <TouchableOpacity onPress={onInputSubmit}>
                <Text>Save</Text>
              </TouchableOpacity>
         </View>
          <View style={styles.goalContainer}>
            {arrayAllGoal && arrayAllGoal.map((goal, i) => (
              <View key={i} style={styles.goalItem}>
                <Text style={styles.goalTitles}>☆ {goal}</Text>
                <TouchableOpacity onPress={() => deleteGoal(goal)}>
                  <Text style={styles.deleteGoal}>🗑</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
          <Text style={styles.textForDay}>Cosas que hacer por día para cumplir la meta:</Text>
          <TextInput style={styles.inputTask}/>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
