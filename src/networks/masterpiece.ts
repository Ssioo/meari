import { BaseApi } from 'networks/base'
import { ApiError } from 'networks/error'
import { Masterpiece } from 'models/masterpiece'

class MasterpieceApi extends BaseApi {
  async getMasterpieces(): Promise<Masterpiece[]> {
    const res = await this.get('/pieces')
    if (res.code !== 200) throw new ApiError(res)
    return res.data
  }
}

export const masterpieceApi = new MasterpieceApi()
