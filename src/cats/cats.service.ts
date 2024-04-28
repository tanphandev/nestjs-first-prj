import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findById(id: string): Cat {
    return this.cats.find((cat) => cat.id === id);
  }

  findCatsByLimit(limit: number): Cat[] {
    return this.cats.slice(0, limit);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}
