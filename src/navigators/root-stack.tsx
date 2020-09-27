import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack'
import React from 'react'
import { HomeScreen } from 'screens/home'

const Stack = createStackNavigator()
export const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={() => ({
        ...TransitionPresets.SlideFromRightIOS,
        headerShown: false,
      })}
    >
      <Stack.Screen name='Home' component={HomeScreen} />
    </Stack.Navigator>
  )
}
