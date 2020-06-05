import { StyleSheet} from 'react-native';
import allFonts from '../../constants/fonts'

export const styles = StyleSheet.create({
  container: {
    flex: 1
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
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  squarecontent: {
    width: 40,
    height: 40,
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 5,
    borderColor: 'pink',
    margin: 5
  }
})