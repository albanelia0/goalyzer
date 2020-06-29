import {  StyleSheet} from 'react-native';
import colors from '../../../../constants/Colors'

export const styles = StyleSheet.create({
  wrapper: {
    margin: 20
  },
  title: {
    fontSize: 35,
    color: colors.titleColor,
    marginBottom: 20,
    textAlign: 'center'
  },
  container: {
    margin: 5,
    fontSize: 20,
  },
  weekDay: {
    fontSize: 25,
    color: '#b1b493',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#b1b493',
    textAlign: 'center',
    padding: 10,
    marginBottom: 15,
  },
  titleTask: {
    fontSize: 23,
    color: '#4f8a8b',
    flexWrap: 'wrap',
    maxWidth: 200
  },
  checkStatusIcon: {
    backgroundColor: '#b1b493',
    padding: 5,
    maxHeight: 35
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: 300,
    padding: 10,
    borderBottomColor: colors.titleColor,
    borderBottomWidth: 1
  }
})