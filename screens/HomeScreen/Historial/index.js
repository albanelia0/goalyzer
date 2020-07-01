import React from 'react';
import {
  ScrollView,
  View,
  Text,
  AsyncStorage,
  TouchableOpacity
} from 'react-native';
import DisplayTitleOnHistory from './displayTitleOnHistory'

import {styles} from './styles'

export default function Historial() {

  return (
    <View>
      <DisplayTitleOnHistory/>
    </View>
  );
}
