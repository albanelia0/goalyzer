import React, {useState} from 'react'
import { View, Text, TouchableHighlight } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import {styles} from './styles'

const disPlayModal = () => {
  return (
    <View style={styles.modalContainer}>
      <Text style={styles.idea}>Idea importante de hoy</Text>
      <TextInput
        style={styles.textarea}
        multiline={true}
        textStyle={{ minHeight: 128 }}
        placeholder="Escribe aquí"
      />
      <View style={styles.buttonContainer}>
        <TouchableHighlight>
          <Text style={styles.deleteButton}>X</Text>
        </TouchableHighlight>
        <TouchableHighlight>
          <Text style={styles.saveButton}>Guardar</Text>
        </TouchableHighlight>
      </View>
    </View>
  )
}

export default disPlayModal