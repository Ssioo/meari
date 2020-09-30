import { Dimensions, Platform } from 'react-native'

export const SERVER_BASE_URL = __DEV__
  ? 'http://18.224.20.121:3000/meari'//'http://localhost:3000/meari'
  : 'http://18.224.20.121:3000/meari'

export const WINDOW_WIDTH = Dimensions.get('window').width
export const WINDOW_HEIGHT = Dimensions.get('window').height

export const isIOS = Platform.OS === 'ios'
export const isAOS = Platform.OS === 'android'
