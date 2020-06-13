import React, {useState, useEffect} from 'react'
import {styles} from './styles'
import isSmallDevice from '../../constants/Layout'
import { Text, View, AsyncStorage } from 'react-native';


const CheckDays = ({dayComplete}) => {
  const [Days, setDays]= useState([
  {day: "L", done: false, allTask: null, status: false},
  {day:"M", done: false, allTask: null, status: false},
  {day:"X", done: false, allTask: null, status: false},
  {day:"J", done: false, allTask: null, status: false},
  {day:"V", done: true, allTask: null, status: false},
  {day:"S", done: false, allTask: null, status: false},
  {day: "D", done: false, allTask: null, status: false}
  ])

  const Day = new Date().getDay()
  let currentDay = Days[(Day + 6) % 7]

  useEffect(() => {
    AsyncStorage.setItem('allWeekDays', JSON.stringify(Days))
  }, [])
  useEffect(() => {
    AsyncStorage.getItem('allWeekDays').then(json => {
      const parsedJson = JSON.parse(json) || []
      setDays(parsedJson)
    })
  }, [])

  const onColorStatusChange = () => {

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

  // const handleChangeBacgroundDayColor = () => {
  //   Days.map(day => {
  //     if (currentDay.day === day.day && day.done === true) {
  //       return (
  //         <View style={isSmallDevice ?
  //           {...styles.smallSquareContent, ...onColorStatusChange()}:
  //           {...styles.squarecontent, ...onColorStatusChange()}
  //         }/>
  //       )
  //     } else {
  //       return (
  //         <View style={isSmallDevice ?
  //           styles.smallSquareContent: styles.squarecontent
  //         }/>
  //       )
  //     }
  //   })
  // }

  return (
    <View style={styles.container}>
      <View style={styles.days}>
        {Days.map(({day, done, allTask, status}, i) => {
            console.log(currentDay)
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
            if (status === false) {
              status = onColorStatusChange()
            }
          }
          console.log('status', status)
          return (
            <View key={i} style={styles.squareContainer}>
              <Text style={isSmallDevice ? styles.smallDaysList:styles.daysList }>{day}</Text>
              {currentDay.day === day && done === true ?
                <View style={isSmallDevice ?
                  {...styles.smallSquareContent, ...onColorStatusChange()}:
                  {...styles.squarecontent, ...onColorStatusChange()}
                }/>:
                <View style={isSmallDevice ?
                  styles.smallSquareContent: styles.squarecontent
                }/>
              }
            </View>
          )
        })}
      </View>
    </View>
  )
}

export default CheckDays
