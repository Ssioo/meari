import React, { useEffect } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeArea } from 'components/layout'
import { masterpieceStore } from 'stores/masterpiece'
import { Masterpiece } from 'models/masterpiece'
import { observer } from 'mobx-react'
import { COLOR } from 'infra/color'
import { WINDOW_HEIGHT } from 'infra/constants'
import { navigation } from 'infra/navigation'
import { soundStore } from 'stores/sound'
import Swiper from 'react-native-swiper'

export const HomeScreen = () => {
  useEffect(() => {
    masterpieceStore.fetchMasterpieces()
    soundStore.fetchSounds()
      return () => {
        soundStore.destroyPlayers()
      }
  }, [])
  return (
    <SafeArea>
      <Text
        style={{
          color: COLOR.white,
          alignSelf: 'center',
          fontSize: 24,
          fontWeight: 'bold',
          marginTop: 30,
        }}
      >
        듣고 싶은 작품을 선택해주세요.
      </Text>
      <GalleryPager />
    </SafeArea>
  )
}

const GalleryPager = observer(() => {
  if (masterpieceStore.pieces.length === 0) return null
  return (
    <Swiper>
      {masterpieceStore.pieces.map((item) => (
        <GalleryItem key={item.id} piece={item} />
      ))}
    </Swiper>
  )
})

const GalleryItem: React.FC<{ piece: Masterpiece }> = ({ piece }) => (
  <TouchableOpacity
    style={styles.pageContainer}
    onPress={() => {
      masterpieceStore.selectedPiece = piece
      navigation.navigate('Masterpiece')
    }}
  >
    <Image
      source={{ uri: piece.img }}
      style={{ width: '100%', flex: 1, resizeMode: 'cover', borderRadius: 12 }}
    />
    <View style={{ position: 'absolute', bottom: 80, marginHorizontal: 40 }}>
      <Text
        style={{
          color: COLOR.white,
          fontSize: 16,
          fontStyle: 'italic',
          marginBottom: 8,
        }}
      >
        {piece.author}
      </Text>
      <Text
        style={{
          color: COLOR.white,
          fontSize: 24,
          fontWeight: 'bold',
          fontStyle: 'italic',
        }}
      >
        {piece.name}
      </Text>
    </View>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  pageContainer: {
    height: WINDOW_HEIGHT - 200,
    padding: 20,
    marginTop: 20,
  },
})
