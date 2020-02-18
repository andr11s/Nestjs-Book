import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Module({
  imports: [...DatabaseService],
  exports: [...DatabaseService],
})
export class DatabaseModule {}
