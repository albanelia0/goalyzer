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
    textAlign: 'left'
  },
  container: {
    margin: 5,
    fontSize: 20,
  },
  weekDay: {
    fontSize: 25,
    color: '#b1b493',
    borderStyle: 'solid',
    borderBottomWidth: 0.2,
    borderTopWidth: 0.2,
    borderColor: '#b1b493',
    padding: 10,
    marginBottom: 15,
    maxWidth: 100
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
    maxHeight: 35,
    width: 30,
    textAlign: 'center'
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 50,
    maxWidth: 300,
    padding: 10,
  }
})