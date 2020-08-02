import React,{useState, useEffect} from 'react';

import Input from '../../../components/Input'
import DisplayAllGoal from '../../../components/displayAllGoal'
import useIsMountedRef from '../../../hooks/useMounted'
import ID from '../../../ID'
import {styles} from './styles'
import { KeyboardAvoidingView,ScrollView, View, Text, AsyncStorage } from 'react-native';
import changeStatusFromEachMonth from '../../../handlers/changeStatusFromEachMonth';
import { useIsFocused } from '@react-navigation/native';

const month = new Date().getMonth()

const allMonth = [
  {month: 'Enero'}, {month: 'Febrero'},{month: 'Marzo'},{month: 'Abril'},{month: 'Mayo'},{month: 'Junio'},{month: 'Julio'},
  {month: 'Agosto'},{month: 'Septiembre'},{month: 'Octubre'},{month: 'Noviembre'},{month: 'Diciembre'}
]
const currentM =allMonth.find((_, i) => i === month)
const currentMonth = currentM.month
const isFocused = useIsFocused()

export default function MetaMensual() {
  const [inputValue, setInputValue] = useState()
  const [allMonthGoal, setAllMonthGoal] = useState([])
  const [currentMonthGoal, setCurrentMonthGoal] = useState([])
  const isMountedRef = useIsMountedRef();

  useEffect(() => {
    AsyncStorage.getItem('monthGoal').then(json => {
      const parsedJson = JSON.parse(json) || []
      if (isMountedRef.current && parsedJson.length > 0) {
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
  useEffect(() => {
    if (isFocused && isMountedRef.current) {
      AsyncStorage.getItem('monthGoal').then(json => {
      const parsedJson = JSON.parse(json) || []
        changeStatusFromEachMonth(parsedJson)
      })
    }
  },[isFocused,isMountedRef])

  const onPressInput = () => {
    if (inputValue !== '') {
      AsyncStorage.getItem('monthGoal').then(json => {
        const parsedJson = JSON.parse(json) || []
        setCurrentMonthGoal(prev => {
          const idValue = ID()
          if (parsedJson || parsedJson.length > 0) {
            const arrayWithAllItem = [...parsedJson, { name: inputValue, success: false, failed: false, currentMonth,id: idValue, status: false,allTask: null}]
            AsyncStorage.setItem('monthGoal', JSON.stringify(arrayWithAllItem))
            setAllMonthGoal(arrayWithAllItem)
            return [...prev, { name: inputValue, success: false, failed: false, currentMonth,id: idValue, status: false,allTask: null}]
          } else {
            const arrayWithAllItem = [{ name: inputValue, success: false, failed: false, currentMonth, id: idValue, status: false,allTask: null}]
            AsyncStorage.setItem('monthGoal', JSON.stringify(arrayWithAllItem))
            setAllMonthGoal(arrayWithAllItem)
            return [...prev, { name: inputValue, success: false, failed: false, currentMonth,id: idValue, status: false,allTask: null}]
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
              setAllMonthGoal={setAllMonthGoal}
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
