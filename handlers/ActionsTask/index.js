import {AsyncStorage} from 'react-native';

export default function handleFromActionsToButtonTask (item, index, action,useToSet, dailyTaskItem){
  if (action === 'delete') {
    const newArray = dailyTaskItem.filter((_, theIndex) => theIndex !== index)
    AsyncStorage.setItem('taskForDay', JSON.stringify(newArray))
    useToSet(newArray)
  } else if (action === 'success') {
    const existingObject = dailyTaskItem.find((obj,i) => obj.name === item.name && i === index)
    const newObject = { ...existingObject, success: !existingObject.success, failed: false }
    useToSet(prev => {
      const newArray = prev.map((obj, i) => obj.name === item.name && i === index ? newObject : obj)
      AsyncStorage.setItem('taskForDay', JSON.stringify(newArray))
      return newArray
    })
    return existingObject
  } else if (action === 'failed') {
    const existingObject = dailyTaskItem.find((obj, i) => obj.name === item.name && i === index)
    const newObject = { ...existingObject, failed: !existingObject.failed, success: false }
    useToSet(prev => {
      const newArray = prev.map((obj, i) => obj.name === item.name && i === index ? newObject : obj)
      AsyncStorage.setItem('taskForDay', JSON.stringify(newArray))
      return newArray
    })
  }
}