import {StyleSheet} from 'react-native';
import color from '../../constants/Colors'

export const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderColor: color.currentTitleDay,
    margin: 10,
    padding: 10
  },
  goalDayContainer: {
    alignItems: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  textGoal: {
    fontSize: 20,
    borderStyle: 'dashed',
    borderBottomColor: color.titleColor,
    borderBottomWidth: 1,
    marginBottom: 5
  },
  done: {
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: color.goalDone,
    width: 30,
    marginRight: 5
  },
  failed: {
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: color.goalFailed,
    width: 30,
    marginRight: 5
  },
  deleted: {
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: color.goalDeleted,
    width: 30,
  },
  iconText: {
    textAlign: 'center',
    padding: 5
  }
})