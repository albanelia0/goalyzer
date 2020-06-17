import React, {useState, useEffect} from 'react'
import {styles} from './styles'
import isSmallDevice from '../../constants/Layout'
import { Text, View, AsyncStorage } from 'react-native';

const CheckDays = ({dayComplete}) => {
  const [Days, setDays]= useState([
    {day:"L", done: false, allTask: null, status: false},
    {day:"M", done: false, allTask: null, status: false},
    {day:"X", done: false, allTask: null, status: false},
    {day:"J", done: false, allTask: null, status: false},
    {day:"V", done: false, allTask: null, status: false},
    {day:"S", done: false, allTask: null, status: false},
    {day:"D", done: false, allTask: null, status: false}
  ])
  const [previosTaskStates, setPreviosTaskStates] = useState([])

  const Day = new Date().getDay()
  let currentDay = Days[(Day + 6) % 7]
  console.log('currentDay',currentDay)
  let currentStatus = ''

  useEffect(() => {

    setDays(prev => {
      const currentDayFromStateDays =
        prev.find(({day, status}) => day === currentDay.day && JSON.stringify(status) !== JSON.stringify(currentStatus) )

      const newObjectWithCurrentStatus = {...currentDayFromStateDays, status: {...currentStatus}}
      const newArray = prev.map(item => {
        if (item === currentDayFromStateDays) return newObjectWithCurrentStatus
        return item
      })

      AsyncStorage.setItem('allWeekDays', JSON.stringify(newArray))
      return newArray
    })

  }, [currentStatus])

  useEffect(() => {

    AsyncStorage.getItem('allWeekDays').then(json => {
      const parsedJson = JSON.parse(json) || []

      setDays(parsedJson)
    })
  }, [])
  useEffect(() => {

    AsyncStorage.getItem('previosTaskStates').then(json => {
      const parsedJson = JSON.parse(json)
      if (JSON.stringify(parsedJson) !== JSON.stringify(previosTaskStates)) {
        setPreviosTaskStates(parsedJson)
      }
      const parsedJsonToString = JSON.stringify(parsedJson)
      let previosTask = Days.map(item => {
        if (item.day === parsedJsonToString.charAt(2) || parsedJson.slice(0,1) === 'Miércoles') {
          return [{...item, allTask: parsedJson}]
        }
        return item
      })
      setDays(previosTask)
    })
  }, [])

  console.log('DAYS', Days)


  const getStylesObjectFromStatusString = () => {

    switch (dayComplete) {
      case 'greenStatus':
        return styles.green
        case 'orangeStatus':
        return styles.orange
      case 'grayStatus':
        return styles.gray
      default:
        return {}
    }
  }

  const renderChangeBackgroundDayColor = (day, done, status) => {
    if (currentDay.day === day && done === true) {
      return (
        <View style={isSmallDevice ?
          {...styles.smallSquareContent, ...getStylesObjectFromStatusString()}:
          {...styles.squarecontent, ...getStylesObjectFromStatusString()}
        }/>
      )
    } else if(currentDay.day !== day && status !== false){
      return (
        <View style={isSmallDevice ?
          {...styles.smallSquareContent, ...status}:
          {...styles.squarecontent, ...status}
        }/>
      )
    } else {
      return (
        <View style={isSmallDevice ?
          styles.smallSquareContent: styles.squarecontent
        }/>
      )
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.days}>
        {Days.map(({day, done, allTask, status}, i) => {

          if (currentDay.day === day) {
            if (done !== true) {
              done = true
            }
            if (allTask === null) {
              AsyncStorage.getItem('taskForDay').then(json => {
                const parsedJson = JSON.parse(json) || []
                allTask = parsedJson
              })
            }
          }

          return (
            <View key={i} style={styles.squareContainer}>
              <Text style={isSmallDevice ? styles.smallDaysList:styles.daysList }>{day}</Text>
              {renderChangeBackgroundDayColor(day, done, status)}
            </View>
          )
        })}
      </View>
    </View>
  )
}

export default CheckDays
