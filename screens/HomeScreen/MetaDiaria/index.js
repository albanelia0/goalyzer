import React, {useState, useEffect} from 'react';

import Input from '../../../components/Input'
import DisplayAllGoal from '../../../components/displayAllGoal'
import {styles} from './styles'
import {
  ScrollView,
  SafeAreaView,
  Text,
  View,
  KeyboardAvoidingView,
  AsyncStorage,
} from 'react-native';

import Layout from '../../../constants/Layout'
import changeWeek from '../../../handlers/changeWeek'
import changeDay from '../../../handlers/changeDay';
import useIsMountedRef from '../../../hooks/useMounted'
const weekDaysNames = ['Domingo','Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
const Day = new Date().getDay()
let currentDay = weekDaysNames[Day]

export default function MetaDiaria() {

  const [dailyTaskItem, setDailyTaskItem] = useState([])
  const [valueInput, setValueInput] = useState('')
  const [bellRemember, setBellRemember] = useState(false)
  const [previousDays, setPreviousDays] = useState()
  const [isDayChanged, setIsDayChanged] = useState(currentDay)
  const isMountedRef = useIsMountedRef();
  const debugSetter = (setter, x, where) => {
    setter(prev => {
      console.log(`[MetaDiaria:] -> ${where}`)
      return typeof x === 'function' ? x(prev) : x
    })
  }

  useEffect(() => {

    if (isMountedRef.current && Day === 0) {
      setPreviousDays(weekDaysNames[6].toString())
    } else {
      setPreviousDays(weekDaysNames[Day - 1].toString())
    }
    AsyncStorage.getItem('taskForDay').then(json => {
      const parsedJson = JSON.parse(json) || []
      if (isMountedRef.current) {
        debugSetter(setDailyTaskItem, parsedJson, 'L44')
      }
    })
    AsyncStorage.getItem('lastUsedDay').then(day => {
      AsyncStorage.setItem('lastUsedDay', currentDay)
      if (isMountedRef.current) {
        day !== undefined && debugSetter(setIsDayChanged, day, 'L48')
      }
    })
  },[isMountedRef])
  useEffect(() => {
    if (isMountedRef.current && currentDay !== isDayChanged) {
      changeDay({previousDays,setDailyTaskItem})
      changeWeek(currentDay)
    }
    return () => ac.abort();
  },[isDayChanged,changeDay,changeWeek, isMountedRef])

  const onSaveTaskInput = () => {
    if (valueInput !== '') {
      setDailyTaskItem(prev => {
        const arrayWithNewItem = [...prev, { name: valueInput, success: false, failed: false}]
        AsyncStorage.setItem('taskForDay', JSON.stringify(arrayWithNewItem))
        return arrayWithNewItem
      })
      setValueInput('')
    } else return
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
          <Input
            value={valueInput}
            onPress={onSaveTaskInput}
            onChangeText={(text) => setValueInput(text)}
            taskToCreate="Task"
          />
          <DisplayAllGoal dailyTaskItem={dailyTaskItem} setDailyTaskItem={setDailyTaskItem} storage='taskForDay'/>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
