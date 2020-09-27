import { NavigationContainerRef } from '@react-navigation/core'
import { CommonActions } from '@react-navigation/native'
// import { TransitionPresets } from '@react-navigation/stack'
import React from 'react'

// https://reactnavigation.org/docs/navigating-without-navigation-prop/#handling-initialization
let _isNavigationReady: boolean = false
export const setIsNavigationReady = (isReady: boolean) => {
  _isNavigationReady = isReady
}
export const _navigationRef = React.createRef<NavigationContainerRef>()

export const navigation = {
  navigate: (name: string, params?: object) => {
    if (!_isNavigationReady) return
    _navigationRef.current?.navigate(name, params)
  },
  setRoot(name: string) {
    if (!_isNavigationReady) return
    _navigationRef.current?.dispatch(
      CommonActions.reset({
        index: 0,
        // @ts-ignore
        routes: [{ name }],
      }),
    )
  },
  goBack() {
    if (!_isNavigationReady) return
    _navigationRef.current?.goBack()
  },
}

export const ScreenOptions = () => ({
  // ...TransitionPresets.SlideFromRightIOS,
})

export const SetModal = 'modal'

export enum ModalOptions {
  MODAL = 'modal',
}
