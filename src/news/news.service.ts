import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { News } from './entities/news.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News) public readonly newsRepository: Repository<News>,
  ) {}

  async getNews(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const stdout = await this.executeCrawlScript();
        const parsedResult = this.parseCrawlResult(stdout);
        const newsData = parsedResult.map((item) => ({
          title: item.title,
          desc: item.desc,
        }));

        await this.newsRepository.delete({});

        // 데이터베이스에 저장
        const savedEntities = await this.newsRepository.save(newsData);
        resolve(savedEntities);
      } catch (error) {
        console.error(`Error executing crawl.js: ${error}`);
        reject(error);
      }
    });
  }

  private executeCrawlScript(): Promise<string> {
    return new Promise((resolve, reject) => {
      exec('node src/news/crawl.js', (error, stdout, stderr) => {
        if (error) {
          reject(error);
        } else {
          resolve(stdout);
        }
      });
    });
  }

  private parseCrawlResult(result: string): any[] {
    const newsTitles = result
      .match(/제목: (.+?)\n/g)
      .map((match) => match.replace('제목: ', '').trim());
    const newsDescriptions = result
      .match(/설명: (.+?)\n/g)
      .map((match) => match.replace('설명: ', '').trim());

    // title과 desc로 구분하여 객체 배열로 반환
    return newsTitles.map((title, index) => ({
      title,
      desc: newsDescriptions[index],
    }));
  }

  @Cron('1 * * * * *') //10초마다 로그 =>구독,결제 시 사용많이함 (정기결제같은거 **)
  handleCron() {
    console.log('#####');
    this.getNews();
    // this.logger.debug('cron logger');
  }
}
