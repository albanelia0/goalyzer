import {  StyleSheet} from 'react-native';
import colors from '../../../../constants/Colors'
import layaout from '../../../../constants/Layout'
export const styles = StyleSheet.create({
  wrapperHistory: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 50,
    height: layaout.window.height / 2,
  },
  titleFromEachHistoryItem: {
    marginTop: 40,
    textAlign: 'center',
  },
  wrapper: {
    alignItems: 'center',
    marginTop: 40,
  },
  titleHistory: {
    fontSize: 35,
    color: colors.titleColor,
    marginTop: 40,
    textAlign: 'center',
    padding: 10
  },
  iconTitle: {
    marginTop: 10,
    fontSize: 20,
    color: colors.titleColor
  },
  container: {
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: colors.titleColor,
    marginTop: 10,
    alignItems: 'center',
  }
})