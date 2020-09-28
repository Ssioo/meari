import { BaseApi } from 'networks/base'
import { Sound } from 'models/sound'
import { ApiError } from 'networks/error'

class SoundApi extends BaseApi {
  async getSounds(): Promise<Sound[]> {
    const res = await this.get('/sounds')
    if (res.code !== 200) throw new ApiError(res)
    return res.data
  }
}

export const soundApi = new SoundApi()
