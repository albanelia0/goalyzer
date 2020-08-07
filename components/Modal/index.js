import React, {useState, useEffect} from 'react'
import { View, Text, TouchableHighlight, AsyncStorage } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import {styles} from './styles'

const disPlayModal = () => {
  const [texInput, setTextInput] = useState('')
  const [texValue, setTextValue] = useState()

  useEffect(() => {
    AsyncStorage.getItem('textFromDay').then(json => {
      const parsed = JSON.parse(json)
      setTextValue(parsed)
    }, [])
  })
  const onPressOnSaveButton = () => {
    if (texInput.length > 0) {
      AsyncStorage.setItem('textFromDay', JSON.stringify(texInput))
      setTextValue(texInput)
    }
  }

  const onPressOnDeleteButton = () => {
    AsyncStorage.removeItem('textFromDay')
    setTextValue('')
  }
  return (
    <View style={styles.modalContainer}>
      <Text style={styles.idea}>Idea importante de hoy</Text>
      <TextInput
        value={texValue}
        onChangeText= {text => setTextInput(text)}
        style={styles.textarea}
        multiline={true}
        textStyle={{ minHeight: 128 }}
        placeholder="Escribe aquí"
      />
      <View style={styles.buttonContainer}>
        <TouchableHighlight onPress={onPressOnDeleteButton}>
          <Text style={styles.deleteButton}>X</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={onPressOnSaveButton}>
          {texValue
            ? <Text style={ styles.buttonSavePressed}>Guardado</Text>
            : <Text style={ styles.saveButton}>Guardar</Text>
          }
        </TouchableHighlight>
      </View>
    </View>
  )
}

export default disPlayModal