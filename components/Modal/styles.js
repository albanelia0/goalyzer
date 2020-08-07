import {StyleSheet} from 'react-native';
import Color from '../../constants/Colors'

export const styles = StyleSheet.create({
  modalContainer:{
    alignItems: 'center',
    backgroundColor: '#b5a8b7',
    display: 'flex',
    flexDirection: 'column',
    height: 400,
    justifyContent: 'center',
    marginTop: 100,
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
    fontSize: 20,
    color: '#ececec',
    marginBottom: 40
  },
  buttonContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  deleteButton: {
    backgroundColor: '#ececec',
    borderRadius: 10,
    color: 'gray',
    fontSize: 25,
    height: 40,
    marginRight: 20,
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
    color: 'gray'
  }
})