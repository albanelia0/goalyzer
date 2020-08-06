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
const currentM = new Date().getMonth()
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
      if (isMountedRef.current && parsedJson || parsedJson.length > 0) {
        const previousGoalHistory = parsedJson.filter(value => value.currentMonth !== allMonth[currentM].month)
        setMonthHistory(previousGoalHistory)
        previousGoalHistory.map(item => {
          if (item.length <= 0) {
            return <View key={i+2}><Text>No hay registro</Text></View>
          } else {
            setAllMonthName(prev => {
              const result = allMonth.find(value => value.month === item.currentMonth)
              if (prev[0] === undefined) {
                return [result]
              } else {
                const isAlreadyOnArray = prev.some(item => item.month === result.month)
                if (isAlreadyOnArray) {
                  return [...prev]
                }else {
                  return [...prev,result]
                }
              }
            })
          }
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
          if (item.currentMonth === monthName) {
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
      } else {
        return { ...prev, key: monthName,allTask: displayAllPreviousMonth}
      }
    })
  }
  return (
    <ScrollView>
      <View style={styles.wrapper}>
          <View style={styles.container}>
            {allMonthName.map((item,i) => {
              if (item === undefined) {
                return <View key={i+2}><Text>No hay registro</Text></View>
              } else {

                return (
                  <View key={i}>
                    <TouchableOpacity onPress={() => displayAllTask(item.month)}>
                      <Text style={{...styles.weekDay}}>{item.month}</Text>
                    </TouchableOpacity>
                    { thereIsTaskOpen.key !== undefined && thereIsTaskOpen.key === item.month && thereIsTaskOpen.allTask.map(item => item)}
                  </View>
                )
              }
            })}
        </View>
      </View>
    </ScrollView>
  );
}
