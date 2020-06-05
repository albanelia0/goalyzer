import * as React from 'react';

import {styles} from './styles'
import { ScrollView, View } from 'react-native';
import MetaSemanal from '../../components/MetaSemanal';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <MetaSemanal/>
      </ScrollView>
    </View>
  );
}
