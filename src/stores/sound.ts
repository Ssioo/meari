import { action, computed, observable } from 'mobx'
import { alert } from 'infra/utils'
import { soundApi } from 'networks/sound'
import { Sound } from 'models/sound'
import PlaySound from 'react-native-sound'

class SoundStore {
  @observable sounds: Sound[] = []

  @action
  async fetchSounds() {
    try {
      this.sounds = await soundApi.getSounds()
    } catch (e) {
      alert(e.message)
    }
  }

  @computed get playableSounds(): Map<string, PlaySound> {
    const result = new Map<string, PlaySound>()
    //PlaySound.setCategory('Playback')
    this.sounds.forEach((value) => {
      result.set(
        value.name,
        new PlaySound(value.song, (error) => {
          console.log(error)
        }),
      )
    })
    return result
  }
}

export const soundStore = new SoundStore()
