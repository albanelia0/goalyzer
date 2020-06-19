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

  const setDaysDebug = (x, where) => {
    setDays(prev => {
      console.log(`[setDays-CheckDays] -> ${where}`)
      return typeof x === 'function' ? x(prev) : x
    })
  }


  const Day = new Date().getDay()
  let currentDay = Days[(Day + 6) % 7]
  // console.log('currentDay', currentDay)
  let num = 0
  useEffect(() => {
    AsyncStorage.getItem('allWeekDays')
      .then(json => {
        const parsedJson = JSON.parse(json)
        // if (JSON.stringify(Days) !== JSON.stringify(parsedJson) ) {
        //   setDays(parsedJson)
        // }
        parsedJson.map((item, i) => {
          // console.log('RESULT' ,i, parsedJson)

          if (item.allTask !== undefined && item.allTask !== null) {
            console.log('ENTRó',item.allTask !== undefined && item.allTask !== null)
            const newStatusfromPreviousDays = () => {
              const greenStatus = item.allTask.every(item => item.success === true)
              const goalAlmostSuccess = item.allTask.some(item => item.success === true)
              const redStatus = item.allTask.every(item => item.failed === true)
              const defaultStatus = item.allTask.every(dayStatus => !dayStatus.success && !dayStatus.failed)
              const goalAlmostRed = item.allTask.some(item => item.failed && !item.success)
              if (greenStatus) {
                return styles.green
              } else if(goalAlmostSuccess) {
                return styles.goalAlmostSuccess
              } else if(redStatus) {
                return styles.red
              } else if(goalAlmostRed){
                return styles.orange
              }else if(defaultStatus){
                return styles.default
              } else return {}
            }
            const currentDayFromStateDays =
              parsedJson.find(({day, done}) =>
                day === item.day && done === false)
            console.log('ITEM-ENCONTRADO', currentDayFromStateDays)
            if (currentDayFromStateDays !== undefined && currentDayFromStateDays.done === false) {
              // const newObjectWithCurrentStatus = {...currentDayFromStateDays, status: {...newStatusfromPreviousDays()}}
              const newArray = parsedJson.map(item => {
                if (item.day === currentDayFromStateDays.day && item.done === false)
                  return {...currentDayFromStateDays,done: true, status: {...newStatusfromPreviousDays()}}
                return item
              })
              AsyncStorage.setItem('allWeekDays', JSON.stringify(newArray))
              setDaysDebug(newArray, 'L65')
            } else return
          }
        })
      })
  }, [])

  useEffect(() => {
    const getStylesObjectFromStatusString = () => {
      switch (dayComplete) {
        case 'greenStatus':
          return styles.green
        case 'goalAlmostSuccess':
          return styles.goalAlmostSuccess
        case 'redStatus':
          return styles.red
        case 'goalAlmostRed':
          return styles.orange
        case 'default':
          return styles.default
        default: {}
      }
    }
    AsyncStorage.getItem('allWeekDays').then(json => {
      const parsedJson = JSON.parse(json)

        const currentDayFromStateDays =
          parsedJson.find(({day}) => day === currentDay.day)
        const newObjectWithCurrentStatus = {...currentDayFromStateDays, status: getStylesObjectFromStatusString()}

        const newArray = parsedJson.map(item => {
          if (item.day === currentDayFromStateDays.day) return newObjectWithCurrentStatus
          return item
        })
        // console.log('AVER ESTOOO:', newArray)
        setDaysDebug(newArray, 'L90')
        return newArray
    })
  }, [dayComplete])

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
