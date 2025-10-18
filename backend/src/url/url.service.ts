import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Url } from './url.entity';
import { nanoid } from 'nanoid'; // make sure you have this installed

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(Url)
    private readonly urlRepository: Repository<Url>,
  ) {}

  async shorten(longUrl: string, customSlug?: string, userId?: number): Promise<Url> {
    const slug = customSlug || nanoid(6);

    const newUrl = this.urlRepository.create({
      slug,
      longUrl,
      clicks: 0,
      userId: userId || 1,
      createdAt: new Date(),
    });

    return await this.urlRepository.save(newUrl);
  }

  async findBySlug(slug: string): Promise<Url | null> {
    return this.urlRepository.findOne({ where: { slug } });
  }
  
  async incrementClicks(id: number): Promise<void> {
  await this.urlRepository.increment({ id }, 'clicks', 1);
}

  async listByUser(userId: number) {
  return this.urlRepository.find({
    where: { userId },
    order: { createdAt: 'DESC' },
  });
}


   // <-- Add this method
  async create(longUrl: string, userId = 1): Promise<Url> {
    const slug = nanoid(6); // generate short slug
    const url = this.urlRepository.create({ longUrl, slug, userId, clicks: 0, createdAt: new Date() });
    return this.urlRepository.save(url);
  }
}
