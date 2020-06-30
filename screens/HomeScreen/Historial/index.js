import React, {useState, useEffect} from 'react';
import { FontAwesome5,MaterialCommunityIcons } from '@expo/vector-icons';
import {
  ScrollView,
  View,
  Text,
  AsyncStorage,
  TouchableOpacity
} from 'react-native';
import colors from '../../../constants/Colors'

import {styles} from './styles'
import Week from './week';

export default function Historial() {
  const [weekIsOpen, setWeekIsOpen] = useState(false)

  return (
    <View>
      <Text style={styles.titleHistory}>Historial</Text>
      <View style={styles.wrapperHistory}>
        <TouchableOpacity style={styles.container} onPress={() => setWeekIsOpen(!weekIsOpen)}>
          <FontAwesome5
            name="calendar-day"
            size={55}
            style={{ marginBottom: -3 }}
            color={colors.iconWeekHistory}
          />
          <Text style={styles.iconTitle}>Semanal</Text>
        </TouchableOpacity>
        {!weekIsOpen ?
          <TouchableOpacity style={styles.container}>
            <MaterialCommunityIcons
              name="calendar-week"
              size={55}
              style={{ marginBottom: -3 }}
              color={colors.iconMonthHistory}
            />
            <Text style={styles.iconTitle}>Mensual</Text>
          </TouchableOpacity>
          : <Week/>
        }
      </View>
    </View>
  );
}
