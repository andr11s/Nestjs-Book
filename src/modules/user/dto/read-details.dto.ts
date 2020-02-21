import { IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ReadDetailsdto {
  @Expose()
  @IsString()
  readonly username: string;

  @Expose()
  @IsString()
  readonly lastname: string;
}
