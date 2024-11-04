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
      // host: 'dpg-cq11touehbks73ekt8r0-a.oregon-postgres.render.com',
      // port: 5432,
      // username: 'juego_proceso',
      // password: 'bv8WrFVEZJyZZT1Cm0vfiABSD9Ocw1ZM',
      // database: 'juego_proceso_o2nt',
      // JWT_SECRET="no utilizar esta palabra en producción"
      // host: process.env.POSTGRES_HOST,
      // port: parseInt(process.env.PORT),
      // username: process.env.POSTGRES_USERNAME,
      // password: process.env.POSTGRES_PASSWORD,
      // database: process.env.POSTGRES_DATABASE,
      // TO USE LATER
      // host: 'elproceso.enj.org',
      // port: 5432,
      // username: 'elprocesoenj_elprocesoenj',
      // password: 'elprocesoenj_elprocesoenj',
      // database: 'juego_proceso_db',

      // TEMPORAL
      host: 'dpg-csk26klds78s73962d0g-a.oregon-postgres.render.com',
      port: 5432,
      username: 'juego_proceso_30m8_user',
      password: 'rP2RS9XvnMZw9ymgcV5O80MCXyANTbkF',
      database: 'juego_proceso_30m8',
      autoLoadEntities: true,
      synchronize: true,
      ssl: true,
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
