import {Dimensions, StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../constants/theme';

const {screenWrapper, settingsListItem} = StyleSheet.create({
  screenWrapper: {
    display: 'flex',
    flexGrow: 1,
    backgroundColor: COLORS.background,
    paddingVertical: 2,
    marginHorizontal: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    //marinTop: 75,

    borderBottomColor: '#ccc2',
    borderBottomWidth: 4,
    borderRightColor: '#ccc2',
    borderRightWidth: 4,
    borderLeftColor: '#ccc2',
    borderLeftWidth: 1,
  },
  settingsListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    height: 40,
    width: '100%',

    paddingLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
});

export {screenWrapper, settingsListItem};
