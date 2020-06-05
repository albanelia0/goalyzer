import * as React from 'react';

import {styles} from './styles'
import { Image, Button,ScrollView, Text, TouchableOpacity, View } from 'react-native';
import CheckDays from '../../components/CheckDays'

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.getStartedContainer}>
         <Text>holiiis jjl</Text>
         <CheckDays/>
        </View>
      </ScrollView>
    </View>
  );
}
