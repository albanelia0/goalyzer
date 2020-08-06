import React,{useState, useEffect} from 'react';
import { useIsFocused } from '@react-navigation/native';

import Input from '../../../components/Input'
import DisplayWeekGoal from '../../../components/displayWeekGoal'
import useIsMountedRef from '../../../hooks/useMounted'
import CheckDays from '../../../components/CheckDays'
import giveStatusFromSquare from '../../../utils/giveStatusFromSquare';
import currentM from '../../../utils/currentMonth'

import {styles} from './styles'
import { KeyboardAvoidingView,ScrollView, View, Text, AsyncStorage } from 'react-native';
import changeStatusFromEachMonth from '../../../handlers/changeStatusFromEachMonth';

const currentyearly = new Date().getFullYear()
const currentMonth = new Date().getMonth()

export default function MetaAnual() {
  const [value, setValue] = useState()
  const [allYearlyGoal, setAllYearlyGoal] = useState([])
  const isMountedRef = useIsMountedRef()
  const [currentStatus,setCurrentStatus] = useState('')

  const [Month, setMonth]= useState([
  {month:"E", done: false, status: false, empty: false},
  {month:"F", done: false, status: false, empty: false},
  {month:"M", done: false, status: false, empty: false},
  {month:"Ab", done: false, status: false, empty: false},
  {month:"M", done: false, status: false, empty: false},
  {month:"J", done: false, status: false, empty: false},
])
  const [theOtherNameMonth, setTheOtherNameMonth] = useState([
    {month:"X", done: false, status: false, empty: false},
    {month:"A", done: false, status: false, empty: false},
    {month:"S", done: false, status: false, empty: false},
    {month:"O", done: false, status: false, empty: false},
    {month:"N", done: false, status: false, empty: false},
    {month:"D", done: false, status: false, empty: false}
  ])
  const isFocused = useIsFocused()
  useEffect(() => {
    if (isFocused) {
      AsyncStorage.getItem('monthGoal').then(json => {
        const parsedJson = JSON.parse(json) || []
        if (isMountedRef.current && parsedJson.length > 0) {
          changeStatusFromEachMonth(parsedJson)
          setCurrentStatus(() => {
            const current = parsedJson.filter(month => month.currentMonth === currentM())
            return giveStatusFromSquare(current)
          })
        }
      })
    }
    AsyncStorage.getItem('yearlyGoal').then(json => {
      const parsed = JSON.parse(json)
      if (parsed) {
        setAllYearlyGoal(parsed)
      }
    })
  }, [isFocused, isMountedRef])

  const onPressInputGoal = () => {
    if (value !== '') {
      setAllYearlyGoal(prev => {
        if (!prev) {
          const arrayWithNewItem = [value]
          AsyncStorage.setItem('yearlyGoal', JSON.stringify(arrayWithNewItem))
          return arrayWithNewItem
        } else {
          const arrayWithNewItem = [...prev, value]
          AsyncStorage.setItem('yearlyGoal', JSON.stringify(arrayWithNewItem))
          return arrayWithNewItem
        }
      })
      setValue('')
    } else return
  }

  return (
    <KeyboardAvoidingView>
      <ScrollView style={styles.container}>
        <View>
          <Text style={styles.title}>Meta Anual {currentyearly}</Text>
          <CheckDays
            dayComplete={currentStatus}
            listNameToDisplay={Month}
            setListNameToDisplay={setMonth}
            storageName='monthGoal'
            thisIsYear
            currentMonth = {currentMonth}
         />
          <CheckDays
            dayComplete={currentStatus}
            listNameToDisplay={theOtherNameMonth}
            setListNameToDisplay={setTheOtherNameMonth}
            storageName='monthGoal'
            thisIsYear
            currentMonth = {currentMonth}
         />
          <Input
            value={value}
            onChangeText={(text) => setValue(text)}
            taskToCreate="goal"
            onPress={onPressInputGoal}
            />
          <View style={styles.goalContainer}>
            <DisplayWeekGoal storage='yearlyGoal' arrayAllGoal={allYearlyGoal} setArrayAllGoal={setAllYearlyGoal}/>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
