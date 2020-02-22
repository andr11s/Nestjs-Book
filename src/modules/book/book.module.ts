import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookRepository } from './book-repository';
import { UserRepository } from '../user/user.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookRepository, UserRepository]),
    AuthModule,
  ],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
