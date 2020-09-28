import { action, observable, reaction } from 'mobx'
import { Masterpiece } from 'models/masterpiece'
import { masterpieceApi } from 'networks/masterpiece'
import { alert } from 'infra/utils'
import { soundStore } from 'stores/sound'

class MasterpieceStore {
  @observable pieces: Masterpiece[] = []
  @observable selectedPiece: Masterpiece | null = null
  @observable selectedColor: string | null = null

  @action
  async fetchMasterpieces() {
    try {
      this.pieces = await masterpieceApi.getMasterpieces()
    } catch (e) {
      alert(e.message)
    }
  }

  constructor() {
    reaction(
      () => this.selectedColor,
      (color) => {
        if (!color) return
        const foundSound = soundStore.colorSounds.find(
          (item) => item.color === color,
        )
        if (!foundSound) return
        const foundPlayer = soundStore.playableSounds.get(foundSound.sound)
        if (!foundPlayer) return
        foundPlayer.play((e) =>
          console.log('Play ', foundSound.sound, e ?? 'Success'),
        )
      },
    )
  }
}

export const masterpieceStore = new MasterpieceStore()
