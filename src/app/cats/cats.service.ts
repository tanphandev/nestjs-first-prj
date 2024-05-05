import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';
import { randomUUID } from 'crypto';
import * as catsList from './../../mocks/cats-list.json';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = catsList;

  create(cat: Cat) {
    const newCat = {
      id: randomUUID(),
      ...cat,
    };
    this.cats.push(newCat);
    return newCat;
  }

  findById(id: string): Cat {
    const exitsCat = this.cats.find((cat) => cat.id === id);
    if (!exitsCat) return null;
    return exitsCat;
  }

  findCatsByLimit(limit: number): Cat[] {
    return this.cats.slice(0, limit);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}
