import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '54.86.192.86',
      port: 5432,
      username: 'elprocesoenj_elprocesoenj',
      password: 'elprocesoenj_elprocesoenj',
      database: 'juego_proceso_db',
      // host: 'dpg-cnd6a9acn0vc73f5dk2g-a.oregon-postgres.render.com',
      // host: 'dpg-cri9kkt2ng1s73dj1iv0-a.oregon-postgres.render.com',
      // port: 5432,
      // username: 'juego_proceso',
      // password: 'GbDbYwzNXNt4Hg162qyt1BQgn6cgPLm2',
      // database: 'juego_proceso_p2sd',
      // JWT_SECRET="no utilizar esta palabra en producción"
      // host: process.env.POSTGRES_HOST,
      // port: parseInt(process.env.PORT),
      // username: process.env.POSTGRES_USERNAME,
      // password: process.env.POSTGRES_PASSWORD,
      // database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
      ssl: false,
      // extra: {
      //   ssl:
      //     'true' === 'true'
      //       ? {
      //           rejectUnauthorized: false,
      //         }
      //       : null,
      // },
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
