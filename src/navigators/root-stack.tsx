import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack'
import React from 'react'
import { HomeScreen } from 'screens/home'
import { TutorialScreen } from 'screens/tutorial'
import { MasterpieceScreen } from 'screens/masterpiece'
import { COLOR } from 'infra/color'

const Stack = createStackNavigator()
export const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={() => ({
        ...TransitionPresets.SlideFromRightIOS,
        headerShown: true,
        headerStyle: {
          backgroundColor: COLOR.dark,
        },
        headerTintColor: COLOR.white,
      })}
    >
      <Stack.Screen
        name='Tutorial'
        component={TutorialScreen}
        options={{ title: '튜토리얼' }}
      />
      <Stack.Screen
        name='Home'
        component={HomeScreen}
        options={{ title: '메아리' }}
      />
      <Stack.Screen
        name='Masterpiece'
        component={MasterpieceScreen}
        options={{ title: '작품' }}
      />
    </Stack.Navigator>
  )
}
