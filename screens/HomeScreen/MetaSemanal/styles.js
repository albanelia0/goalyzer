import {StyleSheet} from 'react-native';
import color from '../../../constants/Colors'

export const styles = StyleSheet.create({
  title: {
    fontSize: 35,
    color: color.titleColor
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

  goalContainer: {
    marginTop: 20,
    marginBottom: 20,
    padding:10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 15,
    borderColor: color.goalColor,
  },
  goalTitles: {
    fontSize: 22,
    color: color.goalColor,
    flexShrink: 0,
    flexWrap: 'wrap',
    maxWidth: 235
  },
  goalItem: {
    flexShrink: 0,
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
    borderBottomColor: color.goalColor,
    borderBottomWidth: 0.5,
    margin: 5,
    maxWidth: 300
  },
  deleteGoal: {
    marginLeft: 5,
    color: color.deleteGoal,
    padding: 20,
  },
})