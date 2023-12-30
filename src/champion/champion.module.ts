import { Module } from '@nestjs/common';
import { ChampionService } from './champion.service';
import { ChampionController } from './champion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { Champion } from './entities/champion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Champion]), HttpModule, ConfigModule],
  controllers: [ChampionController],
  providers: [ChampionService],
})
export class ChampionModule {}
