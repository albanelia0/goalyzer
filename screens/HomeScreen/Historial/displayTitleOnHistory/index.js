import React, {useState, useEffect} from 'react';
import { FontAwesome5,MaterialCommunityIcons } from '@expo/vector-icons';
import {
  ScrollView,
  View,
  Text,
  AsyncStorage,
  TouchableOpacity
} from 'react-native';
import colors from '../../../../constants/Colors'

import {styles} from './styles'
import Week from '../week';
import Month from '../month';

const DisplayTitleOnHistory = () => {
  const [isSomethingClicked, setIsSomethingClicked] = useState(null)
  const [goBack, setGoBack] = useState(false)
  const [displayWeek, setDisplayWeek] = useState('')

  const displayIconWithTitle = (Font, name, title,iconColor) => {

    if (!goBack) {
      setDisplayWeek(title)
      setGoBack(true)
      return (
        <TouchableOpacity style={styles.wrapper} onPress={() => setGoBack(false)}>
          <Font
            name={name}
            size={55}
            style={{ marginBottom: -3 }}
            color={iconColor}
          />
          <Text style={styles.iconTitle}>{title}</Text>
        </TouchableOpacity>
      )
    } else {
      setGoBack(false)
      return null
    }
  }
  return (
    <ScrollView>
      <View>
        { !goBack
          ?
          <>
            <Text style={styles.titleHistory}>Historial</Text>
            <View style={styles.wrapperHistory}>
              <TouchableOpacity style={styles.container}
                onPress={() => setIsSomethingClicked(() => displayIconWithTitle(FontAwesome5,"calendar-day", 'Diario',colors.iconWeekHistory))}>
                <FontAwesome5
                  name="calendar-day"
                  size={55}
                  style={{ marginBottom: -3 }}
                  color={colors.iconWeekHistory}
                />
                <Text style={styles.iconTitle}>Diario</Text>
              </TouchableOpacity>
                <TouchableOpacity style={styles.container}
                  onPress={() => setIsSomethingClicked(() => displayIconWithTitle(MaterialCommunityIcons,"calendar-week", 'mensual',colors.iconMonthHistory))}>
                  <MaterialCommunityIcons
                    name="calendar-week"
                    size={55}
                    style={{ marginBottom: -3 }}
                    color={colors.iconMonthHistory}
                  />
                  <Text style={styles.iconTitle}>Mensual</Text>
                </TouchableOpacity>
            </View>
          </>
          : isSomethingClicked
        }
        {displayWeek === 'Diario' && goBack && <Week/>}
        {displayWeek === 'mensual' && goBack && <Month/>}
      </View>
    </ScrollView>
  );
}

export default DisplayTitleOnHistory
