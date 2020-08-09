import React, {useState, useEffect} from 'react'
import { View, Text, TouchableOpacity, AsyncStorage,} from 'react-native';

import {styles} from './styles'
import { TextInput } from 'react-native-gesture-handler';

const Modal = ({isWeek, onClose}) => {
  const [inputText, setTextInput] = useState()
  const [textValue, setTextValue] = useState()
  useEffect(() => {
    if (isWeek) {
      AsyncStorage.getItem('textFromWeek').then(json => {
        const parsed = JSON.parse(json)
        if (parsed) {
          setTextInput(parsed)
          setTextValue(parsed)
        }
    })
    } else {
      AsyncStorage.getItem('textFromDay').then(json => {
        const parsed = JSON.parse(json)
        if (parsed) {
          setTextInput(parsed)
          setTextValue(parsed)
        }
      })
    }
  },[isWeek])
  const onPressOnSaveButton = () => {
    if (inputText && isWeek) {
      AsyncStorage.setItem('textFromWeek', JSON.stringify(inputText))
      setTextValue(inputText)
    } else {
      if (inputText) {
        AsyncStorage.setItem('textFromDay', JSON.stringify(inputText))
        setTextValue(inputText)
      }
    }
  }

  const onPressOnDeleteButton = () => {
    if (isWeek) {
      if (inputText) {
        AsyncStorage.removeItem('textFromWeek')
        setTextValue('')
        setTextInput()
      }

    } else {
      if (inputText) {
        AsyncStorage.removeItem('textFromDay')
        setTextValue('')
        setTextInput()
      }

    }
  }

  return (
    <>
      <TouchableOpacity style={styles.overlay} onPress={onClose} />
      <View style={styles.modalContainer}>
        <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            {isWeek
              ? <Text style={styles.idea}>Texto de la semana</Text>
              : <Text style={styles.idea}>Aplicación diária del texto semanal</Text>
            }
          <TextInput
            value={inputText}
            onChangeText= {text => setTextInput(text)}
            style={styles.textarea}
            multiline={true}
            textStyle={{ minHeight: 128 }}
            placeholder="Escribe aquí"
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onPressOnDeleteButton}>
              <Text style={styles.deleteButton}>X</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPressOnSaveButton}>
              {textValue && textValue === inputText
                ? <Text style={ styles.buttonSavePressed}>Guardado</Text>
                : <Text style={ styles.saveButton}>Guardar</Text>
              }
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  )
}

export default Modal
