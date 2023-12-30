import { Controller, Get } from '@nestjs/common';
import { NewsService } from './news.service'; // crawl.js를 모듈로 가져옴

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  async getNews(): Promise<any> {
    return await this.newsService.getNews();
  }
}
