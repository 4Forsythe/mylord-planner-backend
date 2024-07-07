import {
  Injectable,
  NotFoundException,
  BadRequestException,
  UnauthorizedException
} from '@nestjs/common'

import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'

import { verify } from 'argon2'
import { Response } from 'express'

import { AuthDto } from './dto/auth.dto'
import { UserService } from 'src/user/user.service'

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private userService: UserService,
    private configService: ConfigService
  ) {}

  EXPIRE_DAY_REFRESH_TOKEN = 1
  REFRESH_TOKEN_NAME = 'refreshToken'

  async login(dto: AuthDto) {
    const { password, ...user } = await this.validateUser(dto)
    const tokens = this.issueTokens(user.id)

    return { user, ...tokens }
  }

  async register(dto: AuthDto) {
    const anotherUser = await this.userService.getByEmail(dto.email)

    if (anotherUser)
      throw new BadRequestException('This user is already exists')

    const { password, ...user } = await this.userService.create(dto)
    const tokens = this.issueTokens(user.id)

    return { user, ...tokens }
  }

  private issueTokens(userId: string) {
    const data = { id: userId }

    const accessToken = this.jwt.sign(data, {
      expiresIn: '1h'
    })

    const refreshToken = this.jwt.sign(data, {
      expiresIn: '14d'
    })

    return { accessToken, refreshToken }
  }

  private async validateUser(dto: AuthDto) {
    const user = await this.userService.getByEmail(dto.email)

    if (!user) throw new NotFoundException('This user is not found')

    const isValid = await verify(user.password, dto.password)

    if (!isValid) throw new UnauthorizedException('User password is invalid')

    return user
  }

  async getTokens(refreshToken: string) {
    const userToken = await this.jwt.verifyAsync(refreshToken)

    if (!userToken) throw new UnauthorizedException('Refresh token is invalid')

    const { password, ...user } = await this.userService.getById(userToken.id)
    const tokens = this.issueTokens(user.id)

    return {
      user,
      ...tokens
    }
  }

  createRefreshToken(res: Response, refreshToken: string) {
    const expiresIn = new Date()
    expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN)

    res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
      httpOnly: true,
      secure: true,
      domain: this.configService.get('SITE_DOMAIN'),
      expires: expiresIn,
      sameSite: 'lax'
    })
  }

  removeRefreshToken(res: Response) {
    res.cookie(this.REFRESH_TOKEN_NAME, '', {
      httpOnly: true,
      secure: true,
      domain: this.configService.get('SITE_DOMAIN'),
      expires: new Date(0),
      sameSite: 'lax'
    })
  }
}
