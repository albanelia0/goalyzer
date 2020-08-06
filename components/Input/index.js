import React from 'react'
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';

import {styles} from './styles'

const Input = ({onChangeText, onPress, value, taskToCreate}) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        onChangeText={onChangeText}
        style={styles.inputGoal}
        placeholder={`Create your ${taskToCreate}`}
        value={value}
        />
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.textButton} >Guardar</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Input
