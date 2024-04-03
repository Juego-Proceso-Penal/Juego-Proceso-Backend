import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/entities/user.entity';
import { UserScore } from './users/entities/user-score.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserScore]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'dpg-cnd6a9acn0vc73f5dk2g-a.oregon-postgres.render.com',
      port: 5432,
      username: 'proceso',
      password: 'Nxd7nJEnEyQ7jCnqIgGEi6oEefDGmboA',
      database: 'juego_proceso',
      // JWT_SECRET="no utilizar esta palabra en producción"
      // host: process.env.POSTGRES_HOST,
      // port: parseInt(process.env.PORT),
      // username: process.env.POSTGRES_USERNAME,
      // password: process.env.POSTGRES_PASSWORD,
      // database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
      ssl: 'true' === 'true',
      extra: {
        ssl:
          'true' === 'true'
            ? {
                rejectUnauthorized: false,
              }
            : null,
      },
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
