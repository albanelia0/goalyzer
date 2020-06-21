import {AsyncStorage} from 'react-native';

export default function changeDay({previousDays,setDailyTaskItem}) {
  AsyncStorage.getItem('taskForDay').then(json => {
    const parsedAllPreviousTask = JSON.parse(json) || []
    AsyncStorage.getItem('allWeekDays').then(json => {
      const parsedJson = JSON.parse(json) || []

      const newArray = parsedJson.find(item => previousDays === 'Miércoles' && item.day === 'X')
      const newArrayFromTuesday = parsedJson.find(item =>
        item.day === 'M' && item.day === `${previousDays.charAt(0)}` && item.day !== 'X')

      const theOthers =
        parsedJson.find(item => item.day === `${previousDays.charAt(0)}` && item.day !== 'X' && item.day !== 'M')

      if (newArray) {
        const arrayFromPreviousDay = {...newArray, allTask: parsedAllPreviousTask}
        const newArrayWithAllTaskUpdatedFromPreviousDay = parsedJson.map(item => {
            if (JSON.stringify(item) === JSON.stringify(newArray) && item.allTask === null) return arrayFromPreviousDay
            return item
        })
        AsyncStorage.setItem('allWeekDays', JSON.stringify(newArrayWithAllTaskUpdatedFromPreviousDay))
      } else if(newArrayFromTuesday) {
        const arrayFromPreviousDay = {...newArrayFromTuesday, allTask: parsedAllPreviousTask}
        const newArrayWithAllTaskUpdatedFromPreviousDay = parsedJson.map(item => {
            if (JSON.stringify(item) === JSON.stringify(newArrayFromTuesday) && item.allTask === null) return arrayFromPreviousDay
            return item
        })
        AsyncStorage.setItem('allWeekDays', JSON.stringify(newArrayWithAllTaskUpdatedFromPreviousDay))
      } else if(theOthers) {
        const arrayFromPreviousDay = {...theOthers, allTask: parsedAllPreviousTask}
        const newArrayWithAllTaskUpdatedFromPreviousDay = parsedJson.map(item => {
            if (JSON.stringify(item) === JSON.stringify(theOthers) && item.allTask === null) return arrayFromPreviousDay
            return item
        })
        AsyncStorage.setItem('allWeekDays', JSON.stringify(newArrayWithAllTaskUpdatedFromPreviousDay))
      }
    })
    const tasksWithStatusFalse = parsedAllPreviousTask.map(task => {

      if (task.success === true) {
        return {...task, success: false}
      } else if(task.failed === true) {
        return {...task, failed: false}
      } else return task
    })
    AsyncStorage.setItem('taskForDay', JSON.stringify(tasksWithStatusFalse))
    setDailyTaskItem(tasksWithStatusFalse)
  })
}