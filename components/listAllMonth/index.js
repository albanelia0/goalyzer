import React from 'react'
import {  View, Text,TouchableOpacity } from 'react-native';

import Month from '../month'

import {styles} from './styles'

const allMonth = [
  {month: 'E'}, {month: 'F'},{month: 'M'},{month: 'A'},{month: 'M'},{month: 'J'},{month: 'X'},
  {month: 'A'},{month: 'S'},{month: 'O'},{month: 'N'},{month: 'D'}
]

const ListAllMonth = () => {
  return(
    <View style={styles.monthContainer}>
      {allMonth.map((item, i) => {
        return (
          <View key={i}>
            <Month month={item.month}/>
          </View>
        )
      })}
    </View>
  )
}

export default ListAllMonth
