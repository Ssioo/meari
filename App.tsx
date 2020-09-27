import React, { useEffect } from 'react'
import { StatusBar } from 'react-native'
import * as eva from '@eva-design/eva'
import { NavigationContainer } from '@react-navigation/native'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { _navigationRef } from 'infra/navigation'
import { HomeStack } from 'navigators/root-stack'
import { mapping, theme } from 'infra/theme'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import SplashScreen from 'react-native-splash-screen'

const App = () => {
  useEffect(() => {
    SplashScreen.hide()
    return () => {}
  }, [])
  return (
    <>
      <StatusBar barStyle='dark-content' />
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
    </>
  )
}

export default App
