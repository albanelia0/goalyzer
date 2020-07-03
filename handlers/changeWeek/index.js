
import {AsyncStorage} from 'react-native';

const weekDays = [
  {day:"L", done: false, allTask: null, status: false, empty: false},
  {day:"M", done: false, allTask: null, status: false, empty: false},
  {day:"X", done: false, allTask: null, status: false, empty: false},
  {day:"J", done: false, allTask: null, status: false, empty: false},
  {day:"V", done: false, allTask: null, status: false, empty: false},
  {day:"S", done: false, allTask: null, status: false, empty: false},
  {day:"D", done: false, allTask: null, status: false, empty: false}
]

export default function changeWeek(currentDay) {
  if (currentDay === 'Lunes') {
    AsyncStorage.getItem('allWeekDays').then(json => {
      const parsedJson = JSON.parse(json) || []
      const array = parsedJson === null? weekDays : parsedJson

        const newArray = array.map(day => {
          if (day.done === true && day.empty === false) {
            return {...day, done: false,allTask: null, status: false, empty: true }
          } else return day
        })
      AsyncStorage.setItem('allWeekDays', JSON.stringify(newArray))
    })
  } else if(currentDay === 'Martes'){
    AsyncStorage.getItem('allWeekDays').then(json => {
      const parsedJson = JSON.parse(json) || []
      const array = parsedJson === null? weekDays : parsedJson
      const newArray = array.map(day => {
        if (day.empty === true) {
          return {...day, empty: false}
        } else return day
      })
      AsyncStorage.setItem('allWeekDays', JSON.stringify(newArray))
    })
  }
}