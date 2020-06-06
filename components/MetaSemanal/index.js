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
import CheckDays from '../CheckDays'

export default function MetaSemanal() {
  const [value, setValue]= useState('')
  const [arrayAllGoal, setArrayAllGoal] = useState([])
  console.log('arrayAllGoal', arrayAllGoal)

  useEffect(() => {
    AsyncStorage.getItem('allGoalWeek').then(json => {
      const parsedJson = JSON.parse(json)
      setArrayAllGoal(parsedJson)
    })
  }, [])
  const onInputSubmit = () => {
    setArrayAllGoal(prev => {
      const arrayWithNewItem = [...prev, value]
      AsyncStorage.setItem('allGoalWeek', JSON.stringify(arrayWithNewItem))
      return arrayWithNewItem
    })
    setValue('')
  }

  return (
    <KeyboardAvoidingView behavior="position">
      <ScrollView keyboardShouldPersistTaps='handled'>
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
              <TouchableOpacity onPress={value !== '' && onInputSubmit}>
                <Text>Save</Text>
              </TouchableOpacity>
         </View>
            <View style={styles.goalContainer}>
              {arrayAllGoal && arrayAllGoal.map((goal, i) => (
                <Text style={styles.goalTitles} key={i}>☆ {goal}</Text>
              ))}
            </View>
          <Text style={styles.textForDay}>Cosas que hacer por día para cumplir la meta:</Text>
          <TextInput style={styles.inputTask}/>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
