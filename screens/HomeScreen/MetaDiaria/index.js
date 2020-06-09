import React, {useState, useEffect} from 'react';

import Input from '../../../components/Input'

import {styles} from './styles'
import {
  ScrollView,
  SafeAreaView,
  Text,
  View,
  KeyboardAvoidingView,
  AsyncStorage,
  TextInput,
  TouchableHighlight
} from 'react-native';
import Layout from '../../../constants/Layout'
import GoalDay from '../../../components/GoalDay';

const weekDaysNames = ['Domingo','Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
const Day = new Date().getDay()
let currentDay = weekDaysNames[Day]

export default function MetaDiaria() {

  const [dailyGoalItem, setDailyGoalItem] = useState([])
  const [valueInput, setValueInput] = useState('')
  const [bellRemember, setBellRemember] = useState(false)

  useEffect(() => {
    AsyncStorage.getItem('taskForDay').then(json => {
      const parsedJson = JSON.parse(json) || []
      setDailyGoalItem(parsedJson)
    })
  },[] )

  const onSaveTaskInput = () => {
    if (valueInput !== '') {
      setDailyGoalItem(prev => {
        const arrayWithNewItem = [...prev, valueInput]
        AsyncStorage.setItem('taskForDay', JSON.stringify(arrayWithNewItem))
        return arrayWithNewItem
      })
      setValueInput('')
    } else return
  }

  const onPressIconDeleteTask = (item) => {
    const newArray = dailyGoalItem.filter(itemForDelete => itemForDelete !== item)
    AsyncStorage.setItem('taskForDay', JSON.stringify(newArray))
    setDailyGoalItem(newArray)
  }

    return (
    <KeyboardAvoidingView >
      <ScrollView style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Meta Diaria</Text>
          <Text onPress={() => setBellRemember(!bellRemember)}>🔔</Text>
        </View>
        <View style={styles.containerCurrentDay}>
          <Text style={
            Layout.isSmallDevice ?
            styles.smallCurrentTitleDay:
            styles.currentTitleDay}>
              {currentDay}
          </Text>
        </View>
          <Text style={styles.textForDay}>Que hacer hoy para cumplir mis metas:</Text>
         <Input value={valueInput} onPress={onSaveTaskInput} onChangeText={(text) => setValueInput(text)}/>
        {dailyGoalItem && dailyGoalItem.map((dailyGoal, i) => {
          return (
            <View key={i}>
              <SafeAreaView style={{flex:1}}>
                <ScrollView>
                  <View style={styles.goalDayContainer}>
                    <GoalDay goalDay={dailyGoal} onDelete={() => onPressIconDeleteTask(dailyGoal)} />
                  </View>
                </ScrollView>
              </SafeAreaView>
            </View>
            )
          })}
      </ScrollView>
    </KeyboardAvoidingView>
    )
}
