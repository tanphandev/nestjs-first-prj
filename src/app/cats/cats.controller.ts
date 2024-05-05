import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { CatsQueryParameters } from './dto/cats.query-params';
import { CatParams } from './dto/cats.params';
import { LimitValidationPipe } from 'src/pipes/limit-validation-pipe';
import { RolesGuard } from 'src/guard/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}
  @Post()
  @Roles(['admin'])
  @UseGuards(AuthGuard, RolesGuard)
  async create(@Body() createCatDto: CreateCatDto) {
    if (createCatDto.name === 'Bad Cat') {
      throw new HttpException('Bad Cat is not allowed', HttpStatus.FORBIDDEN);
    }
    return this.catsService.create(createCatDto);
  }

  @Get('all')
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get()
  async getCatsByLimits(
    @Query(new LimitValidationPipe()) query: CatsQueryParameters,
  ): Promise<Cat[]> {
    return this.catsService.findCatsByLimit(query.limit);
  }

  @Get(':id')
  async findById(@Param() params: CatParams) {
    const cat = this.catsService.findById(params.id);
    if (cat === null)
      throw new HttpException('Cat not found', HttpStatus.NOT_FOUND);
    return cat;
  }
}
