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
} from 'react-native';
import Layout from '../../../constants/Layout'
import GoalDay from '../../../components/GoalDay';

const weekDaysNames = ['Domingo','Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
const Day = new Date().getDay()
let currentDay = weekDaysNames[Day]

export default function MetaDiaria() {

  const [dailyTaskItem, setDailyTaskItem] = useState([])
  const [valueInput, setValueInput] = useState('')
  const [bellRemember, setBellRemember] = useState(false)
  const [previousDays, setPreviousDays] = useState()
  const [isDayChanged, setIsDayChanged] = useState(currentDay)

  const debugSetter = (setter, x, where) => {
    setter(prev => {
      console.log(`[MetaDiaria:] -> ${where}`)
      return typeof x === 'function' ? x(prev) : x
    })
  }

  useEffect(() => {
    if (Day === 0) {
      setPreviousDays(weekDaysNames[6].toString())
    } else {
      setPreviousDays(weekDaysNames[Day - 1].toString())
    }
    AsyncStorage.getItem('taskForDay').then(json => {
      const parsedJson = JSON.parse(json) || []
      debugSetter(setDailyTaskItem, parsedJson, 'L44')
    })
    AsyncStorage.getItem('lastUsedDay').then(day => {
      AsyncStorage.setItem('lastUsedDay', currentDay)
      day !== undefined && debugSetter(setIsDayChanged, day, 'L48')
    })
    AsyncStorage.getItem('allWeekDays').then(json => {
      const parsedJson = JSON.parse(json) || []
      if(currentDay === 'Lunes') {}
    })
  },[])
  useEffect(() => {

    if (currentDay !== isDayChanged) {

      AsyncStorage.getItem('taskForDay').then(json => {
        const parsedAllPreviousTask = JSON.parse(json) || []
        AsyncStorage.getItem('allWeekDays').then(json => {
          const parsedJson = JSON.parse(json) || []

          const newArray = parsedJson.find(item => previousDays === 'Miércoles' && item.day === 'X')
          const newArrayFromTuesday = parsedJson.find(item =>
            item.day === 'M' && item.day === `${previousDays.charAt(0)}` && item.day !== 'X')

          const theOthers =
            parsedJson.find(item => item.day === `${previousDays.charAt(0)}` && item.day !== 'X' && item.day !== 'M')

          if (newArray) {
            const arrayFromPreviousDay = {...newArray, allTask: parsedAllPreviousTask}
            const newArrayWithAllTaskUpdatedFromPreviousDay = parsedJson.map(item => {
                if (JSON.stringify(item) === JSON.stringify(newArray) && item.allTask === null) return arrayFromPreviousDay
                return item
            })
            AsyncStorage.setItem('allWeekDays', JSON.stringify(newArrayWithAllTaskUpdatedFromPreviousDay))
          } else if(newArrayFromTuesday) {
            const arrayFromPreviousDay = {...newArrayFromTuesday, allTask: parsedAllPreviousTask}
            const newArrayWithAllTaskUpdatedFromPreviousDay = parsedJson.map(item => {
                if (JSON.stringify(item) === JSON.stringify(newArrayFromTuesday) && item.allTask === null) return arrayFromPreviousDay
                return item
            })
            AsyncStorage.setItem('allWeekDays', JSON.stringify(newArrayWithAllTaskUpdatedFromPreviousDay))
          } else if(theOthers) {
            const arrayFromPreviousDay = {...theOthers, allTask: parsedAllPreviousTask}
            const newArrayWithAllTaskUpdatedFromPreviousDay = parsedJson.map(item => {
                if (JSON.stringify(item) === JSON.stringify(theOthers) && item.allTask === null) return arrayFromPreviousDay
                return item
            })
            AsyncStorage.setItem('allWeekDays', JSON.stringify(newArrayWithAllTaskUpdatedFromPreviousDay))
          }
        })
        const tasksWithStatusFalse = parsedAllPreviousTask.map(task => {

          if (task.success === true) {
            return {...task, success: false}
          } else if(task.failed === true) {
            return {...task, failed: false}
          } else return task
        })
        AsyncStorage.setItem('taskForDay', JSON.stringify(tasksWithStatusFalse))
        debugSetter(setDailyTaskItem,tasksWithStatusFalse,'L100')
      })
    }
  },[isDayChanged])

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

  const handleFromIconButtonTask = (item, index, action) => {
    if (action === 'delete') {
      const newArray = dailyTaskItem.filter((_, theIndex) => theIndex !== index)
      AsyncStorage.setItem('taskForDay', JSON.stringify(newArray))
      setDailyTaskItem(newArray)
    } else if (action === 'success') {
      const existingObject = dailyTaskItem.find((obj,i) => obj.name === item.name && i === index)
      const newObject = { ...existingObject, success: !existingObject.success, failed: false }
      setDailyTaskItem(prev => {
        const newArray = prev.map((obj, i) => obj.name === item.name && i === index ? newObject : obj)
        AsyncStorage.setItem('taskForDay', JSON.stringify(newArray))
        return newArray
      })
      return existingObject
    } else if (action === 'failed') {
      const existingObject = dailyTaskItem.find((obj, i) => obj.name === item.name && i === index)
      const newObject = { ...existingObject, failed: !existingObject.failed, success: false }
      setDailyTaskItem(prev => {
        const newArray = prev.map((obj, i) => obj.name === item.name && i === index ? newObject : obj)
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
        {dailyTaskItem && dailyTaskItem.map((dailyGoal, i) => {
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
                        onDelete={() => handleFromIconButtonTask(dailyGoal,i, 'delete')}
                        onSuccess={() => handleFromIconButtonTask(dailyGoal,i, 'success')}
                        onFailed={() => handleFromIconButtonTask(dailyGoal,i, 'failed')}
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
