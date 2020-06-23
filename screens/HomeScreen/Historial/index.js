import React, {useState, useEffect} from 'react';

import { ScrollView, View, Text,AsyncStorage} from 'react-native';
import {styles} from './styles'

const array = [
  {day:'Lunes',name: 'comprar', done: '✔️'},
  {day:'Martes',name: 'comprar', done: '💭'},
  {day:'Miércoles',name: 'comprar', done: 'X'},
  {day:'Jueves',name: 'comprar', done: 'X'}
]
export default function Historial() {
  const [taskHistory,setTaskHistory] = useState()

  useEffect(() => {
    AsyncStorage.getItem('allWeekDays').then(json => {
      const parsedJson = JSON.parse(json) || []
      setTaskHistory(parsedJson)
    })
  },[])
console.log('taskHistory',taskHistory)
  return (
    <ScrollView>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Historial</Text>
          <View style={styles.container}>
            {array.map(item => {
              return(
                <View>
                  <Text style={styles.weekDay}>{item.day}</Text>
                  <View style={styles.taskContainer}>
                    <Text style={styles.titleTask}>{item.name}</Text>
                    <Text>{item.done}</Text>
                  </View>
                </View>
              )
            })}
        </View>
      </View>
    </ScrollView>
  );
}
