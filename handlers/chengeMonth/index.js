import React, {useState, useEffect} from 'react'
import currentMonth from '../../components/currentMonth'
import { AsyncStorage } from 'react-native'


export default function changeMonth() {
  const [monthChange, setMonthChange] = useState(currentMonth())
  const [allMonth, setAllMonth] = useState(currentMonth())

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
    AsyncStorage.getItem('previousMonth').then(day => {
      AsyncStorage.setItem('previousMonth', currentDay)
      if (isMountedRef.current) {
        console.log('Veamos que es day:', day)
        day !== undefined && setMonthChange(day)
      }
    })
    AsyncStorage.getItem('allMonth').then(json => {
      const parsedJson = JSON.parse(json)
      if (parsedJson) {
        setAllMonth(parsedJson)
      }
    })
  }, [currentMonth()])
  // if (monthChange !== currentMonth()) {
  // }
  return ''
}