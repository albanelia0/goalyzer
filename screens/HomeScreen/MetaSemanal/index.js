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
  KeyboardAvoidingView,
} from 'react-native';
import CheckDays from '../../../components/CheckDays'
import DisplayWeekGoal from '../../../components/displayWeekGoal'
import giveStatusFromSquare from '../../../utils/giveStatusFromSquare';
import Modal from '../../../components/Modal'
const MetaSemanal = ({navigation})=> {
  const [value, setValue]= useState('')
  const [arrayAllGoal, setArrayAllGoal] = useState([])
  const [arrayAllTask, setArrayAllTask] = useState([])
  const [bellRemember, setBellRemember] = useState(false)
  const isMountedRef = useIsMountedRef();

  const [Days, setDays]= useState([
  {day:"L", done: false, allTask: null, status: false, empty: false},
  {day:"M", done: false, allTask: null, status: false, empty: false},
  {day:"X", done: false, allTask: null, status: false, empty: false},
  {day:"J", done: false, allTask: null, status: false, empty: false},
  {day:"V", done: false, allTask: null, status: false, empty: false},
  {day:"S", done: false, allTask: null, status: false, empty: false},
  {day:"D", done: false, allTask: null, status: false, empty: false}
])

  useEffect(() => {
    AsyncStorage.getItem('allGoalWeek').then(json => {
      const parsedJson = JSON.parse(json) || []
      if (isMountedRef.current && parsedJson || parsedJson.length > 0) {
        setArrayAllGoal(parsedJson)
      }
    })
  }, [isMountedRef])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      AsyncStorage.getItem('taskForDay').then(json => {
        const parsedJson = JSON.parse(json) || []
        if (parsedJson || parsedJson.length > 0) {
          setArrayAllTask(parsedJson)
        } else {
          setBellRemember(false)
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
  return (
    <View>
      <KeyboardAvoidingView>
        <ScrollView style={styles.allWeekContainer} keyboardShouldPersistTaps='handled'>
          <View>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Meta Semanal</Text>
              <TouchableOpacity onPress={() => setBellRemember(!bellRemember)}>
                <Text style={{padding: 20, lineHeight: 1, fontSize: 20}}>🔔</Text>
              </TouchableOpacity>
            </View>
           <CheckDays
              dayComplete={giveStatusFromSquare(arrayAllTask)}
              listNameToDisplay={Days}
              setListNameToDisplay={setDays}
              storageName='allWeekDays'
           />
           <Input
            value={value}
            onPress={onInputSubmit}
            onChangeText={text => setValue(text)}
            taskToCreate="goal"/>
            <DisplayWeekGoal storage='allGoalWeek' arrayAllGoal={arrayAllGoal} setArrayAllGoal={setArrayAllGoal}/>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
        {bellRemember && <Modal isWeek onClose={() => {setBellRemember(false)}}/>}
    </View>
  );
}
export default MetaSemanal
