import {  StyleSheet} from 'react-native';
import colors from '../../../constants/Colors'

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
    fontSize: 25,
    color: colors.currentTitleDay,
    margin: 10,
    letterSpacing: 40
  }
});