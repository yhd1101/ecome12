import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovieModule } from './movie/movie.module';
import { AppConfigModule } from './common/config/config.module';

@Module({
  imports: [AppConfigModule, MovieModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
