import {
  Controller,
  Req,
  Res,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UnauthorizedException
} from '@nestjs/common'

import type { Request, Response } from 'express'

import { AuthDto } from './dto/auth.dto'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body() dto: AuthDto, @Res({ passthrough: true }) res: Response) {
    const { refreshToken, ...response } = await this.authService.login(dto)
    this.authService.createRefreshToken(res, refreshToken)

    return response
  }

  @Post('login/access')
  async getTokens(
    @Req() req: Request,
    @Res({ passthrough: true })
    res: Response
  ) {
    const refreshTokenFromCookies =
      req.cookies[this.authService.REFRESH_TOKEN_NAME]

    if (!refreshTokenFromCookies) {
      this.authService.removeRefreshToken(res)
      throw new UnauthorizedException('Refresh token is not passed')
    }

    const { refreshToken, ...response } = await this.authService.getTokens(
      refreshTokenFromCookies
    )

    this.authService.createRefreshToken(res, refreshToken)

    return response
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(
    @Body() dto: AuthDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const { refreshToken, ...response } = await this.authService.register(dto)
    this.authService.createRefreshToken(res, refreshToken)

    return response
  }

  @Post('logout')
  @UsePipes(new ValidationPipe())
  async logout(@Res({ passthrough: true }) res: Response) {
    this.authService.removeRefreshToken(res)

    return true
  }
}
