import {
  Injectable,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookRepository } from './book-repository';
import { UserRepository } from '../user/user.repository';
import { ReadBookDto } from './dtos/read-book.dto';
import { plainToClass } from 'class-transformer';
import { BookEntity } from './book.entity';
import { In, Not } from 'typeorm';
import { CreateBookDto } from './dtos/create-book.dto';
import { UserEntity } from '../user/user.entity';
import { RoleEntity } from '../role/role.entity';
import { RoleType } from '../role/rolestypes.enum';
import { UpdateBookDto } from './dtos/update-book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookRepository)
    private readonly _BookRepository: BookRepository,
    @InjectRepository(UserRepository)
    private readonly _UserRepository: UserRepository,
  ) {}

  async get(bookid: number): Promise<ReadBookDto> {
    if (bookid) {
      throw new BadRequestException('book id  must to sent');
    }

    const book: BookEntity = await this._BookRepository.findOne(bookid, {
      where: { status: 'ACTIVE' },
    });

    if (!book) {
      throw new NotFoundException('book does not exist');
    }

    return plainToClass(ReadBookDto, book);
  }

  async getAll(): Promise<ReadBookDto[]> {
    const book: BookEntity[] = await this._BookRepository.find({
      where: { status: 'ACTIVE' },
    });

    return book.map((books: BookEntity) => plainToClass(ReadBookDto, books));
  }

  async getBookAuthor(authorid: number): Promise<ReadBookDto[]> {
    if (!authorid) {
      throw new BadRequestException('id must be sent');
    }

    const books: BookEntity[] = await this._BookRepository.find({
      where: { status: 'ACTIVE', authors: In([authorid]) },
    });

    return books.map((book: BookEntity) => plainToClass(ReadBookDto, book));
  }

  async create(book: Partial<CreateBookDto>): Promise<ReadBookDto> {
    const authors: UserEntity[] = [];

    for (const authorsid of book.authors) {
      const authorExist = await this._UserRepository.findOne(authorsid, {
        where: { status: 'ACTIVE' },
      });
      if (!authorExist) {
        throw new UnauthorizedException(
          `theres not an author with id: ${authorsid}`,
        );
      }

      authors.push(authorExist);
    }

    const savebook = await this._BookRepository.save({
      bookname: book.bookname,
      descriptions: book.descriptions,
      authors,
    });

    return plainToClass(ReadBookDto, savebook);
  }

  async createByAuthor(
    book: Partial<CreateBookDto>,
    authorid: number,
  ): Promise<ReadBookDto> {
    const author = await this._UserRepository.findOne(authorid, {
      where: { status: 'ACTIVE' },
    });

    const isAuthor = author.roles.some(
      (role: RoleEntity) => role.RoleName === RoleType.AUTHOR,
    );

    if (!author) {
      throw new UnauthorizedException(`This user ${authorid} is not an author`);
    }

    const savebook = await this._BookRepository.save({
      bookname: book.bookname,
      descriptions: book.descriptions,
      author,
    });
    return plainToClass(ReadBookDto, savebook);
  }

  async update(
    bookid: number,
    role: Partial<UpdateBookDto>,
    authorid: number,
  ): Promise<ReadBookDto> {
    const bookExist = await this._BookRepository.findOne(bookid, {
      where: { status: 'ACTIVE' },
    });

    if (!bookExist) {
      throw new NotFoundException('this book does not exist');
    }

    const isOwnBook = bookExist.authors.some(
      author => author.userid === authorid,
    );

    if (!isOwnBook) {
      throw new UnauthorizedException('this user isnt  the books author');
    }

    const updatebook = await this._BookRepository.update(bookid, role);
    return plainToClass(ReadBookDto, updatebook);
  }

  async delete(bookid: number): Promise<void> {
    const bookExist = this._BookRepository.findOne(bookid, {
      where: { status: 'ACTIVE' },
    });

    if (!bookExist) {
      throw new NotFoundException('this book does not exist');
    }

    await this._BookRepository.update(bookid, { status: 'INACTIVE' });
  }
}
