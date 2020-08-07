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
    minWidth: 200,
    maxWidth: 200,
    fontSize: 20,
    color: colors.titleColor
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 20
  },
  button: {
    padding: 6,
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 5,
    borderColor: colors.titleColor,
  },
  textButton: {
    fontSize: 15,
    color: colors.titleColor
  }
})