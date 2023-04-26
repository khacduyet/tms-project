import { Dimensions, Platform, StatusBar } from 'react-native';

export function isIphoneX() {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTV &&
    (dimen.height === 780 ||
      dimen.width === 780 ||
      (dimen.height === 812 || dimen.width === 812) ||
      (dimen.height === 844 || dimen.width === 844) ||
      (dimen.height === 896 || dimen.width === 896) ||
      (dimen.height === 926 || dimen.width === 926))
  );
}

export function verticalSafeTopMargin() {
  return Platform.select({
    ios: isIphoneX() ? 44 : 20,
    android: StatusBar.currentHeight,
    default: 0,
  });
}

export function verticalSafeBottomMargin() {
  return Platform.select({
    ios: isIphoneX() ? 34 : 0,
    android: 5,
    default: 5,
  });
}
