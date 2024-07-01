import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeorm from './config/typeorm';
import { AuthorsModule } from './controllers/authors/authors.module';
import { BooksModule } from './controllers/books/books.module';
import { GenresModule } from './controllers/genres/genres.module';
import { AuthModule } from './controllers/auth/auth.module';
import { RolesMiddleware } from './middlewares/roles.middleware';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '@services/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => (configService.get('typeorm'))
    }),
    AuthorsModule, 
    BooksModule,
    GenresModule,
    AuthModule,
    UserModule,
    JwtModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { 
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RolesMiddleware)
      .forRoutes('authors', 'books', 'genres', 'users');
  }
}