import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHealth() {
    return {
      status: 'ok',
      service: 'KawanKonten API',
      message: 'Menghubungkan micro-influencer dan brand kecil.',
    };
  }
}
