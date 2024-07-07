import { NestFactory } from '@nestjs/core'

import * as cookieParser from 'cookie-parser'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix('api')
  app.use(cookieParser())

  app.enableCors({
    origin: [/^(.*)/],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 200,
    exposedHeaders: 'set-cookie'
  })

  await app.listen(5000)
}

bootstrap()
