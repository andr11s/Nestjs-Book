import { IsNumber, IsNotEmpty } from 'class-validator';
import { ReadDetailsdto } from './read-details.dto';
import { Type } from 'class-transformer';

export class ReadUserDto {
  @IsNumber()
  readonly id: number;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  username: string;

  @Type(type => ReadDetailsdto)
  readonly details: ReadDetailsdto;
}
