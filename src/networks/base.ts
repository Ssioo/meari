import { SERVER_BASE_URL } from 'infra/constants'

let token: string | null = null
export const setToken = (t: string | null) => {
  token = t
}

export interface NetworkMessage {
  code: number
  data?: any
  msg?: string
}

export class BaseApi {
  get commonHeaders() {
    return {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': token || '',
    }
  }

  async get(path: string): Promise<NetworkMessage> {
    console.log(
      `GET ${SERVER_BASE_URL}${path}`,
      '\nheaders: ',
      this.commonHeaders,
    )
    const res = await fetch(`${SERVER_BASE_URL}${path}`, {
      method: 'GET',
      headers: this.commonHeaders,
    })
    const resJson = await res.json()
    console.log(
      `GET ${SERVER_BASE_URL}${path}\n${
        JSON.stringify(resJson) ?? '[Undefined]'
      }`,
    )
    return resJson
  }

  async post(path: string, body?: object): Promise<NetworkMessage> {
    console.log(
      `POST ${SERVER_BASE_URL}${path}`,
      '\nheaders: ',
      this.commonHeaders,
      '\nbody:',
      body,
    )
    const res = await fetch(`${SERVER_BASE_URL}${path}`, {
      method: 'POST',
      headers: this.commonHeaders,
      body: JSON.stringify(body),
    })
    const resJson = await res.json()
    console.log(
      `POST ${SERVER_BASE_URL}${path}\n${
        JSON.stringify(resJson) ?? '[Undefined]'
      }`,
    )
    return resJson
  }

  async put(path: string, body: object): Promise<NetworkMessage> {
    console.log(
      `PUT ${SERVER_BASE_URL}${path}`,
      '\nheaders: ',
      this.commonHeaders,
      '\nbody:',
      body,
    )
    const res = await fetch(`${SERVER_BASE_URL}${path}`, {
      method: 'PUT',
      headers: this.commonHeaders,
      body: JSON.stringify(body),
    })
    return await res.json()
  }

  async delete(path: string, body: object): Promise<NetworkMessage> {
    console.log(
      `DELETE ${SERVER_BASE_URL}${path}`,
      '\nheaders: ',
      this.commonHeaders,
      '\nbody:',
      body,
    )
    const res = await fetch(`${SERVER_BASE_URL}${path}`, {
      method: 'DELETE',
      headers: this.commonHeaders,
      body: JSON.stringify(body),
    })
    return await res.json()
  }
}
