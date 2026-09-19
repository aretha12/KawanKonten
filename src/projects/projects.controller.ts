import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectStatus } from './entities/project.entity';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@Body() dto: CreateProjectDto) {
    return this.projectsService.create(dto);
  }

  // GET /projects?category=Kuliner&status=open
  @Get()
  findAll(
    @Query('category') category?: string,
    @Query('status') status?: ProjectStatus,
  ) {
    return this.projectsService.findAll({ category, status });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: ProjectStatus) {
    return this.projectsService.updateStatus(id, status);
  }
}
