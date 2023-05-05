import { Injectable } from '@nestjs/common'
import * as jwt from 'jsonwebtoken'
import { AccessTokenPayload, RefreshTokenPayload } from 'src/routes/auth/schema'

const tokenDuration = {
  access_token: '1m',
  refresh_token: '30d',
}

type DecodedToken<T> = {
  iat: number
  exp: number
} & T

type TokenPayload = AccessTokenPayload | RefreshTokenPayload

@Injectable()
export class JwtService {
  async generateToken(payload: TokenPayload) {
    return new Promise<string>((resolve, reject) => {
      jwt.sign(
        payload,
        process.env.JWT_SECRET_KEY,
        { expiresIn: tokenDuration[payload.type] },
        (error, token) => {
          if (error || !token) {
            reject(error)
            return
          }
          resolve(token)
        },
      )
    })
  }

  async validateToken<T>(token: string) {
    return new Promise<DecodedToken<T>>((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET_KEY, (error, decoded) => {
        if (error) {
          reject(error)
        }
        resolve(decoded as DecodedToken<T>)
      })
    })
  }
}
