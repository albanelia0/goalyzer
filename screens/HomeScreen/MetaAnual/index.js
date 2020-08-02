import React,{useState, useEffect} from 'react';

import Input from '../../../components/Input'
import DisplayWeekGoal from '../../../components/displayWeekGoal'
import useIsMountedRef from '../../../hooks/useMounted'
import CheckDays from '../../../components/CheckDays'
import giveStatusFromSquare from '../../../handlers/giveStatusFromSquare';
import currentM from '../../../components/currentMonth'

import {styles} from './styles'
import { KeyboardAvoidingView,ScrollView, View, Text, AsyncStorage } from 'react-native';

const currentyearly = new Date().getFullYear()
const currentMonth = new Date().getMonth()

export default function MetaAnual({navigation}) {
  const [value, setValue] = useState()
  const [allYearlyGoal, setAllYearlyGoal] = useState([])
  const isMountedRef = useIsMountedRef()
  const [allMontGoal,setAllMontGoal] = useState([])
  const [currentStatus,setCurrentStatus] = useState('')

  const [Month, setMonth]= useState([
  {month:"E", done: false, status: false, empty: false},
  {month:"F", done: false, status: false, empty: false},
  {month:"M", done: false, status: false, empty: false},
  {month:"A", done: false, status: false, empty: false},
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

  useEffect(() => {
    AsyncStorage.getItem('yearlyGoal').then(json => {
      const parsedJson = JSON.parse(json) || []
      if (isMountedRef.current && parsedJson.length > 0) {
        setCurrentStatus(parsedJson)
      }
    })
    AsyncStorage.getItem('monthGoal').then(json => {
      const parsedJson = JSON.parse(json) || []
      if (isMountedRef.current && parsedJson.length > 0) {
        console.log('ENTROOOOOOO')
        giveTheStatus = parsedJson.filter(item => item.currentMonth === currentM())
        setAllMontGoal(parsedJson)
        setCurrentStatus(() => giveStatusFromSquare(giveTheStatus))
      }
    })
  }, [isMountedRef])

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
  console.log('allMontGoal',allMontGoal)
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
            navigation={navigation}
         />
          <CheckDays
            dayComplete={currentStatus}
            listNameToDisplay={theOtherNameMonth}
            setListNameToDisplay={setTheOtherNameMonth}
            storageName='monthGoal'
            thisIsYear
            currentMonth = {currentMonth}
            navigation={navigation}
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
