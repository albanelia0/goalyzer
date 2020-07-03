import React, {useState, useEffect} from 'react'
import {styles} from './styles'
import isSmallDevice from '../../constants/Layout'
import { Text, View, AsyncStorage } from 'react-native';
import useIsMountedRef from '../../hooks/useMounted'

const CheckDays = ({dayComplete}) => {
/**
 * What represents any keys?.
 *
 * @param {boolean} done - To check if the status is updated.
 * @param {object} allTask - to put all day Task.
 * @param {object} status - to put the current status from allTask.
 * @param {boolean} empty - To check if allTask, status and done are false when the week begin.
 */
  const [Days, setDays]= useState([
    {day:"L", done: false, allTask: null, status: false, empty: false},
    {day:"M", done: false, allTask: null, status: false, empty: false},
    {day:"X", done: false, allTask: null, status: false, empty: false},
    {day:"J", done: false, allTask: null, status: false, empty: false},
    {day:"V", done: false, allTask: null, status: false, empty: false},
    {day:"S", done: false, allTask: null, status: false, empty: false},
    {day:"D", done: false, allTask: null, status: false, empty: false}
  ])
  const isMountedRef = useIsMountedRef();

  const setDaysDebug = (x, where) => {
    setDays(prev => {
      console.log(`[setDays-CheckDays] -> ${where}`)
      return typeof x === 'function' ? x(prev) : x
    })
  }


  const Day = new Date().getDay()
  let currentDay = Days[(Day + 6) % 7]

  useEffect(() => {
    AsyncStorage.getItem('allWeekDays')
      .then(json => {
        const parsedJson = JSON.parse(json)
        if (isMountedRef.current) {
          let arrayFromWeekBegin = !parsedJson? Days : parsedJson
          arrayFromWeekBegin.map((item, i) => {
            if (item.allTask !== undefined && item.allTask !== null) {
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
                arrayFromWeekBegin.find(({day, done}) =>
                  day === item.day && done === false)
              if (currentDayFromStateDays !== undefined && currentDayFromStateDays.done === false) {
                // const newObjectWithCurrentStatus = {...currentDayFromStateDays, status: {...newStatusfromPreviousDays()}}
                const newArray = arrayFromWeekBegin.map(item => {
                  if (item.day === currentDayFromStateDays.day && item.done === false)
                    return {...currentDayFromStateDays,done: true, status: {...newStatusfromPreviousDays()}}
                  return item
                })
                AsyncStorage.setItem('allWeekDays', JSON.stringify(newArray))
                setDaysDebug(newArray, 'L65')
              } else return
            }
          })
        }
      })
  }, [isMountedRef])

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
      const parsedJson = JSON.parse(json) || []

      let arrayFromWeekBegin = !parsedJson? Days : parsedJson
      if (isMountedRef.current) {

        const currentDayFromStateDays =
          arrayFromWeekBegin.find(({day}) => day === currentDay.day)
        const newObjectWithCurrentStatus = {...currentDayFromStateDays, status: getStylesObjectFromStatusString()}

        const newArray = arrayFromWeekBegin.map(item => {
          if (item.day === currentDayFromStateDays.day){
            AsyncStorage.setItem('currentStatus', JSON.stringify(getStylesObjectFromStatusString()))
            return newObjectWithCurrentStatus
          } else {
            return item
          }
        })
        setDaysDebug(newArray, 'L90')
        return newArray
      }
    })
  }, [dayComplete, isMountedRef])

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
