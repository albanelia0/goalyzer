import { StyleSheet} from 'react-native';
import color from '../../constants/Colors'

export const styles = StyleSheet.create({

  green: {
    backgroundColor: color.green,
    borderColor: 'transparent'
  },
  goalAlmostSuccess: {
    backgroundColor: color.goalAlmostSuccess,
    borderColor: 'transparent'
  },
  red: {
    backgroundColor: color.goalFailed,
    borderColor: 'transparent'
  },
  orange: {
    backgroundColor: color.orange,
    borderColor: 'transparent'
  },
  default: {
    backgroundColor: color.goalNotDone,
    borderColor: 'transparent'
  },

})