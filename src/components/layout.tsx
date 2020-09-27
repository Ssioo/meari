import { SafeAreaView } from 'react-native'
import React from 'react'
import { COLOR } from 'infra/color'

export const SafeArea = ({ style, children }: any) => (
  <SafeAreaView style={[style, { flex: 1, backgroundColor: COLOR.background }]}>
    {children}
  </SafeAreaView>
)
