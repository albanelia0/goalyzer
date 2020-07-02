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

const allMonth = [
  {month: 'Enero'}, {month: 'Febrero'},{month: 'Marzo'},{month: 'Abril'},{month: 'Mayo'},{month: 'Junio'},{month: 'Julio'},
  {month: 'Agosto'},{month: 'Septiembre'},{month: 'Octubre'},{month: 'Noviembre'},{month: 'Diciembre'}
]

export default function Month() {
  const [monthHistory,setMonthHistory] = useState([])
  const [thereIsTaskOpen,setThereIsTaskOpen] = useState([
    {key: undefined,
    allTask: []}
  ])
  const [allMonthName, setAllMonthName] = useState([])
  const isMountedRef = useIsMountedRef();

  useEffect(() => {
    AsyncStorage.getItem('monthGoal').then(json => {
      const parsedJson = JSON.parse(json) || []
      if (isMountedRef.current) {
        setMonthHistory(parsedJson)
        parsedJson.map(item => {
          setAllMonthName(() => {
            const result = allMonth.find(value => value.month === item.currentMonth.month)
            return [result]
          })
        })
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

  const displayAllTask = (monthName) => {
    setThereIsTaskOpen(prev => {
      const displayAllPreviousMonth = monthHistory.map((item, i) => {
          if (item.currentMonth.month === monthName) {
            return (
              <View key={i} style={styles.taskContainer}>
                <Text style={styles.titleTask}>{item.name}</Text>
                <Text style={styles.checkStatusIcon}>{checkStatusPreviousDays(item)}</Text>
              </View>
            )
          }
      })
      if (prev.key === monthName) {
        return { ...prev, key: undefined,allTask: []}
      }
      return { ...prev, key: monthName,allTask: displayAllPreviousMonth}
    })
  }

  return (
    <ScrollView>
      <View style={styles.wrapper}>
          <View style={styles.container}>
            {allMonthName.map((item,i) => {
              return (
                <View key={i}>
                  <TouchableOpacity onPress={() => displayAllTask(item.month)}>
                    <Text style={{...styles.weekDay}}>{item.month}</Text>
                  </TouchableOpacity>
                  {thereIsTaskOpen.key !== undefined && thereIsTaskOpen.allTask.map(item => item)}
                </View>
              )
            })}
        </View>
      </View>
    </ScrollView>
  );
}
