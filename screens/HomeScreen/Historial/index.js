import React, {useState, useEffect} from 'react';

import { ScrollView, View, Text,AsyncStorage, TouchableOpacity} from 'react-native';
import {styles} from './styles'

const changeLetterFromDayToCompletName = [
  {day:'L',dayName: 'Lunes'},
  {day:'M',dayName: 'Martes'},
  {day:'X',dayName: 'Miércoles'},
  {day:'J',dayName: 'Jueves'},
  {day:'V',dayName: 'Viernes'},
  {day:'S',dayName: 'Sábado'},
  {day:'D',dayName: 'Domingo'}
]
export default function Historial() {
  const [taskHistory,setTaskHistory] = useState([])
  const [thereIsTaskOpen,setThereIsTaskOpen] = useState(false)

  useEffect(() => {
    AsyncStorage.getItem('allWeekDays').then(json => {
      const parsedJson = JSON.parse(json) || []
      setTaskHistory(parsedJson)
    })
  },[])

  const checkStatusPreviousDays = (allTask) => {
    console.log('allTaskiii',allTask)
    if (allTask.failed === true && allTask.success === false) {
        return '𝖷'
      } else if(allTask.failed === false && allTask.success === true) {
        return '✔️'
      } else {
        return '💭'
    }
  }

  const displayAllTask = (allTask) => {
    return allTask.map((allTask, i) => {
      return (
        <View key={i} style={styles.taskContainer}>
          <Text style={styles.titleTask}>{allTask.name}</Text>
          <Text style={styles.checkStatusIcon}>{checkStatusPreviousDays(allTask)}</Text>
        </View>
      )
    })
  }
  return (
    <ScrollView>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Historial</Text>
          <View style={styles.container}>
            {taskHistory.map((item, i) => {
              if (item.allTask !== null) {
                const nameToDay = changeLetterFromDayToCompletName.find(day => day.day === item.day)
                return(
                  <View key={i}>
                    <TouchableOpacity onPress={() => setThereIsTaskOpen(!thereIsTaskOpen)}>
                      <Text style={styles.weekDay}>{nameToDay.dayName}</Text>
                    </TouchableOpacity>
                    {thereIsTaskOpen && displayAllTask(item.allTask)}
                  </View>
                )
              }
            })}
        </View>
      </View>
    </ScrollView>
  );
}
