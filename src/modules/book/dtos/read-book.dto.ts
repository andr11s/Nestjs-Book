import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { Expose, Exclude, Type } from 'class-transformer';
import { ReadUserDto } from '../../user/dto/read-user.dto';

@Exclude()
export class ReadBookDto {
  @Expose()
  @IsNumber()
  readonly bookid: number;

  @Expose()
  @IsString()
  readonly bookname: string;

  @Expose()
  @IsString()
  readonly descriptions: string;

  @Expose()
  @Type(type => ReadUserDto)
  readonly authors: ReadUserDto;
}
