import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreatorsService } from './creators.service';
import { CreateCreatorDto } from './dto/create-creator.dto';
import { UpdateCreatorDto } from './dto/update-creator.dto';

@Controller('creators')
export class CreatorsController {
  constructor(private readonly creatorsService: CreatorsService) {}

  @Post()
  create(@Body() dto: CreateCreatorDto) {
    return this.creatorsService.create(dto);
  }

  // GET /creators?category=Kecantikan
  @Get()
  findAll(@Query('category') category?: string) {
    return this.creatorsService.findAll(category);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.creatorsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCreatorDto) {
    return this.creatorsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.creatorsService.remove(id);
    return { message: 'Creator berhasil dihapus' };
  }
}
