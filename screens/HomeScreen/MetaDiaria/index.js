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
} from 'react-native';
import Layout from '../../../constants/Layout'
import GoalDay from '../../../components/GoalDay';

const weekDaysNames = ['Domingo','Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
const Day = new Date().getDay()
let currentDay = weekDaysNames[0]

export default function MetaDiaria() {

  const [dailyGoalItem, setDailyGoalItem] = useState([])
  const [valueInput, setValueInput] = useState('')
  const [bellRemember, setBellRemember] = useState(false)
  const [isDayChanged, setIsDayChanged] = useState(currentDay)
  const [previousDays, setPreviousDays] = useState(weekDaysNames[Day -1].toString())

  useEffect(() => {
    if (Day === 0) {
      setPreviousDays(weekDaysNames[6].toString())
    } else {
      setPreviousDays(weekDaysNames[Day - 1].toString())
    }
    AsyncStorage.getItem('taskForDay').then(json => {
      const parsedJson = JSON.parse(json) || []
      setDailyGoalItem(parsedJson)
    })
    AsyncStorage.getItem('lastUsedDay').then(day => {
      AsyncStorage.setItem('lastUsedDay', currentDay)
      day !== undefined && setIsDayChanged(day)
    })
  },[])

  useEffect(() => {

    if (isDayChanged !== currentDay) {

      setDailyGoalItem(() => {
        AsyncStorage.getItem('taskForDay').then(json => {
          const parsedAllPreviousTask = JSON.parse(json) || []
          AsyncStorage.getItem('allWeekDays').then(json => {
            const parsedJson = JSON.parse(json) || []

            const newArray = parsedJson.find(item => previousDays === 'Miércoles' && item.day === 'X')
            const newArrayFromTuesday = parsedJson.find(item => item.day === `${previousDays.charAt(0)}a`  && item.day !== 'X')
            const theOthers =
              parsedJson.find(item => item.day !== `${previousDays.charAt(0)}a` && item.day !== 'X' && item.day === previousDays.charAt(0))

            if (newArray) {
              const arrayFromPreviousDay = {...newArray, allTask: parsedAllPreviousTask}

                const newArrayWithAllTaskUpdatedFromPreviousDay = parsedJson.map(item => {
                  if (item.day === newArray.day) return arrayFromPreviousDay
                  return item
                })
                AsyncStorage.setItem('allWeekDays', JSON.stringify(newArrayWithAllTaskUpdatedFromPreviousDay))
            } else if(newArrayFromTuesday) {
              const arrayFromPreviousDay = {...newArrayFromTuesday, allTask: parsedAllPreviousTask}
              const newArrayWithAllTaskUpdatedFromPreviousDay = parsedJson.map(item => {
                  if (item.day === newArrayFromTuesday.day) return arrayFromPreviousDay
                  return item
                })
                AsyncStorage.setItem('allWeekDays', JSON.stringify(newArrayWithAllTaskUpdatedFromPreviousDay))
            } else if(theOthers) {
              const arrayFromPreviousDay = {...theOthers, allTask: parsedAllPreviousTask}
              const newArrayWithAllTaskUpdatedFromPreviousDay = parsedJson.map(item => {
                  if (item.day === theOthers.day) return arrayFromPreviousDay
                  return item
                })
                AsyncStorage.setItem('allWeekDays', JSON.stringify(newArrayWithAllTaskUpdatedFromPreviousDay))
            }
          })
          const tasksWithStatusFalse = parsedAllPreviousTask.map(task => {
            let newTasks
            if (task.success === true) {
              return newTasks = {...task, success: false}
            } else if(task.failed === true) {
              return newTasks = {...task, failed: false}
            } else return task
          })
          AsyncStorage.setItem('taskForDay', JSON.stringify(tasksWithStatusFalse))
          return tasksWithStatusFalse
        })
      })
    }
  },[])

  const onSaveTaskInput = () => {
    if (valueInput !== '') {
      setDailyGoalItem(prev => {
        const arrayWithNewItem = [...prev, { name: valueInput, success: false, failed: false}]
        AsyncStorage.setItem('taskForDay', JSON.stringify(arrayWithNewItem))
        return arrayWithNewItem
      })
      setValueInput('')
    } else return
  }

  const handleFromIconButtonTask = (item, action) => {
    if (action === 'delete') {
      const newArray = dailyGoalItem.filter(itemForDelete => itemForDelete.name !== item.name)
      AsyncStorage.setItem('taskForDay', JSON.stringify(newArray))
      setDailyGoalItem(newArray)
    } else if (action === 'success') {
      const existingObject = dailyGoalItem.find(obj => obj.name === item.name)
      const newObject = { ...existingObject, success: !existingObject.success, failed: false }
      setDailyGoalItem(prev => {
        const newArray = prev.map(obj => obj.name === item.name ? newObject : obj)
        AsyncStorage.setItem('taskForDay', JSON.stringify(newArray))
        return newArray
      })
      return existingObject
    } else if (action === 'failed') {
      const existingObject = dailyGoalItem.find(obj => obj.name === item.name)
      const newObject = { ...existingObject, failed: !existingObject.failed, success: false }
      setDailyGoalItem(prev => {
        const newArray = prev.map(obj => obj.name === item.name ? newObject : obj)
        AsyncStorage.setItem('taskForDay', JSON.stringify(newArray))
        return newArray
      })
    }
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
          const getStatus = () => {
            const {success, failed} = dailyGoal
            if (success) return 'success'
            if (failed) return 'failed'
            return null
          }
          return (
            <View key={i}>
              <SafeAreaView style={{flex:1}}>
                  <View style={styles.goalDayContainer}>
                    <ScrollView>
                      <GoalDay
                        status={getStatus()}
                        goalDay={dailyGoal.name}
                        onDelete={() => handleFromIconButtonTask(dailyGoal, 'delete')}
                        onSuccess={() => handleFromIconButtonTask(dailyGoal, 'success')}
                        onFailed={() => handleFromIconButtonTask(dailyGoal, 'failed')}
                      />
                    </ScrollView>
                  </View>
              </SafeAreaView>
            </View>
            )
          })}
      </ScrollView>
    </KeyboardAvoidingView>
    )
}
