import { NetworkMessage } from './base'

export class ApiError extends Error {
  constructor(errMsg: string | NetworkMessage) {
    super(`${errMsg}`)
  }
}
