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

  zipColor(hex: string): string {
    const zippedR = Math.floor(parseInt(hex.substr(1, 2), 16) / 8) * 8
    const zippedG = Math.floor(parseInt(hex.substr(3, 2), 16) / 8) * 8
    const zippedB = Math.floor(parseInt(hex.substr(5, 2), 16) / 8) * 8
    return `#${zippedR
      .toString(16)
      .toUpperCase()
      .padStart(2, '0')}${zippedG
      .toString(16)
      .toUpperCase()
      .padStart(2, '0')}${zippedB.toString(16).toUpperCase().padStart(2, '0')}`
  }

  constructor() {
    reaction(
      () => this.selectedColor,
      (color) => {
        if (!color) return
        const truncatedColor = this.zipColor(color)
        const foundSound = soundStore.colorSounds.find(
          (item) => item.hex === truncatedColor,
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
