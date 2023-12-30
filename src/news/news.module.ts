import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from './entities/news.entity';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { Movie } from '../movie/entities/movie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([News]), HttpModule, ConfigModule],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
