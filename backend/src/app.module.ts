import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UrlModule } from './url/url.module'; // optional

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: +(process.env.DB_PORT || 5432),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'url_shortener',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    AuthModule, // 👈 make sure this line is present
    UrlModule,
  ],
})
export class AppModule {}
