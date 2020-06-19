import React, {useState, useEffect} from 'react'
import {styles} from './styles'
import isSmallDevice from '../../constants/Layout'
import { Text, View, AsyncStorage } from 'react-native';

const CheckDays = ({dayComplete}) => {

  const [Days, setDays]= useState([
    {day:"L", allTask: null, status: false},
    {day:"M", allTask: null, status: false},
    {day:"X", allTask: null, status: false},
    {day:"J", allTask: null, status: false},
    {day:"V", allTask: null, status: false},
    {day:"S", allTask: null, status: false},
    {day:"D", allTask: null, status: false}
  ])


  const Day = new Date().getDay()
  let currentDay = Days[(Day + 6) % 7]
  // console.log('currentDay', currentDay)

  useEffect(() => {
    AsyncStorage.getItem('allWeekDays').then(json => {
      const parsedJson = JSON.parse(json)

      if (JSON.stringify(Days) !== JSON.stringify(parsedJson) ) {
        setDays(parsedJson)
      }
      // console.log('ESTO ES PARSE!', parsedJson)
      Days.map(item => {
        if (item.allTask !== undefined && item.allTask !== null) {
          const newStatusfromPreviousDays = () => {
            const orangeStatus = item.allTask.some(item => item.success === true)
            const greenStatus = item.allTask.every(item => item.success === true)
            const grayStatus = item.allTask.every(item => item.failed === true)
            if (greenStatus) {
              return styles.green
            } else if(orangeStatus) {
              return styles.orange
            } else if(grayStatus) {
              return styles.gray
            } else {}
          }
          const currentDayFromStateDays =
            Days.find(({allTask}) => JSON.stringify(allTask) === JSON.stringify(item.allTask))
            const newObjectWithCurrentStatus = {...currentDayFromStateDays, status: {...newStatusfromPreviousDays()}}
          const newArray = Days.map(item => {
            if (item.day === currentDayFromStateDays.day) return newObjectWithCurrentStatus
            return item
          })
            // console.log('------------------------------')
            // console.log('OTRAvvvv', newArray)
          AsyncStorage.setItem('allWeekDays', JSON.stringify(newArray))
          setDays(newArray)
          return newArray
        }
      })
    })
  }, [])
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
          prev.find(({day}) => day === currentDay.day)
        const newObjectWithCurrentStatus = {...currentDayFromStateDays, status: getStylesObjectFromStatusString()}

        const newArray = prev.map(item => {
          if (item.day === currentDayFromStateDays.day) return newObjectWithCurrentStatus
          return item
        })
        AsyncStorage.setItem('allWeekDays', JSON.stringify(newArray))
        // console.log('AVER ESTOOO:', newArray)
        return newArray
      })
  },[dayComplete])
  // console.log('Days', Days)

  // console.log('------------------------------')
  // console.log('ARRAY', Days)
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
