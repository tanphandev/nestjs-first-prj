import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { CatsQueryParameters } from './dto/cats.query-params';
import { CatParams } from './dto/cats.params';
import { LimitValidationPipe } from 'src/pipes/limit-validation-pipe';
import { LoggingInterceptor } from 'src/interceptor/logging.interceptor';
import { TimeoutInterceptor } from 'src/interceptor/timeout.interceptor';
import { Timeout } from 'src/decorators/timeout.decorator';
import { Auth } from 'src/decorators/auth.decorator';
import { Role } from '../users/interfaces/user.interface';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { CreateCatDto } from './dto/create-cat.dto';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}
  @Post()
  @Auth([Role.ADMIN])
  @Timeout(5000) // set timeout to 5s
  @UseInterceptors(LoggingInterceptor, TimeoutInterceptor)
  async create(@Body(new ValidationPipe()) createCatDto: CreateCatDto) {
    // await new Promise((resolve) => setTimeout(resolve, 5500)); // pass after 5s
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
