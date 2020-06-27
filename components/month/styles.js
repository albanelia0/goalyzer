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
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eachMonth: {
    backgroundColor: '#e8e4e1',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
    marginBottom: 5,

  },
  open: {
    padding: 10,
    fontSize: 19,
    color: color.titleColor,
    textAlign: 'center',
  },
})