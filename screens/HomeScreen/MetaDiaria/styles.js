import {  StyleSheet} from 'react-native';
import colors from '../../../constants/Colors'
import Layout from '../../../constants/Layout'

export const styles = StyleSheet.create({
  container: {
    margin: 40,
  },
  title: {
    fontSize: 35,
    color: colors.titleColor
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 25
  },
  currentTitleDay: {
    fontSize: 20,
    textAlign: 'center',
    color: colors.currentTitleDay,
    margin: 10,
    letterSpacing: 40
  },
  goalDayContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallCurrentTitleDay: {
    fontSize: 15,
    textAlign: 'center',
    color: colors.currentTitleDay,
    margin: 10,
    letterSpacing: 40
  },
});
