import React from 'react'
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';

import {styles} from './styles'

const Input = ({onChangeText, onPress, value}) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        onChangeText={onChangeText}
        style={styles.inputGoal}
        placeholder="Create your goal"
        value={value}
        />
      <TouchableOpacity onPress={onPress}>
        <Text>Guardar</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Input
