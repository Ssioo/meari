import { SafeArea } from 'components/layout'
import React, { useEffect, useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { masterpieceStore } from 'stores/masterpiece'
import { COLOR } from 'infra/color'
import { soundStore } from 'stores/sound'
import { Sound } from 'models/sound'
import GetPixelColor from 'react-native-get-pixel-color'
import { observer } from 'mobx-react'

export const MasterpieceScreen = () => {
  useEffect(() => {
    GetPixelColor.setImage(masterpieceStore.selectedPiece?.img!!)
      .then(() => {
        console.log('success')
      })
      .catch((e: any) => {
        console.log(e)
      })
    const interval = setInterval(() => {
      setPickThrottle(true)
    }, 500)
    return () => {
      masterpieceStore.selectedPiece = null
      clearInterval(interval)
    }
  }, [])
  const [pickThrottle, setPickThrottle] = useState(true)
  return (
    <SafeArea>
      <Text
        style={{
          alignSelf: 'center',
          color: COLOR.white,
          fontWeight: 'bold',
          fontSize: 20,
          marginTop: 20,
        }}
      >
        화면을 터치해주세요.
      </Text>
      <CurrentColorInfo />
      <View
        style={{ flex: 1, borderColor: COLOR.dark, borderWidth: 0.5 }}
        onTouchStart={async (e) => {
          masterpieceStore.selectedColor = await GetPixelColor.pickColorAt(
            e.nativeEvent.locationX,
            e.nativeEvent.locationY,
          )
        }}
        onTouchMove={async ({ nativeEvent }) => {
          if (!pickThrottle) return
          setPickThrottle(false)
          masterpieceStore.selectedColor = await GetPixelColor.pickColorAt(
            nativeEvent.locationX,
            nativeEvent.locationY,
          )
        }}
      >
        <Image
          source={{ uri: masterpieceStore.selectedPiece?.img }}
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
          }}
          onLayout={({ nativeEvent }) => {
            console.log(
              nativeEvent.layout.height,
              nativeEvent.layout.width,
              nativeEvent.layout.x,
              nativeEvent.layout.y,
            )
          }}
        />
      </View>
      <ColorSoundHelper />
    </SafeArea>
  )
}

const CurrentColorInfo = observer(() => (
  <View
    style={{
      paddingVertical: 8,
      paddingHorizontal: 20,
      flexDirection: 'row',
      alignItems: 'center',
    }}
  >
    <View
      style={{
        width: 40,
        height: 40,
        borderWidth: 1,
        borderColor: COLOR.white,
        backgroundColor: masterpieceStore.selectedColor ?? 'transparent',
      }}
    />
    <Text
      style={{
        color: COLOR.white,
        fontSize: 16,
        marginLeft: 20,
      }}
    >
      {masterpieceStore.selectedColor}
    </Text>
  </View>
))

const ColorSoundHelper = () => (
  <View
    style={{ marginVertical: 10, flexDirection: 'row', alignSelf: 'center' }}
  >
    <ColorItem
      color='#FF0000'
      name='도'
      sound={soundStore.sounds.find((item) => item.name === 'C1')}
    />
    <ColorItem
      color='#FFFF00'
      name='레'
      sound={soundStore.sounds.find((item) => item.name === 'D1')}
    />
    <ColorItem
      color='#0000FF'
      name='미'
      sound={soundStore.sounds.find((item) => item.name === 'E1')}
    />
    <ColorItem
      color='#FF00FF'
      name='파'
      sound={soundStore.sounds.find((item) => item.name === 'F1')}
    />
    <ColorItem
      color='#00FF00'
      name='솔'
      sound={soundStore.sounds.find((item) => item.name === 'G1')}
    />
  </View>
)

const ColorItem: React.FC<{ color: string; name: string; sound?: Sound }> = ({
  color,
  name,
  sound,
}) => (
  <TouchableOpacity
    onPress={() => {
      if (!sound) return
      const player = soundStore.playableSounds.get(sound.name)
      if (!player) return
      if (player.isPlaying) {
        player.seek(0, (e) =>
          console.log('Restart on: ', sound.name, e ?? 'Success'),
        )
      } else {
        player.play((e) => {
          console.log('Play on:', sound.name, e ?? 'Success')
        })
      }
    }}
    style={{ alignItems: 'center', marginHorizontal: 10 }}
  >
    <View
      style={{
        width: 48,
        height: 48,
        borderRadius: 100,
        backgroundColor: color,
        borderColor: COLOR.white,
        borderWidth: 2,
      }}
    />
    <Text
      style={{
        color: COLOR.white,
        fontSize: 16,
        marginTop: 4,
      }}
    >
      {name}
    </Text>
  </TouchableOpacity>
)
