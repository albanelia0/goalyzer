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
  TouchableOpacity,
} from 'react-native';
import ID from '../../../ID'

import Layout from '../../../constants/Layout'
import changeWeek from '../../../handlers/changeWeek'
import changeDay from '../../../handlers/changeDay';
import useIsMountedRef from '../../../hooks/useMounted'
import Modal from '../../../components/Modal';
const weekDaysNames = ['Domingo','Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
const Day = new Date().getDay()
let currentDay = weekDaysNames[Day]
let previousDays = Day !== 0? weekDaysNames[Day - 1].toString():weekDaysNames[6].toString()

const MetaDiaria = () => {
  const [dailyTaskItem, setDailyTaskItem] = useState([])
  const [valueInput, setValueInput] = useState('')
  const [bellRemember, setBellRemember] = useState(false)
  const [isDayChanged, setIsDayChanged] = useState(currentDay)
  const isMountedRef = useIsMountedRef();
  const debugSetter = (setter, x, where) => {
    setter(prev => {
      console.log(`[MetaDiaria:] -> ${where}`)
      return typeof x === 'function' ? x(prev) : x
    })
  }

  useEffect(() => {
    AsyncStorage.getItem('taskForDay').then(json => {
      const parsedJson = JSON.parse(json) || []

      if (isMountedRef.current && parsedJson.length > 0) {
        debugSetter(setDailyTaskItem, parsedJson, 'L44')
      }
    })
    AsyncStorage.getItem('lastUsedDay').then(day => {
      AsyncStorage.setItem('lastUsedDay', currentDay)
      if (isMountedRef.current) {
        console.log('Veamos que es day:', day)
        day !== undefined && debugSetter(setIsDayChanged, day, 'L48')
      }
    })
  },[isMountedRef])
  useEffect(() => {
    if (isMountedRef.current && currentDay !== isDayChanged) {
      changeDay({previousDays,setDailyTaskItem})
      changeWeek(currentDay)
    }
  },[isDayChanged,changeDay,changeWeek, isMountedRef])

  const onSaveTaskInput = () => {
    if (valueInput !== '') {
      setDailyTaskItem(prev => {
          const idValue = ID()
        if (prev.length !== 0) {
          const arrayWithNewItem = [...prev, { name: valueInput, success: false, failed: false, id: idValue}]
          AsyncStorage.setItem('taskForDay', JSON.stringify(arrayWithNewItem))
          return arrayWithNewItem
        } else {
          const arrayWithNewItem = [{ name: valueInput, success: false, failed: false, id: idValue}]
          AsyncStorage.setItem('taskForDay', JSON.stringify(arrayWithNewItem))
          return arrayWithNewItem
        }
      })
      setValueInput('')
    } else return
  }
  return (
    <KeyboardAvoidingView>
      <ScrollView style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Meta para Hoy</Text>
          <TouchableOpacity style={styles.bell} onPress={() => setBellRemember(!bellRemember)}>
            <Text style={{fontSize: 20}}>🔔</Text>
          </TouchableOpacity>
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
          {dailyTaskItem.length
          ?
          <DisplayAllGoal dailyTaskItem={dailyTaskItem} setDailyTaskItem={setDailyTaskItem} storage='taskForDay'/>
          :
          <Text style={{fontSize: 20, padding: 10, color:'#c99b9b'}}>
            No hay metas para mostrar 🥺...
          </Text>}
      </ScrollView>
      {bellRemember && <Modal onClose={() => {  setBellRemember(false)}} />}
    </KeyboardAvoidingView>
  )
}

export default MetaDiaria
