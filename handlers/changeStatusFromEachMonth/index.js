import giveStatusFromSquare from '../giveStatusFromSquare'
import {AsyncStorage} from 'react-native'
import currentMonth from '../../components/currentMonth'

const statusListFromAllMonth = [
    {month:"E",status: false},
    {month:"F",status: false},
    {month:"M",status: false},
    {month:"A",status: false},
    {month:"M",status: false},
    {month:"J",status: false},
    {month:"X",status: false},
    {month:"A",status: false},
    {month:"S",status: false},
    {month:"O",status: false},
    {month:"N",status: false},
    {month:"D",status: false},
  ]

export default function changeStatusFromEachMonth(parsedJson) {
  giveTheStatus = parsedJson.filter(item => item.currentMonth === currentMonth)
  const status = giveStatusFromSquare(giveTheStatus)
  console.log('statuuus',status)
  if (status) {
    const displayStatus = (status) => {
      switch (status) {
        case 'greenStatus':
          return styles.green
        case 'goalAlmostSuccess':
          return styles.goalAlmostSuccess
        case 'redStatus':
          return styles.red
        case 'goalAlmostRed':
          return styles.orange
        case 'defaultStatus':
          return styles.default
        default: return {}
      }
    }
    const currentStatus =statusListFromAllMonth.find((_, i) => i === month)
    const newStatusFromMonth = statusListFromAllMonth.map(item => {
      const newValue = {month: item.month, status: displayStatus(status)}
      return JSON.stringify(item) === JSON.stringify(currentStatus) ? newValue: item
    })
    console.log('newStatusFromMonth',displayStatus(status))
    AsyncStorage.setItem('statusFromMonth', JSON.stringify(newStatusFromMonth))
  }
}