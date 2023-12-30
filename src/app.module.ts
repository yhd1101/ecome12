import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovieModule } from './movie/movie.module';
import { AppConfigModule } from './common/config/config.module';
import { DatabaseModule } from './database/database.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ChampionModule } from './champion/champion.module';
import { NewsModule } from './news/news.module';

@Module({
  imports: [
    AppConfigModule,
    MovieModule,
    DatabaseModule,
    ScheduleModule.forRoot(),
    ChampionModule,
    NewsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
