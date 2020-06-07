import { StyleSheet} from 'react-native';
import allFonts from '../../constants/fonts'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
  },
  days: {
    flex: 1,
    flexDirection: 'row',
  },
  daysList: {
    padding: 10,
    fontSize: 30,
    margin: 5,
    color: 'pink'
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
    borderColor: 'pink',
    margin: 5
  },
  // when the screen is small
  smallSquareContent: {
    width: 35,
    height: 35,
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 5,
    borderColor: 'pink',
    marginTop: 5
  },
  smallDaysList: {
    fontSize: 20,
    color: 'pink'
  },
})