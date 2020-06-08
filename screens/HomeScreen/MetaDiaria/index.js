import React, {useState, useEffect} from 'react';

import {styles} from './styles'
import {
  ScrollView,
  Text,
  View,
  KeyboardAvoidingView,
  AsyncStorage
} from 'react-native';
import Layout from '../../../constants/Layout'
import GoalDay from '../../../components/GoalDay';

const weekDaysNames = ['Domingo','Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
const Day = new Date().getDay()
let currentDay = weekDaysNames[Day]

export default function MetaDiaria() {

  const [dayleGoalItem, setDailyGoalItem] = useState([])

  useEffect(() => {
    AsyncStorage.getItem('allGoalWeek').then(json => {
      const parsedJson = JSON.parse(json) || []
      setDailyGoalItem(parsedJson)
    })
  }, [])

    return (
    <KeyboardAvoidingView behavior="position">
      <ScrollView style={styles.container} keyboardShouldPersistTaps='handled'>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Meta Diaria</Text>
          <Text>🔔</Text>
        </View>
        <View>
          <Text style={
            Layout.isSmallDevice ?
            styles.smallCurrentTitleDay:
            styles.currentTitleDay}>
              {currentDay}
          </Text>
        </View>
        {dayleGoalItem.map((dailyGoal, i) => {
            return (
              <View key={i} style={styles.goalDayContainer}>
                <GoalDay goalDay={dailyGoal} />
              </View>
            )
          })}
      </ScrollView>
    </KeyboardAvoidingView>
    )
}
