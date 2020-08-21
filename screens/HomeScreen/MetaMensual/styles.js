import {StyleSheet} from 'react-native';
import color from '../../../constants/Colors'

export const styles = StyleSheet.create({
  title: {
    fontSize: 35,
    color: color.titleColor
  },
  container: {
    margin: 35
  },
  goalContainer: {
    marginBottom: 20,
    marginTop: 20,
    position: "relative"
  },
  titleMonth:{
    color: color.titleColor,
    fontSize: 25,
    borderBottomWidth: 1
  },
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
  mision:{
    backgroundColor: '#e7dfd58f',
    borderBottomWidth: 0.5,
    borderColor: 'black',
    borderTopWidth: 0.5,
    color: 'black',
    fontSize: 40,
    left: 0,
    margin:10,
    position: 'absolute',
    padding: 10,
    right: 0,
    textAlign: 'center',
    top: 50,
    transform: [{ rotate: '-45deg'}],
    zIndex: 200,
  },
})