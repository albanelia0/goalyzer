
import {AsyncStorage} from 'react-native';

const Days= [
    {day:"L", done: false, allTask: null, status: false, empty: false},
    {day:"M", done: false, allTask: null, status: false, empty: false},
    {day:"X", done: false, allTask: null, status: false, empty: false},
    {day:"J", done: false, allTask: null, status: false, empty: false},
    {day:"V", done: false, allTask: null, status: false, empty: false},
    {day:"S", done: false, allTask: null, status: false, empty: false},
    {day:"D", done: false, allTask: null, status: false, empty: false}
  ]

export default function changeDay({previousDays,setDailyTaskItem}) {
console.log('previousDays',previousDays)
  AsyncStorage.getItem('taskForDay').then(json => {
    const parsedAllPreviousTask = JSON.parse(json) || []
    AsyncStorage.getItem('allWeekDays').then(json => {
      const parsed = JSON.parse(json)
      const parsedJson = parsed === null || parsed === undefined || parsed.length !== 7 ? Days : parsed

      AsyncStorage.getItem('currentStatus').then(json => {
        const currentStatus = JSON.parse(json)

          const newArray = parsedJson.find(item => previousDays === 'Miércoles' && item.day === 'X')
          const newArrayFromTuesday = parsedJson.find(item =>
            item.day === 'M' && item.day === `${previousDays.charAt(0)}` && item.day !== 'X')

            const theOthers =
            parsedJson.find(item => item.day === `${previousDays.charAt(0)}` && item.day !== 'X' && item.day !== 'M')

          if (newArray && parsedAllPreviousTask.length > 0 && !!currentStatus) {
            const arrayFromPreviousDay = {...newArray, allTask: parsedAllPreviousTask, status: currentStatus}
            const newArrayWithAllTaskUpdatedFromPreviousDay = parsedJson.map(item => {
                if (JSON.stringify(item) === JSON.stringify(newArray) ) return arrayFromPreviousDay
                return item
            })
            AsyncStorage.setItem('allWeekDays', JSON.stringify(newArrayWithAllTaskUpdatedFromPreviousDay))
            AsyncStorage.removeItem('textFromDay')

          } else if(newArrayFromTuesday && parsedAllPreviousTask.length > 0 && !!currentStatus) {
            const arrayFromPreviousDay = {...newArrayFromTuesday, allTask: parsedAllPreviousTask, status: currentStatus}
            const newArrayWithAllTaskUpdatedFromPreviousDay = parsedJson.map(item => {
                if (JSON.stringify(item) === JSON.stringify(newArrayFromTuesday) ) return arrayFromPreviousDay
                return item
            })
            AsyncStorage.setItem('allWeekDays', JSON.stringify(newArrayWithAllTaskUpdatedFromPreviousDay))
            AsyncStorage.removeItem('textFromDay')

          } else if(theOthers && parsedAllPreviousTask.length > 0 && !!currentStatus) {
            if (theOthers.day === 'D') {
              const arrayFromPreviousDay = {day: theOthers.day, done: false, allTask: null, status: false, empty: false }
              const newArrayWithAllTaskUpdatedFromPreviousDay = parsedJson.map(item => {
                  if (JSON.stringify(item) === JSON.stringify(theOthers)) return arrayFromPreviousDay
                  return item
              })
              AsyncStorage.setItem('allWeekDays', JSON.stringify(newArrayWithAllTaskUpdatedFromPreviousDay))
              AsyncStorage.removeItem('textFromDay')
            } else {
              const arrayFromPreviousDay = {...theOthers, allTask: parsedAllPreviousTask, status: currentStatus}
              const newArrayWithAllTaskUpdatedFromPreviousDay = parsedJson.map(item => {
                  if (JSON.stringify(item) === JSON.stringify(theOthers)) return arrayFromPreviousDay
                  return item
              })
              AsyncStorage.setItem('allWeekDays', JSON.stringify(newArrayWithAllTaskUpdatedFromPreviousDay))
              AsyncStorage.removeItem('textFromDay')
            }

          } else {
            if (newArray) {
              const arrayFromPreviousDay = {...newArray, allTask: null, status: false}
            AsyncStorage.setItem('allWeekDays', JSON.stringify(arrayFromPreviousDay))
            } else if (newArrayFromTuesday) {
              const arrayFromPreviousDay = {...newArrayFromTuesday, allTask: null, status: false}
            AsyncStorage.setItem('allWeekDays', JSON.stringify(arrayFromPreviousDay))
            } else if (theOthers) {
              const arrayFromPreviousDay = {...theOthers, allTask: null, status: false}
            AsyncStorage.setItem('allWeekDays', JSON.stringify(arrayFromPreviousDay))
            }
          }
      })
    })
    if (parsedAllPreviousTask.length > 0) {

      const tasksWithStatusFalse = parsedAllPreviousTask.map(task => {

        if (task.success === true) {
          return {...task, success: false}
        } else if(task.failed === true) {
          return {...task, failed: false}
        } else return task
      })
      AsyncStorage.setItem('taskForDay', JSON.stringify(tasksWithStatusFalse))
      setDailyTaskItem(tasksWithStatusFalse)
    }
  })
}