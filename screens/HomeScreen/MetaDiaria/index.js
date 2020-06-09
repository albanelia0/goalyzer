import React, {useState, useEffect} from 'react';

import {styles} from './styles'
import {
  ScrollView,
  SafeAreaView,
  Text,
  View,
  KeyboardAvoidingView,
  AsyncStorage,
  TextInput,
} from 'react-native';
import Layout from '../../../constants/Layout'
import GoalDay from '../../../components/GoalDay';

const weekDaysNames = ['Domingo','Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
const Day = new Date().getDay()
let currentDay = weekDaysNames[Day]

export default function MetaDiaria() {

  const [dailyGoalItem, setDailyGoalItem] = useState([])
  const [bellRemember, setBellRemember] = useState(false)

  useEffect(() => {
    AsyncStorage.getItem('allGoalWeek').then(json => {
      const parsedJson = JSON.parse(json) || []
      setDailyGoalItem(parsedJson)
    })
  },[dailyGoalItem] )

    return (
    <KeyboardAvoidingView behavior="position">
      <ScrollView style={styles.container} keyboardShouldPersistTaps='handled'>
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
          <Text style={styles.textForDay}>Cosas que hacer por día para cumplir la meta:</Text>
          <TextInput style={styles.inputTask}/>
            {dailyGoalItem.map((dailyGoal, i) => {
              return (
              <SafeAreaView style={{flex:1}}>
                <ScrollView>
                  <View key={i} style={styles.goalDayContainer}>
                    <GoalDay goalDay={dailyGoal} />
                  </View>
                </ScrollView>
              </SafeAreaView>
                )
              })}
      </ScrollView>
    </KeyboardAvoidingView>
    )
}
