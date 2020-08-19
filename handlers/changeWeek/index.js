
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

export default function changeWeek() {

  AsyncStorage.getItem('allWeekDays').then(json => {
    const parsedJson = JSON.parse(json) || []
    const array = parsedJson === null || parsedJson.length === 0? weekDays : parsedJson

    const newArray = array.map(day => {
      const newValue = {day: day.day, done: false,allTask: null, status: false, empty: false }
      if (day.empty === true || !!day.allTask) {
        if(day.day === 'D') {

          return newValue
        }
        return newValue
      }else {
        return day
      }
    })
    AsyncStorage.removeItem('textFromWeek')
    AsyncStorage.removeItem('textFromDay')
    AsyncStorage.setItem('allWeekDays', JSON.stringify(newArray))
  })
}