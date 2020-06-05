import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import {SafeAreaView, StyleSheet, View, Text } from 'react-native';

import HomeScreen from './screens/HomeScreen'

const Stack = createStackNavigator();

export default function App(props) {

    return (
      <SafeAreaView style={styles.container} >
        <View>
          <HomeScreen/>
        </View>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontWeight: '300',
    fontSize: 18,
    color: '#333',
  }
});
