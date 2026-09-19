import { Module } from '@nestjs/common';
import { RatingsController } from './ratings.controller';
import { RatingsService } from './ratings.service';
import { CreatorsModule } from '../creators/creators.module';

@Module({
  imports: [CreatorsModule],
  controllers: [RatingsController],
  providers: [RatingsService],
})
export class RatingsModule {}
