import {  StyleSheet} from 'react-native';
import colors from '../../../constants/Colors'
import Layout from '../../../constants/Layout'

export const styles = StyleSheet.create({
  container: {
    margin: 40,
  },
  title: {
    fontSize: 35,
    color: colors.titleColor
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 20
  },
  containerCurrentDay: {
    minWidth: Layout.window.width
  },
  currentTitleDay: {
    fontSize: 20,
    color: colors.currentTitleDay,
    marginTop: 10,
    letterSpacing: 20,
    minWidth: Layout.window.width

  },
  success: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'gray'
  },
  goalDayContainer:{
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  smallCurrentTitleDay: {
    fontSize: 15,
    color: colors.currentTitleDay,
    marginTop: 10,
    letterSpacing: 20,
    minWidth: Layout.window.width
  },
  remenberOfDay: {

  },
  textForDay: {
    paddingTop: 20,
    marginBottom: 10,
    fontSize: 20,
    color: colors.paragraphs
  },
  inputRemember: {
    marginTop: 10,
    padding: 6,
    borderStyle: 'dashed',
    borderWidth: 2,
    borderRadius: 5,
    borderColor: 'pink',
    minWidth: '80%'
  },
});
