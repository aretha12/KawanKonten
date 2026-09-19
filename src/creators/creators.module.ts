import { Module } from '@nestjs/common';
import { CreatorsController } from './creators.controller';
import { CreatorsService } from './creators.service';

@Module({
  controllers: [CreatorsController],
  providers: [CreatorsService],
  exports: [CreatorsService], // dipakai oleh MatchingModule & RatingsModule
})
export class CreatorsModule {}
