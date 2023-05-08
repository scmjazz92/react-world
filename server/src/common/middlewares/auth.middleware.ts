import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response } from 'express'
import { JsonWebTokenError } from 'jsonwebtoken'
import { AccessTokenPayload } from 'src/routes/auth/schema'
import { JwtService } from 'src/services/jwt.service'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly JwtService: JwtService) {}

  async use(req: Request, res: Response, next: () => void) {
    req.user = (await this.verifyUser(req)) ?? null
    return next()
  }

  async verifyUser(req: Request) {
    const token = req.headers.authorization?.split('Bearer ')[1]
    const refreshToken = (req.headers?.refresh_token ?? '') as string

    if (refreshToken && !token) {
      req.isExpiredToken = true
      return
    }

    if (!token) return

    try {
      const decoded = await this.JwtService.validateToken<AccessTokenPayload>(
        token,
      )

      if (decoded.type === 'access_token') {
        return {
          id: decoded.userId,
          username: decoded.username,
        }
      }

      return null
    } catch (error: any) {
      if (error instanceof JsonWebTokenError) {
        if (error.name === 'TokenExpiredError') {
          req.isExpiredToken = true
        }
      }
    }
  }
}

declare module 'express' {
  interface Request {
    user: {
      id: number
      username: string
    } | null
    isExpiredToken: boolean
  }
}
