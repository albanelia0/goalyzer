import React, {useState} from 'react'
import {  View, Text,TouchableOpacity,AsyncStorage } from 'react-native';

import {styles} from './styles'

const month = new Date().getMonth()
const currentMonth = (month + 1)

const allMonth = [
  {month: 'Enero'}, {month: 'Febrero'},{month: 'Marzo'},{month: 'Abril'},{month: 'Mayo'},{month: 'Junio'},{month: 'Julio'},
  {month: 'Agosto'},{month: 'Septiembre'},{month: 'Octubre'},{month: 'Noviembre'},{month: 'Diciembre'}
]
const Month = () => {
  const [isOpen, setIsOpen] = useState([])

  const onPressMonthLetter = (item) => {
    AsyncStorage.getItem('monthGoal').then(json => {
      const parsedJson = JSON.parse(json)
      const haveThisValue = parsedJson.filter(allSaveGoal => allMonth[allSaveGoal.currentMonth -1].month === item)
      console.log('haveThisValue', JSON.stringify(haveThisValue) !== JSON.stringify(isOpen))
      if (JSON.stringify(haveThisValue) !== JSON.stringify(isOpen)) {
        setIsOpen(haveThisValue)
      } else {
        setIsOpen(undefined)
      }
    })
  }

  return(
    <View style={styles.monthContainer}>
      {allMonth.map((item, i) => {
        return (
          <TouchableOpacity onPress={() => onPressMonthLetter(item.month)} >
            <View key={i} style={styles.eachMonth}>
              {isOpen !== undefined && isOpen.map(value => {
                  if (item.month === allMonth[value.currentMonth -1].month) {
                    return (
                    <View key={value.currentMonth}>
                      <Text style={{...styles.month,...styles.open}}>{value.name}</Text>
                    </View>
                    )
                  }
                })
              }
              <Text style={{...styles.month}}>{item.month}</Text>
            </View>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export default Month
