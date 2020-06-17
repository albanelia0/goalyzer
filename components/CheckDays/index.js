import React, {useState, useEffect} from 'react'
import {styles} from './styles'
import isSmallDevice from '../../constants/Layout'
import { Text, View, AsyncStorage } from 'react-native';

const CheckDays = ({dayComplete}) => {
  const [defaultDayStatus, setDefaultDayStatus] = useState()
  const [Days, setDays]= useState([
    {day:"L", allTask: null, status: false},
    {day:"M", allTask: null, status: false},
    {day:"X", allTask: null, status: false},
    {day:"J", allTask: null, status: false},
    {day:"V", allTask: null, status: false},
    {day:"S", allTask: null, status: false},
    {day:"D", allTask: null, status: false}
  ])
  const [previosTaskStates, setPreviosTaskStates] = useState([])

  const Day = new Date().getDay()
  let currentDay = Days[(Day + 6) % 7]
  // console.log('currentDay',currentDay)

  useEffect(() => {

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

    setDays(prev => {

      const currentDayFromStateDays =
        prev.find(({day, status}) => day === currentDay.day)
      const newObjectWithCurrentStatus = {...currentDayFromStateDays, status: getStylesObjectFromStatusString()}

      const newArray = prev.map(item => {
        if (item.day === currentDayFromStateDays.day) return newObjectWithCurrentStatus
        return item
      })
      AsyncStorage.setItem('allWeekDays', JSON.stringify(newArray))
      return newArray
    })

  }, [dayComplete])
  // console.log('Days', Days)
  useEffect(() => {

    AsyncStorage.getItem('allWeekDays').then(json => {
      const parsedJson = JSON.parse(json) || []

      setDays(parsedJson)
    })
  }, [])
    // console.log('newObjectWithCurrentStatus',Days)

  useEffect(() => {

    AsyncStorage.getItem('previosTaskStates').then(json => {
      const parsedJson = JSON.parse(json)
      if (JSON.stringify(parsedJson) !== JSON.stringify(previosTaskStates)) {
        setPreviosTaskStates(parsedJson)
      }
      const parsedJsonToString = JSON.stringify(previosTaskStates.slice(0,1))
      let previosTask = Days.map(item => {
        if (item.day === parsedJsonToString.charAt(2) || parsedJson.slice(0,1) === 'Miércoles') {

          const newStatusfromPreviousDays = () => {
            const orangeStatus = item.allTask.slice(1).some(dayStatus => dayStatus.success === true)
            const greenStatus = item.allTask.slice(1).every(dayStatus => dayStatus.success === true)
            const grayStatus = item.allTask.slice(1).every(dayStatus => dayStatus.failed === true)

            if (greenStatus) {
              return styles.green
            } else if(orangeStatus) {
              return styles.orange
            } else if(grayStatus) {
              return styles.gray
            }
          }
          return {...item, allTask: [...parsedJson], status: {...newStatusfromPreviousDays()}}
        }
        return item
      })

      AsyncStorage.setItem('allWeekDays', JSON.stringify(previosTask))
      setDays(previosTask)
    })
  }, [])
console.log('parsedJson', Days)

  const renderChangeBackgroundDayColor = (day, status) => {

    if(currentDay.day === day && status !== false){
      return (
        <View style={isSmallDevice ?
          {...styles.smallSquareContent, ...status}:
          {...styles.squarecontent, ...status}
        }/>
      )
    } else if(currentDay.day !== day && status !== false) {
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
        {Days.map(({day, status}, i) => {
          // console.log('day',day,'status',status )
          return (
            <View key={i} style={styles.squareContainer}>
              <Text style={isSmallDevice ? styles.smallDaysList:styles.daysList }>{day}</Text>
              {renderChangeBackgroundDayColor(day, status)}
            </View>
          )
        })}
      </View>
    </View>
  )
}

export default CheckDays
