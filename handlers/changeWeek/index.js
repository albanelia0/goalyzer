
import {AsyncStorage} from 'react-native';

export default function changeWeek(currentDay) {
  if (currentDay === 'Lunes') {
    AsyncStorage.getItem('allWeekDays').then(json => {
      const parsedJson = JSON.parse(json) || []

        const newArray = parsedJson.map(day => {
          if (day.done === true && day.empty === false) {
            return {...day, done: false,allTask: null, status: false, empty: true }
          } else return day
        })
      AsyncStorage.setItem('allWeekDays', JSON.stringify(newArray))
    })
  } else if(currentDay === 'Martes'){
    const newArray = parsedJson.map(day => {
      if (day.empty === true) {
        return {...day, empty: false}
      } else return day
    })
    AsyncStorage.setItem('allWeekDays', JSON.stringify(newArray))
  }
}