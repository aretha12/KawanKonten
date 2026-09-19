import { Controller, Get, Param, Patch } from '@nestjs/common';
import { MatchingService } from './matching.service';
import { ProjectsService } from '../projects/projects.service';

@Controller('matching')
export class MatchingController {
  constructor(
    private readonly matchingService: MatchingService,
    private readonly projectsService: ProjectsService,
  ) {}

  // GET /matching/projects/:projectId -> daftar creator yang direkomendasikan
  @Get('projects/:projectId')
  findMatches(@Param('projectId') projectId: string) {
    return this.matchingService.findMatchesForProject(projectId);
  }

  // PATCH /matching/projects/:projectId/select/:creatorId -> brand memilih salah satu rekomendasi
  @Patch('projects/:projectId/select/:creatorId')
  selectCreator(
    @Param('projectId') projectId: string,
    @Param('creatorId') creatorId: string,
  ) {
    return this.projectsService.assignCreator(projectId, creatorId);
  }
}
