import {StyleSheet} from 'react-native';
import color from '../../../constants/Colors'

export const styles = StyleSheet.create({
  title: {
    fontSize: 35,
    color: 'gray'
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 25
  },
  allWeekContainer: {
    padding: 25
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20
  },
  inputGoal: {
    marginTop: 10,
    padding: 6,
    borderStyle: 'dashed',
    borderWidth: 2,
    borderRadius: 5,
    borderColor: 'pink',
    minWidth: '80%'
  },
  inputTask: {
    marginTop: 10,
    padding: 6,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'pink',
  },
  textForDay: {
    paddingTop: 20,
    fontSize: 20,
    color: '#543864'
  },
  goalContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
    padding:10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'pink',
  },
  goalTitles: {
    fontSize: 22,
    color: color.goalColor,
    flexShrink: 0,
    flexWrap: 'wrap',
    minWidth: 110
  },
  goalItem: {
    flexShrink: 0,
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 10
  },
  deleteGoal: {
    marginLeft: 5,
    color: color.deleteGoal,
  },
})