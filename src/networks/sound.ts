import { BaseApi } from 'networks/base'
import { ColorSound, Sound } from 'models/sound'
import { ApiError } from 'networks/error'

class SoundApi extends BaseApi {
  async getSounds(): Promise<Sound[]> {
    const res = await this.get('/sounds')
    if (res.code !== 200) throw new ApiError(res)
    return res.data
  }

  async getColorSounds(): Promise<ColorSound[]> {
    const res = await this.get('/sounds/colors')
    if (res.code !== 200) throw new ApiError(res)
    return res.data
  }
}

export const soundApi = new SoundApi()
