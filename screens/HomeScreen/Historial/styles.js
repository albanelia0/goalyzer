import {  StyleSheet} from 'react-native';
import colors from '../../../constants/Colors'

export const styles = StyleSheet.create({
  wrapper: {
    margin: 40
  },
  title: {
    fontSize: 35,
    color: colors.titleColor,
    marginBottom: 20,
    textAlign: 'center'
  },
  container: {
    margin: 5,
    fontSize: 20,
  },
  weekDay: {
    fontSize: 25,
    color: colors.goalColor,

  },
  titleTask: {
    fontSize: 20
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  }
})