import {AsyncStorage} from 'react-native';
import currentMonth from '../../components/currentMonth'
import changeStatusFromEachMonth from '../changeStatusFromEachMonth';

export default function handleFromActionsToButtonTask (
  {
    item,
    storage,
    index,
    action,
    setDailyTaskItem,
    dailyTaskItem,
    allMonthGoal,
    setAllMonthGoal
  }){
  console.log('currentItem',dailyTaskItem)
  if (action === 'delete') {
    const newArray = dailyTaskItem.filter(obj => obj.id !== index)
    if (allMonthGoal) {
      const newArrayFromStorage = allMonthGoal.filter((obj, i) => obj.id !== index)
        AsyncStorage.setItem(storage, JSON.stringify(newArrayFromStorage))
        changeStatusFromEachMonth(newArrayFromStorage)
        setAllMonthGoal(newArrayFromStorage)
        setDailyTaskItem(newArray)
    } else {
      AsyncStorage.setItem(storage, JSON.stringify(newArray))
      setDailyTaskItem(newArray)
    }
  } else if (action === 'success') {
    const newObject = {
      name: item.name,
      success: !item.success,
      failed: false,
      currentMonth: item.currentMonth,
      id: item.id
    }
    setDailyTaskItem(prev => {
      const newArray = prev.map((obj, i) => obj.id === index ? newObject : obj)
      if (allMonthGoal) {
        const findObjectClicked = allMonthGoal.find((obj, i) => obj.id === item.id)
        const newArrayFromStorage = allMonthGoal.map((obj, i) => {
          if (JSON.stringify(obj) === JSON.stringify(findObjectClicked)) {
            return newObject
          } else {
            return obj
          }
        })
        changeStatusFromEachMonth(newArrayFromStorage)
        AsyncStorage.setItem(storage, JSON.stringify(newArrayFromStorage))
        setAllMonthGoal(newArrayFromStorage)
        return newArray
      } else {
        AsyncStorage.setItem(storage, JSON.stringify(newArray))
        return newArray
      }
    })
  } else if (action === 'failed') {
    const newObject = {
      name: item.name,
      success: false,
      failed: !item.failed,
      currentMonth: item.currentMonth,
      id: item.id
    }

    setDailyTaskItem(prev => {
      const newArray = prev.map((obj, i) => obj.id === index? newObject : obj)
      if (allMonthGoal) {
          const findObjectClicked = allMonthGoal.find((obj, i) => obj.id === item.id)
          const newArrayFromStorage = allMonthGoal.map((obj, i) => {
          if (JSON.stringify(obj) === JSON.stringify(findObjectClicked)) {
            return newObject
          } else {
            return obj
          }
        })
          changeStatusFromEachMonth(newArrayFromStorage)
          AsyncStorage.setItem(storage, JSON.stringify(newArrayFromStorage))
          setAllMonthGoal(newArrayFromStorage)
          return newArray
      } else {
        AsyncStorage.setItem(storage, JSON.stringify(newArray))
        return newArray
      }
    })
  }
}