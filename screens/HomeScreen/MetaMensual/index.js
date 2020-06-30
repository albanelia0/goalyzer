import React,{useState, useEffect} from 'react';

import Input from '../../../components/Input'
import DisplayAllGoal from '../../../components/displayAllGoal'
import useIsMountedRef from '../../../hooks/useMounted'

import {styles} from './styles'
import { KeyboardAvoidingView,ScrollView, View, Text, AsyncStorage } from 'react-native';
import Month from '../../../components/month';
const month = new Date().getMonth()

const allMonth = [
  {month: 'Enero'}, {month: 'Febrero'},{month: 'Marzo'},{month: 'Abril'},{month: 'Mayo'},{month: 'Junio'},{month: 'Julio'},
  {month: 'Agosto'},{month: 'Septiembre'},{month: 'Octubre'},{month: 'Noviembre'},{month: 'Diciembre'}
]
const currentMonth =allMonth.find((_, i) => i === month)

export default function MetaMensual() {
  const [inputValue, setInputValue] = useState()
  const [allMonthGoal, setAllMonthGoal] = useState([])
  const isMountedRef = useIsMountedRef();

  useEffect(() => {

    AsyncStorage.getItem('monthGoal').then(json => {
      const parsedJson = JSON.parse(json)
      if (isMountedRef.current) {
        setAllMonthGoal(parsedJson)
      }
    })
  }, [isMountedRef])

  const onPressInput = () => {
    if (inputValue !== '') {
      setAllMonthGoal(prev => {
        const arrayWithNewItem = [...prev, { name: inputValue, success: false, failed: false, currentMonth}]
        AsyncStorage.setItem('monthGoal', JSON.stringify(arrayWithNewItem))
        return arrayWithNewItem
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
            <DisplayAllGoal dailyTaskItem={allMonthGoal} setDailyTaskItem={setAllMonthGoal} storage='monthGoal'/>
          </View>
          {/* <View>
            <Month/>
          </View> */}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
