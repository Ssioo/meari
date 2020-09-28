import { action, observable } from 'mobx'
import { Masterpiece } from 'models/masterpiece'
import { masterpieceApi } from 'networks/masterpiece'
import { alert } from 'infra/utils'

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
}

export const masterpieceStore = new MasterpieceStore()
