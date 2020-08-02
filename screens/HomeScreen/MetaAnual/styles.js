import {StyleSheet} from 'react-native';
import color from '../../../constants/Colors'

export const styles = StyleSheet.create({
  title: {
    fontSize: 35,
    color: color.titleColor,
    marginBottom: 20
  },
  container: {
    margin: 35
  },
  goalContainer: {
    marginBottom: 20,
    marginTop: 20
  },
  titleMonth:{
    color: color.titleColor,
    fontSize: 25,
    borderBottomWidth: 1
  }
})