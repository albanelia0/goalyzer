import { Platform, StyleSheet} from 'react-native';

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
    padding: 20
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
    flex:1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 20,
    padding:10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'pink',
  },
  goalTitles: {
    fontSize: 20,
    color: '#8d6262'
  },
  oneGoal: {
    fontSize: 25,
    color: '#8d6262',
    paddingTop: 20,
    paddingRight: 10
  }
})