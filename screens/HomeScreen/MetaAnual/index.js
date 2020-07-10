import React,{useState, useEffect} from 'react';

import Input from '../../../components/Input'
import DisplayWeekGoal from '../../../components/displayWeekGoal'
import useIsMountedRef from '../../../hooks/useMounted'

import {styles} from './styles'
import { KeyboardAvoidingView,ScrollView, View, Text, AsyncStorage } from 'react-native';

const currentyearly = new Date().getFullYear()

export default function MetaAnual() {
  const [value, setValue] = useState()
  const [allYearlyGoal, setAllYearlyGoal] = useState([])
  const isMountedRef = useIsMountedRef();

  useEffect(() => {
    AsyncStorage.getItem('yearlyGoal').then(json => {
      const parsedJson = JSON.parse(json) || []
      if (isMountedRef.current && parsedJson.length > 0) {
        setAllYearlyGoal(parsedJson)
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
  return (
    <KeyboardAvoidingView>
      <ScrollView style={styles.container}>
        <View>
          <Text style={styles.title}>Meta Anual {currentyearly}</Text>
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
