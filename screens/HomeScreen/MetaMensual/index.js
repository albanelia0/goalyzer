import * as React from 'react';

import ListAllMonth from '../../../components/listAllMonth'

import {styles} from './styles'
import { KeyboardAvoidingView,ScrollView, View, Text } from 'react-native';

export default function MetaMensual() {
  return (
    <KeyboardAvoidingView>
      <ScrollView style={styles.container}>
        <View>
          <Text style={styles.title}>Meta Mensual</Text>
          <View>
            <ListAllMonth/>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
