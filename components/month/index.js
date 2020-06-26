import React, {useState} from 'react'
import {  View, Text,TouchableOpacity } from 'react-native';

import {styles} from './styles'

const Month = ({month,}) => {
  const [isTouched, setIsTouched] = useState([])
  return(
    <View style={styles.monthContainer}>
      <TouchableOpacity>
        {isTouched[0] !== undefined ?
          <Text style={{...styles.month, ...styles.open}}>{isTouched}</Text>:
          <Text style={{...styles.month}}>{month}</Text>
        }
      </TouchableOpacity>
    </View>
  )
}

export default Month
