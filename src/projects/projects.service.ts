import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Project, ProjectStatus } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectsService {
  private projects: Project[] = [];

  create(dto: CreateProjectDto): Project {
    const project: Project = {
      id: randomUUID(),
      brandId: dto.brandId,
      title: dto.title,
      category: dto.category,
      budgetMin: dto.budgetMin,
      budgetMax: dto.budgetMax,
      brief: dto.brief,
      status: 'open',
      createdAt: new Date(),
    };
    this.projects.push(project);
    return project;
  }

  findAll(filters?: { category?: string; status?: ProjectStatus }): Project[] {
    return this.projects.filter((p) => {
      const matchCategory = filters?.category
        ? p.category.some(
            (c) => c.toLowerCase() === filters.category!.toLowerCase(),
          )
        : true;
      const matchStatus = filters?.status ? p.status === filters.status : true;
      return matchCategory && matchStatus;
    });
  }

  findOne(id: string): Project {
    const project = this.projects.find((p) => p.id === id);
    if (!project) {
      throw new NotFoundException(`Project dengan id ${id} tidak ditemukan`);
    }
    return project;
  }

  /** Menandai project sudah dicocokkan dengan seorang creator (hasil Smart Matching) */
  assignCreator(id: string, creatorId: string): Project {
    const project = this.findOne(id);
    project.matchedCreatorId = creatorId;
    project.status = 'matched';
    return project;
  }

  updateStatus(id: string, status: ProjectStatus): Project {
    const project = this.findOne(id);
    project.status = status;
    return project;
  }
}
