import {  StyleSheet} from 'react-native';
import colors from '../../../constants/Colors'
import Layout from '../../../constants/Layout'

export const styles = StyleSheet.create({
  container: {
    margin: 40,
  },
  subContainer: {
    position: "relative"
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
  bell: {
    padding: 20
  },
  textForDay: {
    paddingTop: 20,
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
  mision:{
    backgroundColor: '#e7dfd58f',
    borderBottomWidth: 0.5,
    borderColor: 'black',
    borderTopWidth: 0.5,
    color: 'black',
    fontSize: 40,
    left: 0,
    margin:10,
    position: 'absolute',
    padding: 10,
    right: 0,
    textAlign: 'center',
    top: 50,
    transform: [{ rotate: '-45deg'}],
    zIndex: 200,
  },
});
