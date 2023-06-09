import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { ChangePasswordDto } from 'src/routes/auth/dtos/change.password.dto'
import { UserBodyDto } from 'src/routes/auth/dtos/user.body.dto'

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async existsByUsername(username: string) {
    const exists = await this.prisma.user.findUnique({
      where: {
        username,
      },
    })
    return exists
  }

  async existsByUser(userId: number) {
    const exists = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    })
    return exists
  }

  async createUser({ username, password }: UserBodyDto) {
    const user = await this.prisma.user.create({
      data: {
        username,
        password,
      },
    })
    return user
  }

  async createTokenItem(userId: number) {
    const token = await this.prisma.token.create({
      data: {
        userId,
      },
    })
    return token
  }

  async tokenUpdate(
    tokenId: number,
    data: { blocked?: boolean; rotationCounter?: number },
  ) {
    await this.prisma.token.update({
      where: {
        id: tokenId,
      },
      data,
    })
  }

  async getTokenItem(tokenId: number) {
    const tokenItem = await this.prisma.token.findUnique({
      where: {
        id: tokenId,
      },
      include: {
        user: true,
      },
    })
    return tokenItem
  }

  async changePassword({
    changePassword,
    userId,
  }: Pick<ChangePasswordDto, 'changePassword'> & { userId: number }) {
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: changePassword,
      },
    })
  }

  async unRegister(userId: number) {
    await this.prisma.user.delete({
      where: {
        id: userId,
      },
    })
  }
}
