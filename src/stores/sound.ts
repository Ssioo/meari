import { action, observable } from 'mobx'
import { alert } from 'infra/utils'
import { soundApi } from 'networks/sound'
import { ColorSound, Sound } from 'models/sound'
import { Player } from '@react-native-community/audio-toolkit'

class SoundStore {
  @observable sounds: Sound[] = []
  @observable colorSounds: ColorSound[] = []
  @observable playableSounds: Map<string, Player> = new Map<string, Player>()

  @action
  async fetchSounds() {
    try {
      this.sounds = await soundApi.getSounds()
      this.createPlayers(this.sounds)
    } catch (e) {
      alert(e.message)
    }
  }

  @action
  async fetchColorSounds() {
    try {
      this.colorSounds = await soundApi.getColorSounds()
    } catch (e) {
      alert(e.message)
    }
  }

  @action
  createPlayers(sounds: Sound[]) {
    sounds.forEach((value) => {
      const player = new Player(value.sound, {
        autoDestroy: false,
        mixWithOthers: true,
      })
      //player.speed = 0.0
      this.playableSounds.set(
        value.name,
        player.prepare((e) => {
          console.log('Prepare ', value.name, e ?? 'Success')
          //player.speed = 1.0
        }),
      )
    })
  }

  @action
  destroyPlayers() {
    this.playableSounds.forEach((value, key) => {
      if (value)
        value.destroy((e) => console.log(key, ' Destroyed: ', e ?? 'Success'))
    })
  }
}

export const soundStore = new SoundStore()
