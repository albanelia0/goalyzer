import React,{useState, useEffect} from 'react';

import ListAllMonth from '../../../components/listAllMonth'
import Input from '../../../components/Input'
import DisplayAllGoal from '../../../components/displayAllGoal'

import {styles} from './styles'
import { KeyboardAvoidingView,ScrollView, View, Text, AsyncStorage } from 'react-native';

export default function MetaMensual() {
  const [inputValue, setInputValue] = useState()
  const [allMonthGoal, setAllMonthGoal] = useState([])

  useEffect(() => {
    AsyncStorage.getItem('monthGoal').then(json => {
      const parsedJson = JSON.parse(json)
      setAllMonthGoal(parsedJson)
    })
  }, [])

  console.log('allMonthGoal',allMonthGoal)
  const onPressInput = () => {
    if (inputValue !== '') {
      setAllMonthGoal(prev => {
        const arrayWithNewItem = [...prev, { name: inputValue, success: false, failed: false}]
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
          <Input
            value={inputValue}
            onChangeText={(text) => setInputValue(text)}
            taskToCreate="mensual"
            onPress={onPressInput}
            />
          <View style={styles.goalContainer}>
            <DisplayAllGoal dailyTaskItem={allMonthGoal} setDailyTaskItem={setAllMonthGoal} storage='monthGoal'/>
          </View>
          <View>
            <ListAllMonth/>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
