import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  AsyncStorage,
  TouchableOpacity
} from 'react-native';
import DisplayTitleOnHistory from './displayTitleOnHistory'

import {styles} from './styles'

export default function Historial({navigation}) {
  const [rechargeScreen, setRechargeScreen] = useState(false)

  return (
    <View>
      <DisplayTitleOnHistory/>
    </View>
  );
}
