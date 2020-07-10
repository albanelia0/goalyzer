
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
    console.log('HA ENTRADO', currentDay)
    AsyncStorage.getItem('allWeekDays').then(json => {
      const parsedJson = JSON.parse(json) || []
      const array = parsedJson === null || parsedJson.length === 0? weekDays : parsedJson

        const newArray = array.map(day => {
          if (day.empty === false) {
            return {...day, done: false,allTask: null, status: false, empty: true }
          } else return day
        })
      AsyncStorage.setItem('allWeekDays', JSON.stringify(newArray))
    })
  } else if(currentDay !== 'Lunes'){
    AsyncStorage.getItem('allWeekDays').then(json => {
      const parsedJson = JSON.parse(json) || []
      const array = parsedJson === null || parsedJson.length > 0? weekDays : parsedJson
      const newArray = array.map(day => {
        if (day.empty === true) {
          console.log('ENTRA EN !== LUNES')
          return {...day, empty: false}
        } else return day
      })
      AsyncStorage.setItem('allWeekDays', JSON.stringify(newArray))
    })
  }
}