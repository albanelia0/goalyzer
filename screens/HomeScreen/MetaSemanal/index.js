import React, {useState, useEffect} from 'react';

import useIsMountedRef from '../../../hooks/useMounted'
import Input from '../../../components/Input'

import {styles} from './styles'
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
  KeyboardAvoidingView
} from 'react-native';
import CheckDays from '../../../components/CheckDays'
import DisplayWeekGoal from '../../../components/displayWeekGoal'

export default function MetaSemanal({navigation}) {
  const [value, setValue]= useState('')
  const [arrayAllGoal, setArrayAllGoal] = useState([])
  const [arrayAllTask, setArrayAllTask] = useState([])
  const isMountedRef = useIsMountedRef();

  useEffect(() => {
    AsyncStorage.getItem('allGoalWeek').then(json => {
      const parsedJson = JSON.parse(json) || []
      if (isMountedRef.current && parsedJson || parsedJson.length > 0) {
        setArrayAllGoal(parsedJson)
      }
    })
  }, [])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      AsyncStorage.getItem('taskForDay').then(json => {
        const parsedJson = JSON.parse(json) || []
        if (parsedJson || parsedJson.length > 0) {
          setArrayAllTask(parsedJson)
        }
      })
    })
    return unsubscribe
  }, [navigation])

  const onInputSubmit = () => {
    if (value !== '') {
      setArrayAllGoal(prev => {
        if (!prev) {
          const arrayWithNewItem = [value]
          AsyncStorage.setItem('allGoalWeek', JSON.stringify(arrayWithNewItem))
          return arrayWithNewItem
        } else {
          const arrayWithNewItem = [...prev, value]
          AsyncStorage.setItem('allGoalWeek', JSON.stringify(arrayWithNewItem))
          return arrayWithNewItem
        }
      })
      setValue('')
    } else return
  }

  const dayComplete = () => {
    if (arrayAllTask.length !== 0) {
      const goalAlmostSuccess = arrayAllTask.some(dayStatus => dayStatus.success === true)
      const greenStatus = arrayAllTask.every(dayStatus => dayStatus.success === true)
      const redStatus = arrayAllTask.every(dayStatus => dayStatus.failed === true)
      const goalAlmostRed = arrayAllTask.some(item => item.failed && !item.success)
      const defaultStatus = arrayAllTask.every(dayStatus => !dayStatus.success && !dayStatus.failed)

       if (greenStatus) {
        return 'greenStatus'
      } else if(goalAlmostSuccess) {
        return 'goalAlmostSuccess'
      } else if(redStatus) {
        return 'redStatus'
      }else if(goalAlmostRed){
        return 'goalAlmostRed'
      } else if (defaultStatus) {
        return 'default'
      }
    }

  }
  return (
    <KeyboardAvoidingView>
      <ScrollView style={styles.allWeekContainer} keyboardShouldPersistTaps='handled'>
        <View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Meta Semanal</Text>
            <Text>🔔</Text>
          </View>
         <CheckDays dayComplete={dayComplete()} />
         <Input
          value={value}
          onPress={onInputSubmit}
          onChangeText={text => setValue(text)}
          taskToCreate="goal"/>
          <DisplayWeekGoal storage='allGoalWeek' arrayAllGoal={arrayAllGoal} setArrayAllGoal={setArrayAllGoal}/>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
