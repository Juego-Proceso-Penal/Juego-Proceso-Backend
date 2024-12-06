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
      username: 'user_proceso_24',
      password: 'lN1f2i[2!82mEh9M.BeX)&q',
      database: 'elprocesodb',
      autoLoadEntities: true,
      synchronize: true,
      ssl: false,
      // ssl: true,
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
