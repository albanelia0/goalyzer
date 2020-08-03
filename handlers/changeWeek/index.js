
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

const Day = new Date().getDay()

export default function changeWeek(currentDay) {

  if (currentDay === 'Lunes') {
    AsyncStorage.getItem('allWeekDays').then(json => {
      const parsedJson = JSON.parse(json) || []
      const array = parsedJson === null || parsedJson.length === 0? weekDays : parsedJson

      const newArray = array.map(day => {
        if (day.empty === false) {
            return {day: day.day, done: false,allTask: null, status: false, empty: true }
        } else return day
      })
      AsyncStorage.setItem('allWeekDays', JSON.stringify(newArray))
    })
  } else if(currentDay !== 'Lunes'){
      console.log('currentDay-ENTRÓ', currentDay)
    AsyncStorage.getItem('allWeekDays').then(json => {
      const parsedJson = JSON.parse(json) || []
      const array = parsedJson === null || parsedJson.length > 0? weekDays : parsedJson
      const newArray = array.map((day,i) => {
        if (day.empty === true) {
          console.log('ENTRA EN !== LUNES')
          return {...day, empty: false}
        }
        if(Day+1 <= i){
          console.log('Day+1', Day+1, 'i', i)
          return day
        } else {
          return {...day, done: false,allTask: null, status: false, empty: false }
        }
      })
      AsyncStorage.setItem('allWeekDays', JSON.stringify(newArray))
    })
  }
}