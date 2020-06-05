import * as React from 'react';

import {styles} from './styles'
import { Image, Button,ScrollView, Text, TouchableOpacity, View } from 'react-native';
import CheckDays from '../CheckDays'

export default function MetaSemanal() {
  return (
    <View>
      <ScrollView>
        <View>
         <Text style={styles.title}>Meta Semanal</Text>
         <CheckDays/>
        </View>
      </ScrollView>
    </View>
  );
}
