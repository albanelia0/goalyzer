import { StyleSheet} from 'react-native';
import color from '../../constants/Colors'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
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
  days: {
    flex: 1,
    flexDirection: 'row',
  },
  daysList: {
    padding: 10,
    fontSize: 30,
    margin: 5,
    color: color.containerDay
  },
  squareContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  squarecontent: {
    width: 40,
    height: 40,
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 5,
    borderColor: color.containerDay,
    margin: 5
  },
  // when the screen is small
  smallSquareContent: {
    width: 35,
    height: 35,
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 5,
    borderColor: color.containerDay,
    marginTop: 5
  },
  smallDaysList: {
    fontSize: 20,
    color: color.containerDay

  },
})