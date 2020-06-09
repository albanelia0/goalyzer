import {  StyleSheet} from 'react-native';
import colors from '../../constants/Colors'
import Layout from '../../constants/Layout'

export const styles = StyleSheet.create({
  inputGoal: {
    marginTop: 10,
    marginRight: 10,
    padding: 6,
    borderStyle: 'dashed',
    borderWidth: 2,
    borderRadius: 5,
    borderColor: 'pink',
    minWidth: '80%'
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})