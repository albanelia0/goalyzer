import {AsyncStorage} from 'react-native';

export default function handleFromActionsToButtonTask ({item,storage, index, action, setDailyTaskItem, dailyTaskItem}){
  if (action === 'delete') {
    const newArray = dailyTaskItem.filter((_, theIndex) => theIndex !== index)
    AsyncStorage.setItem(storage, JSON.stringify(newArray))
    setDailyTaskItem(newArray)
  } else if (action === 'success') {
    const existingObject = dailyTaskItem.find((obj,i) => obj.name === item.name && i === index)
    const newObject = { ...existingObject, success: !existingObject.success, failed: false }
    setDailyTaskItem(prev => {
      const newArray = prev.map((obj, i) => obj.name === item.name && i === index ? newObject : obj)
      AsyncStorage.setItem(storage, JSON.stringify(newArray))
      return newArray
    })
    return existingObject
  } else if (action === 'failed') {
    const existingObject = dailyTaskItem.find((obj, i) => obj.name === item.name && i === index)
    const newObject = { ...existingObject, failed: !existingObject.failed, success: false }
    setDailyTaskItem(prev => {
      const newArray = prev.map((obj, i) => obj.name === item.name && i === index ? newObject : obj)
      AsyncStorage.setItem(storage, JSON.stringify(newArray))
      return newArray
    })
  }

  return ''
}