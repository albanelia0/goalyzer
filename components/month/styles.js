import {StyleSheet} from 'react-native';
import color from '../../constants/Colors'

export const styles = StyleSheet.create({
  title: {
    fontSize: 35,
    color: color.titleColor
  },
  month: {
    color: color.goalColor,
    fontWeight: 'bold',
    fontSize: 18
  },
  monthContainer: {
    backgroundColor: '#e8e4e1',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: color.goalColor,
    minHeight: 50,
    maxWidth: 100,
    minWidth: 80,
    marginRight: 5,
    marginBottom: 5,
  },
  open: {
    minHeight: 90,
    minWidth: 100,
    padding: 10,
    fontSize: 19,
    color: color.titleColor
  }
})