import {StyleSheet} from 'react-native';
import Color from '../../constants/Colors'

export const styles = StyleSheet.create({
  modalContainer:{
    backgroundColor: '#b5a8b7',
    marginTop: 100,
    height: 400,
    margin: 40,
    position: 'absolute',
    width: 300,
    zIndex: 100,
    borderRadius: 30
  },
  textarea: {
    backgroundColor: '#ececec',
    borderRadius: 20,
    color: Color.titleColor,
    fontSize: 20,
    height:150,
    padding: 10,
    textAlign: 'center',
    width: 250,
  },
  idea: {
    borderBottomColor: '#ececec',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    color: '#ececec',
    fontSize: 23,
    padding: 15,
    margin: 25,
    textAlign: 'center',
    marginBottom: 40,
  },
  buttonContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 60
  },
  deleteButton: {
    backgroundColor: '#ececec',
    borderRadius: 10,
    color: 'gray',
    fontSize: 25,
    height: 40,
    margin: 20,
    padding: 7,
    textAlign: 'center',
    width: 40,
  },
  saveButton: {
    height: 40,
    width: 150,
    fontSize: 20,
    borderColor: '#ececec',
    backgroundColor: '#ececec',
    borderRadius: 10,
    textAlign: 'center',
    paddingTop: 5,
    color: Color.deleteGoal,
    margin: 10,
  },
  buttonSavePressed: {
    backgroundColor: 'gray',
    height: 40,
    width: 150,
    fontSize: 20,
    borderRadius: 10,
    textAlign: 'center',
    paddingTop: 5,
    color: '#efccec'
  }
})