import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ChampionService } from './champion.service';
import { CreateChampionDto } from './dto/create-champion.dto';
import { UpdateChampionDto } from './dto/update-champion.dto';

@Controller('champion')
export class ChampionController {
  constructor(private readonly championService: ChampionService) {}

  @Get()
  async createChampion() {
    return await this.championService.championCrawl();
  }
}
