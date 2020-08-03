import giveStatusFromSquare from '../giveStatusFromSquare'
import {AsyncStorage} from 'react-native'
import currentMonth from '../../components/currentMonth'

const statusListFromAllMonth = [
    {month:"E",status: false, fullMonthName:"Enero"},
    {month:"F",status: false, fullMonthName:"Febrero"},
    {month:"M",status: false, fullMonthName:"Marzo"},
    {month:"Ab",status: false, fullMonthName:"Abril"},
    {month:"M",status: false, fullMonthName:"Mayo"},
    {month:"J",status: false, fullMonthName:"Junio"},
    {month:"X",status: false, fullMonthName:"Julio"},
    {month:"A",status: false, fullMonthName:"Agosto"},
    {month:"S",status: false, fullMonthName:"Septiembre"},
    {month:"O",status: false, fullMonthName:"Octubre"},
    {month:"N",status: false, fullMonthName:"Noviembre"},
    {month:"D",status: false, fullMonthName:"Diciembre"},
  ]

import {styles} from './styles'
export default function changeStatusFromEachMonth(parsedJson) {
  current = parsedJson.filter(item => item.currentMonth === currentMonth())

  const status = giveStatusFromSquare(current)

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
    parsedJson.map(value => {
      const currentStatus =statusListFromAllMonth.find((el) => el.fullMonthName === value.currentMonth)
      const newStatusFromMonth = statusListFromAllMonth.map(item => {
        const newValue = {month: item.month, status: displayStatus(status)}
        return JSON.stringify(item) === JSON.stringify(currentStatus) ? newValue: item
      })
      AsyncStorage.setItem('statusFromMonth', JSON.stringify(newStatusFromMonth))
    })
  }
}