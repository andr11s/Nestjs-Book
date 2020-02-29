import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { Expose } from 'class-transformer';

export class UpdateBookDto {
  @IsString()
  @IsNotEmpty()
  readonly bookname: string;

  @IsString()
  @IsNotEmpty()
  readonly descriptions: string;
}
