import React,{useState, useEffect} from 'react';

import Input from '../../../components/Input'
import DisplayAllGoal from '../../../components/displayAllGoal'
import useIsMountedRef from '../../../hooks/useMounted'

import {styles} from './styles'
import { KeyboardAvoidingView,ScrollView, View, Text, AsyncStorage } from 'react-native';
const month = new Date().getMonth()

const allMonth = [
  {month: 'Enero'}, {month: 'Febrero'},{month: 'Marzo'},{month: 'Abril'},{month: 'Mayo'},{month: 'Junio'},{month: 'Julio'},
  {month: 'Agosto'},{month: 'Septiembre'},{month: 'Octubre'},{month: 'Noviembre'},{month: 'Diciembre'}
]
const currentMonth =allMonth.find((_, i) => i === month)

export default function MetaMensual() {
  const [inputValue, setInputValue] = useState()
  const [allMonthGoal, setAllMonthGoal] = useState([])
  const [currentMonthGoal, setCurrentMonthGoal] = useState([])
  const isMountedRef = useIsMountedRef();

  useEffect(() => {

    AsyncStorage.getItem('monthGoal').then(json => {
      const parsedJson = JSON.parse(json)
      if (isMountedRef.current) {
        if (parsedJson) {
          setCurrentMonthGoal(() => {
            const allGoals = parsedJson.filter(value => value.currentMonth.month === currentMonth.month)
            return allGoals
          })
          setAllMonthGoal(parsedJson)
        }
      }
    })
  }, [isMountedRef])

  const onPressInput = () => {
    if (inputValue !== '') {
      AsyncStorage.getItem('monthGoal').then(json => {
        const parsedJson = JSON.parse(json)
        setCurrentMonthGoal(prev => {
          if (!parsedJson) {
            const arrayWithAllItem = [{ name: inputValue, success: false, failed: false, currentMonth}]
            AsyncStorage.setItem('monthGoal', JSON.stringify(arrayWithAllItem))
            return [...prev, { name: inputValue, success: false, failed: false, currentMonth}]
          } else {
            const arrayWithAllItem = [...parsedJson, { name: inputValue, success: false, failed: false, currentMonth}]
            AsyncStorage.setItem('monthGoal', JSON.stringify(arrayWithAllItem))
            return [...prev, { name: inputValue, success: false, failed: false, currentMonth}]
          }
        })
      })
      setInputValue('')
    } else return
  }
  return (
    <KeyboardAvoidingView>
      <ScrollView style={styles.container}>
        <View>
          <Text style={styles.title}>Meta Mensual</Text>
          <Text style={styles.titleMonth}>{currentMonth.month}</Text>
          <Input
            value={inputValue}
            onChangeText={(text) => setInputValue(text)}
            taskToCreate="mensual"
            onPress={onPressInput}
            />
          <View style={styles.goalContainer}>
            <DisplayAllGoal
              allMonthGoal={allMonthGoal}
              dailyTaskItem={currentMonthGoal}
              setDailyTaskItem={setCurrentMonthGoal}
              storage='monthGoal'
              />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
