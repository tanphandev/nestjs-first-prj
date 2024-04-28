import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  UseFilters,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { CatsQueryParameters } from './dto/cats.query-params';
import { CatParams } from './dto/cats.params';
import { HttpExceptionFilter } from 'src/exception-filter/http-exception.filter';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}
  @Post()
  @UseFilters(new HttpExceptionFilter())
  async create(@Body() createCatDto: CreateCatDto) {
    if (createCatDto.name === 'Bad Cat') {
      throw new HttpException('Bad Cat is not allowed', HttpStatus.FORBIDDEN);
    }
    this.catsService.create(createCatDto);
  }

  @Get(':id')
  async findById(@Param() params: CatParams) {
    return this.catsService.findById(params.id);
  }

  @Get()
  async getCatsByLimits(@Query() query: CatsQueryParameters): Promise<Cat[]> {
    return this.catsService.findCatsByLimit(query.limit);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}
