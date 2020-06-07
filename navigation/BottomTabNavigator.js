import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import LinksScreen from '../screens/LinksScreen';
import MetaSemanal from '../screens/HomeScreen/MetaSemanal';
import MetaDiaria from '../screens/HomeScreen/MetaDiaria';
import MetaMensual from '../screens/HomeScreen/MetaMensual';
import Historial from '../screens/HomeScreen/Historial';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Day';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Day"
        component={MetaDiaria}
        options={{
          title: 'Meta Diaria',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} today="md-today" />,
        }}
      />
      <BottomTab.Screen
        name="Week"
        component={MetaSemanal}
        options={{
          title: 'Meta Semanal',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} week="calendar-day" />,
        }}
      />
      <BottomTab.Screen
        name="Month"
        component={MetaMensual}
        options={{
          title: 'Meta Mensual',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} month="calendar-week" />,
        }}
      />
      <BottomTab.Screen
        name="History"
        component={Historial}
        options={{
          title: 'Historial',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} history="history" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'Meta semanal';
    case 'Links':
      return 'Links to learn more';
  }
}

