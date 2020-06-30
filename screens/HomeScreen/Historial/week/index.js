import React, {useState, useEffect} from 'react';
import useIsMountedRef from '../../../../hooks/useMounted'
import {
  ScrollView,
  View,
  Text,
  AsyncStorage,
  TouchableOpacity
} from 'react-native';
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
export default function Week() {
  const [taskHistory,setTaskHistory] = useState([])
  const [thereIsTaskOpen,setThereIsTaskOpen] = useState([
    {key: undefined,
    allTask: []}
  ])
  const isMountedRef = useIsMountedRef();

  useEffect(() => {
    AsyncStorage.getItem('allWeekDays').then(json => {
      const parsedJson = JSON.parse(json) || []
      if (isMountedRef.current) {
        setTaskHistory(parsedJson)
      }
    })
  },[isMountedRef])

  const checkStatusPreviousDays = (allTask) => {

    if (allTask.failed === true && allTask.success === false) {
        return '𝖷'
      } else if(allTask.failed === false && allTask.success === true) {
        return '✔️'
      } else {
        return '💭'
    }
  }

  const displayAllTask = (allTask, dayName) => {
    setThereIsTaskOpen(prev => {
      const displayAllPreviousTaskFromThisDay = allTask.map((allTask, i) => {
        if (allTask.day === taskHistory.day) {
          return (
            <View key={i} style={styles.taskContainer}>
              <Text style={styles.titleTask}>{allTask.name}</Text>
              <Text style={styles.checkStatusIcon}>{checkStatusPreviousDays(allTask)}</Text>
            </View>
          )
        }
      })
      if (prev.key === dayName) {
        return { ...prev, key: undefined,allTask: []}
      }
      return { ...prev, key: dayName,allTask: displayAllPreviousTaskFromThisDay}
    })
  }

  return (
    <ScrollView>
      <View style={styles.wrapper}>
          <View style={styles.container}>
            {taskHistory.map((item, i) => {
              if (item.allTask !== null) {
                const nameToDay = changeLetterFromDayToCompletName.find(day => day.day === item.day)
                return(
                  <View key={i}>
                    <TouchableOpacity onPress={() => displayAllTask(item.allTask, nameToDay.dayName)}>
                      <Text style={{...styles.weekDay, ...item.status}}>{nameToDay.dayName}</Text>
                    </TouchableOpacity>
                    {thereIsTaskOpen.key !== undefined && thereIsTaskOpen.key === nameToDay.dayName && thereIsTaskOpen.allTask}
                  </View>
                )
              }
            })}
        </View>
      </View>
    </ScrollView>
  );
}
