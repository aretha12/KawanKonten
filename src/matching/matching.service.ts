import { Injectable } from '@nestjs/common';
import { CreatorsService } from '../creators/creators.service';
import { ProjectsService } from '../projects/projects.service';
import { Creator } from '../creators/entities/creator.entity';

@Injectable()
export class MatchingService {
  constructor(
    private readonly creatorsService: CreatorsService,
    private readonly projectsService: ProjectsService,
  ) {}

  /**
   * Smart Matching: mencari creator yang paling cocok untuk sebuah project.
   * Kriteria kecocokan:
   * 1. Kategori creator beririsan dengan kategori project
   * 2. Rentang rate card creator masih masuk akal dengan budget project
   * 3. Diurutkan dari rating tertinggi, lalu engagement rate tertinggi
   */
  findMatchesForProject(projectId: string): Creator[] {
    const project = this.projectsService.findOne(projectId);
    const allCreators = this.creatorsService.findAll();

    const matches = allCreators.filter((creator) => {
      const categoryOverlap = creator.category.some((cat) =>
        project.category.some((pc) => pc.toLowerCase() === cat.toLowerCase()),
      );
      if (!categoryOverlap) return false;

      // creator dianggap cocok jika rentang rate-nya tidak jauh melebihi budget project
      const budgetCompatible =
        creator.suggestedRateMin <= project.budgetMax &&
        creator.suggestedRateMax >= project.budgetMin;

      return budgetCompatible;
    });

    return matches.sort((a, b) => {
      if (b.rating !== a.rating) return b.rating - a.rating;
      return b.engagementRate - a.engagementRate;
    });
  }
}
