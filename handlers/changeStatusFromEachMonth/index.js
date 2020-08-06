import {AsyncStorage} from 'react-native'

import giveStatusFromSquare from '../../utils/giveStatusFromSquare'
import {styles} from './styles'

const ALL_MONTH_TEMPLATE = [
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

export default function changeStatusFromEachMonth(parsedJson) {

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
      case 'default':
        return styles.default
      default: return false
    }
  }

  const newStatusFromMonth = ALL_MONTH_TEMPLATE.map(templateItem => {
    const parsedJsonGroupedByMonth =
      parsedJson.filter(obj => obj.currentMonth === templateItem.fullMonthName)
    // if parsedJson has nothing under the month, templateItem remains the same
    if (!parsedJsonGroupedByMonth.length) return templateItem

    const newStatus = giveStatusFromSquare(parsedJsonGroupedByMonth)
    return {...templateItem, status: displayStatus(newStatus)}
  })

  AsyncStorage.setItem('statusFromMonth', JSON.stringify(newStatusFromMonth))
}
