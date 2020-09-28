import { action, computed, observable } from 'mobx'
import { alert } from 'infra/utils'
import { soundApi } from 'networks/sound'
import { ColorSound, Sound } from 'models/sound'
import { Player } from '@react-native-community/audio-toolkit'

class SoundStore {
  @observable sounds: Sound[] = []
  @observable colorSounds: ColorSound[] = []

  @computed get playableSounds(): Map<string, Player> {
    const result = new Map<string, Player>()
    this.sounds.forEach((value) => {
      result.set(
        value.name,
        new Player(value.sound, {
          mixWithOthers: true,
        }).prepare((e) => console.log('Prepare ', value.name, e ?? 'Success')),
      )
    })
    return result
  }

  @action
  async fetchSounds() {
    try {
      this.sounds = await soundApi.getSounds()
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
}

export const soundStore = new SoundStore()
