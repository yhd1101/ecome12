import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';

@Injectable()
export class NewsService {
  async getNews(): Promise<any> {
    return new Promise((resolve, reject) => {
      exec('node src/news/crawl.js', (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing crawl.js: ${error}`);
          reject(error);
        } else {
          // 결과를 파싱하여 반환
          const parsedResult = this.parseCrawlResult(stdout);
          resolve(parsedResult);
        }
      });
    });
  }

  private parseCrawlResult(result: string): any {
    const newsTitles = result
      .match(/제목: (.+?)\n/g)
      .map((match) => match.replace('제목: ', '').trim());
    const newsDescriptions = result
      .match(/설명: (.+?)\n/g)
      .map((match) => match.replace('설명: ', '').trim());

    // title과 desc로 구분하여 객체 배열로 반환
    const parsedResult = newsTitles.map((title, index) => ({
      title,
      desc: newsDescriptions[index],
    }));
    return parsedResult;
  }
}
