import React, {useState, useEffect} from 'react'
import {styles} from './styles'
import isSmallDevice from '../../constants/Layout'
import { Text, View, AsyncStorage } from 'react-native';
import useIsMountedRef from '../../hooks/useMounted'
import { useIsFocused } from '@react-navigation/native';

const CheckDays = (
  {
    dayComplete,
    listNameToDisplay,
    setListNameToDisplay,
    storageName,
    thisIsYear,
    currentMonth,
  }) => {
  const [currentStatusFromMonth,setCurrentStatusFromMonth] = useState(false)
  const isFocused = useIsFocused()

  const isMountedRef = useIsMountedRef();

  const setDaysDebug = (x, where) => {
    setListNameToDisplay(prev => {
      console.log(`[setListNameToDisplay-CheckDays] -> ${where}`)
      return typeof x === 'function' ? x(prev) : x
    })
  }

  const Day = new Date().getDay()
  let currentDay = listNameToDisplay[(Day + 6) % 7]

  useEffect(() => {

    if (isFocused && thisIsYear ) {

      AsyncStorage.getItem('statusFromMonth').then(json => {
        const parsedJson = JSON.parse(json) || []
        if (isMountedRef.current && parsedJson) {
          setCurrentStatusFromMonth(parsedJson)
        }
      })
    }
  }, [isFocused,isMountedRef])
  useEffect(() => {
    AsyncStorage.getItem(storageName)
      .then(json => {
        const parsedJson = JSON.parse(json) || []
        if (isMountedRef.current) {
          let arrayFromWeekBegin = !parsedJson || parsedJson.length !== 7
          ? listNameToDisplay : parsedJson
          arrayFromWeekBegin.map((item, i) => {

            if (!thisIsYear && item.allTask !== undefined ) {
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
                arrayFromWeekBegin.find(({day, done}) => day === item.day && done === false)
              const currentDayFromPreviousDays =
                arrayFromWeekBegin.find(({day, done}) => day === item.day && done === true)
              if (currentDayFromStateDays !== undefined && currentDayFromStateDays.done === false) {
                const newArray = arrayFromWeekBegin.map(item => {
                if (item.day === currentDayFromStateDays.day && item.done === false && item.allTask !== null)
                  return {...currentDayFromStateDays,done: true, status: {...newStatusfromPreviousDays()}}
                return item
                })
                AsyncStorage.setItem(storageName, JSON.stringify(newArray))
                setDaysDebug(newArray, 'L65')
              } else if(currentDayFromPreviousDays) {
                const newStatusValue = {...currentDayFromPreviousDays,done: true, status: {...newStatusfromPreviousDays()}}

                const newArray = arrayFromWeekBegin.map(item => {
                 if (item.day === currentDayFromPreviousDays.day && item.done === false && item.allTask !== null) newStatusValue
                  return item
                })
                console.log('newArray',newArray)
                AsyncStorage.setItem(storageName, JSON.stringify(newArray))
                setDaysDebug(newArray, 'L65')
              }
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
    AsyncStorage.getItem(storageName).then(json => {
      const parsedJson = JSON.parse(json) || []
      if (isMountedRef.current && !parsedJson || parsedJson.length > 0) {
        if (!thisIsYear) {
          AsyncStorage.getItem('taskForDay').then(json => {
            const allTask = JSON.parse(json) || []
            let arrayFromWeekBegin = !parsedJson || parsedJson.length === 0? listNameToDisplay : parsedJson

            const currentDayFromStateDays =
              arrayFromWeekBegin.find(({day}) => day === currentDay.day)
              if (allTask !== null || allTask.length !== 0) {
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
              } else {
                const newObjectWithCurrentStatus = {...currentDayFromStateDays, status: false}
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
        }
      }
    })
  }, [dayComplete, isMountedRef])

  const renderChangeBackgroundDayColor = (day, status, allTask) => {
    if (!thisIsYear) {
      if(currentDay.day === day && status !== false){
        return (
          <View style={isSmallDevice ?
            {...styles.smallSquareContent, ...status}:
            {...styles.squarecontent, ...status}
          }/>
        )
      } else if(currentDay.day !== day && status !== false && allTask !== null) {
        return (
          <View style={isSmallDevice ?
            {...styles.smallSquareContent, ...status}:
            {...styles.squarecontent, ...status}
          }/>
        )
      } else if(currentDay.day === day && status === false) {
        return (
          <View style={isSmallDevice ?
            styles.smallSquareContent: styles.squarecontent
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
    if (currentStatusFromMonth && currentStatusFromMonth.length) {
      const el = currentStatusFromMonth.find(val => val.month === day)
      if (el) {
        return (
          <View style={isSmallDevice
            ? {...styles.smallSquareContent, ...el.status}
            : {...styles.squarecontent, ...el.status}
          }/>
        )
      }
      return (
        <View
          style={isSmallDevice ? styles.smallSquareContent: styles.squarecontent}
        />
      )
    }else {
      return (
        <View
          style={isSmallDevice ? styles.smallSquareContent: styles.squarecontent}
        />
      )
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.days}>
        {!thisIsYear
        ? listNameToDisplay.map((item, i) => {
          return (
            <View key={i} style={styles.squareContainer}>
              <Text style={isSmallDevice ? styles.smallDaysList:styles.daysList }>{item.day}</Text>
              {renderChangeBackgroundDayColor(item.day, item.status, item.allTask)}
            </View>
          )
        })
        : listNameToDisplay.map((item, i) => {
          return (
            <View key={i} style={styles.squareContainer}>
              <Text style={isSmallDevice ? styles.smallDaysList:styles.daysList }>{item.month}</Text>
              {renderChangeBackgroundDayColor(item.month, item.status, item)}
            </View>
          )
        })
      }
      </View>
    </View>
  )
}

export default CheckDays
