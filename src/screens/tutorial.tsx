import React from 'react'
import { SafeArea } from 'components/layout'
import { Text, TouchableOpacity } from 'react-native'
import { navigation } from 'infra/navigation'
import { COLOR } from 'infra/color'

export const TutorialScreen = () => (
  <SafeArea>
    <Text
      style={{
        color: COLOR.white,
        fontSize: 18,
        fontWeight: 'bold',
        alignItems: 'center',
        padding: 20,
      }}
    >
      튜토리얼 페이지 입니다.
    </Text>
    <TouchableOpacity
      onPress={() => {
        navigation.setRoot('Home')
      }}
      style={{
        position: 'absolute',
        bottom: 28,
        start: 20,
        end: 20,
        padding: 16,
        backgroundColor: COLOR.primary,
        alignItems: 'center',
        borderRadius: 4,
      }}
    >
      <Text style={{ color: COLOR.white, fontWeight: 'bold', fontSize: 14 }}>
        건너뛰기
      </Text>
    </TouchableOpacity>
  </SafeArea>
)
