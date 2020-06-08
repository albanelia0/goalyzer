import React, {useState, useEffect} from 'react';

import {styles} from './styles'
import {
  ScrollView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  AsyncStorage,
  KeyboardAvoidingView
} from 'react-native';

const weekDaysNames = ['Domingo','Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
const Day = new Date().getDay()
let currentDay = weekDaysNames[Day]

export default function MetaDiaria() {
  console.log(currentDay)

  return (
    <KeyboardAvoidingView behavior="position">
      <ScrollView style={styles.container} keyboardShouldPersistTaps='handled'>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Meta Diaria</Text>
          <Text>🔔</Text>
        </View>
        <View>
          <Text style={styles.currentTitleDay}>{currentDay}</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
