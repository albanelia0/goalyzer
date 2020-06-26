import {StyleSheet} from 'react-native';
import color from '../../constants/Colors'

export const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderColor: color.goalColor,
    borderRadius: 20,
    marginTop: 15,
    padding: 10,
  },
  wrapperStatusSuccess: {
    backgroundColor: color.goalSuccessed,
  },
  wrapperStatusFailed: {
    backgroundColor: color.goalNotDone,
  },
  done: {
    borderStyle: 'solid',
    borderRadius: 5,
    backgroundColor: color.goalDone,
    width: 30,
    marginRight: 50,
  },

  goalDayContainer: {
    alignItems: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  textGoal: {
    fontSize: 20,
    borderStyle: 'dashed',
    borderColor: color.titleColor,
    color: color.goalColor,
    backgroundColor: '#cfe5cf',
    borderWidth: 0.5,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderRadius: 15,
    marginBottom: 5,
    marginTop: -11,
    padding: 10,
    minWidth: 332,
    minHeight: 50,
    textAlign: 'center',
  },
  failed: {
    borderStyle: 'solid',
    borderRadius: 5,
    borderColor: color.goalColor,
    backgroundColor: color.goalNotDone,
    width: 30,
    marginRight: 5
  },
  deleted: {
    borderStyle: 'solid',
    borderRadius: 5,
    borderColor: color.goalColor,
    backgroundColor: color.goalDeleted,
    width: 30,
    marginLeft: 50
  },
  iconText: {
    textAlign: 'center',
    padding: 5
  }
})