import { Module } from '@nestjs/common';
import { MatchingController } from './matching.controller';
import { MatchingService } from './matching.service';
import { CreatorsModule } from '../creators/creators.module';
import { ProjectsModule } from '../projects/projects.module';

@Module({
  imports: [CreatorsModule, ProjectsModule],
  controllers: [MatchingController],
  providers: [MatchingService],
})
export class MatchingModule {}
