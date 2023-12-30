import { Injectable } from '@nestjs/common';
import { CreateChampionDto } from './dto/create-champion.dto';
import { UpdateChampionDto } from './dto/update-champion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Champion } from './entities/champion.entity';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import * as util from 'util';
import { exec } from 'child_process';

const execAsync = util.promisify(exec);

@Injectable()
export class ChampionService {
  constructor(
    @InjectRepository(Champion)
    public readonly championRepository: Repository<Champion>,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async championCrawl(): Promise<void> {
    try {
      const { stdout, stderr } = await execAsync('python3 craw.py');

      if (stderr) {
        console.error(`Error during script execution: ${stderr}`);
      } else {
        console.log(`Script output: ${stdout}`);
        const championData = JSON.parse(stdout); // 예시: 파이썬 스크립트에서 JSON 형식으로 출력한다고 가정
        return championData;

        // 이제 championData를 가지고 원하는 로직을 수행하여 데이터베이스에 저장할 수 있습니다.
        // 예를 들어, championData를 반복하여 Champion 엔터티로 매핑하고 저장하는 등의 작업을 수행합니다.
        // 이 부분은 데이터의 구조와 NestJS 애플리케이션의 구조에 따라 달라질 수 있습니다.

        // 예시 코드:
        // const champions = championData.map(champion => ({
        //   // 챔피언 엔터티의 필드에 맞게 데이터를 가공
        //   championName: champion.name,
        //   kda: champion.kda,
        //   // ... 나머지 필드들 ...
        // }));

        // 이전에 저장된 챔피언 데이터를 모두 삭제
        // await this.championRepository.delete({});
        //
        // // 새로운 챔피언 데이터 저장
        // await this.championRepository.save(champions);
      }
    } catch (err) {
      console.error(`Error during script execution: ${err}`);
    }
  }
}
