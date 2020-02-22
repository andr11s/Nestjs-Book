import { IsString, IsNotEmpty } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  readonly bookname: string;

  @IsString()
  @IsNotEmpty()
  readonly descriptions: string;

  @IsNotEmpty()
  readonly authors: number[];
}
