import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateBookDto {
  @IsString()
  @IsNotEmpty()
  readonly bookname: string;

  @IsString()
  @IsNotEmpty()
  readonly descriptions: string;
}
