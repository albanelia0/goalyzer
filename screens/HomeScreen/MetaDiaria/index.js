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
let currentDay = weekDaysNames[Day]
let currentTaskDay = []

export default function MetaDiaria() {

  const [dailyGoalItem, setDailyGoalItem] = useState([])
  const [valueInput, setValueInput] = useState('')
  const [bellRemember, setBellRemember] = useState(false)
  const [isDayChanged, setIsDayChanged] = useState('')

  useEffect(() => {
    AsyncStorage.getItem('taskForDay').then(json => {
      const parsedJson = JSON.parse(json) || []
      setDailyGoalItem(parsedJson)
    })
    AsyncStorage.getItem('lastUsedDay').then(day => {
      AsyncStorage.setItem('lastUsedDay', currentDay)
      day !== undefined && setIsDayChanged(prev => {
        if (prev === undefined) return day
        return day
      })
    })
  },[])

  useEffect(() => {
    if (isDayChanged !== currentDay) {

      setDailyGoalItem(() => {
        AsyncStorage.getItem('taskForDay').then(json => {
          const parsedJson = JSON.parse(json) || []

          const newArrayWithCurrentDay = [weekDaysNames[Day -1], ...parsedJson]
          AsyncStorage.setItem('previosTaskStates', JSON.stringify(newArrayWithCurrentDay))

          const tasksWithStatusFalse = parsedJson.map(task => {
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
      setIsDayChanged(currentDay)
    }
  },[isDayChanged, currentDay])

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
