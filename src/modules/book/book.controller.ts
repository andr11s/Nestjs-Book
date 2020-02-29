import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
  UseGuards,
  Patch,
  Delete,
} from '@nestjs/common';
import { BookService } from './book.service';
import { ReadBookDto } from './dtos/read-book.dto';
import { CreateBookDto } from './dtos/create-book.dto';
import { Roles } from '../role/decorators/role.decorators';
import { RoleType } from '../role/rolestypes.enum';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '../role/guards/role.guard';
import { GetUser } from '../auth/user.decorator';
import { UpdateBookDto } from './dtos/update-book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly _Bookservice: BookService) {}

  @Get(':id')
  getbook(@Param('id', ParseIntPipe) id: number): Promise<ReadBookDto> {
    return this._Bookservice.get(id);
  }

  @Get('author/:authorid')
  getbyauthor(
    @Param('authorid', ParseIntPipe) authorid: number,
  ): Promise<ReadBookDto[]> {
    return this._Bookservice.getBookAuthor(authorid);
  }

  @Get()
  getall(): Promise<ReadBookDto[]> {
    return this._Bookservice.getAll();
  }

  @Post('create-book')
  @Roles(RoleType.AUTHOR)
  @UseGuards(AuthGuard(), RoleGuard)
  createBook(
    @Body() book: Partial<CreateBookDto>,
    @GetUser('id') authorid: number,
  ): Promise<ReadBookDto> {
    return this._Bookservice.create(book);
  }

  @Roles(RoleType.AUTHOR)
  @UseGuards(AuthGuard(), RoleGuard)
  @Post('create-book-author')
  createBookByAuthor(
    @Body() book: Partial<CreateBookDto>,
    @GetUser('id') authorid: number,
  ): Promise<ReadBookDto> {
    return this._Bookservice.createByAuthor(book, authorid);
  }

  @Patch(':id')
  updateBook(
    @Param('id', ParseIntPipe) bookid: number,
    @Body() book: Partial<UpdateBookDto>,
    @GetUser('id') authorid: number,
  ): Promise<ReadBookDto> {
    return this._Bookservice.update(bookid, book, authorid);
  }

  @Delete(':id')
  deletebook(@Param('id', ParseIntPipe) bookid: number): Promise<void> {
    return this._Bookservice.delete(bookid);
  }
}
