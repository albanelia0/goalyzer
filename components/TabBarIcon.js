import {
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons
} from '@expo/vector-icons';
import * as React from 'react';

import Colors from '../constants/Colors';

export default function TabBarIcon(props) {
  if (props.today) {
    return (
      <Ionicons
        name={props.today}
        size={25}
        style={{ marginBottom: -3 }}
        color={props.focused ? Colors.containerDay : Colors.tabIconDefault}
      />
    )
  } else if(props.week) {
    return (
      <FontAwesome5
        name={props.week}
        size={25}
        style={{ marginBottom: -3 }}
        color={props.focused ? Colors.containerDay : Colors.tabIconDefault}
      />
    )
  } else if(props.month) {
    return (
      <MaterialCommunityIcons
        name={props.month}
        size={25}
        style={{ marginBottom: -3 }}
        color={props.focused ? Colors.containerDay : Colors.tabIconDefault}
      />
    )
  } else if(props.any) {
    return (
      <MaterialCommunityIcons
        name={props.any}
        size={25}
        style={{ marginBottom: -3 }}
        color={props.focused ? Colors.containerDay : Colors.tabIconDefault}
      />
    )
  } else if (props.history) {
    return (
      <MaterialCommunityIcons
        name={props.history}
        size={25}
        style={{ marginBottom: -3 }}
        color={props.focused ? Colors.containerDay : Colors.tabIconDefault}
      />
    )
  } else {
    return ''
  }
}
