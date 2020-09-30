import React, { useEffect } from 'react'
import { StatusBar } from 'react-native'
import * as eva from '@eva-design/eva'
import { NavigationContainer } from '@react-navigation/native'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { _navigationRef, setIsNavigationReady } from 'infra/navigation'
import { HomeStack } from 'navigators/root-stack'
import { mapping, theme } from 'infra/theme'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import SplashScreen from 'react-native-splash-screen'
import { Alert } from 'components/alert'
import {COLOR} from 'infra/color'

export const App = () => {
  useEffect(() => {
    setIsNavigationReady(true)
    SplashScreen.hide()
    return () => {
      setIsNavigationReady(false)
    }
  }, [])
  return (
    <>
      <StatusBar barStyle='light-content' backgroundColor={COLOR.dark} />
      <IconRegistry icons={[EvaIconsPack]} />
      <ApplicationProvider
        {...eva}
        theme={{ ...eva.light, ...theme }}
        // @ts-ignore
        customMapping={mapping}
      >
        <NavigationContainer ref={_navigationRef}>
          <HomeStack />
        </NavigationContainer>
      </ApplicationProvider>
      <Alert />
    </>
  )
}
