import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CreatorsModule } from './creators/creators.module';
import { BrandsModule } from './brands/brands.module';
import { ProjectsModule } from './projects/projects.module';
import { MatchingModule } from './matching/matching.module';
import { PaymentsModule } from './payments/payments.module';
import { RatingsModule } from './ratings/ratings.module';

@Module({
  imports: [
    CreatorsModule,
    BrandsModule,
    ProjectsModule,
    MatchingModule,
    PaymentsModule,
    RatingsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
