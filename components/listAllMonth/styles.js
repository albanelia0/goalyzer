
import {StyleSheet} from 'react-native';
import color from '../../constants/Colors'

export const styles = StyleSheet.create({
  title: {
    fontSize: 35,
    color: color.titleColor
  },
  container: {
    margin: 35
  },
  monthContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  }
})