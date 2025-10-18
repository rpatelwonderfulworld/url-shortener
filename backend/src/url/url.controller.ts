import { Controller, Post, Body, Req, Res, Get, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { UrlService } from './url.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}
  
@UseGuards(JwtAuthGuard)
@Post('shorten')
async shortenUrl(@Body('url') longUrl: string) {
  try {
    const url = await this.urlService.create(longUrl);
    return {
      longUrl: url.longUrl,
      slug: url.slug,
      shortUrl: `http://localhost:5000/url/${url.slug}`,
    };
  } catch (err) {
    console.error('Error in shorten endpoint:', err);
    throw err;
  }
}

@Get(':slug')
async redirect(@Req() req: Request, @Res() res: Response) {
  try {
    const slug = req.params['slug'];
    const url = await this.urlService.findBySlug(slug);

    if (!url) {
      return res.status(404).send('Not found');
    }

    // 🟢 Increment click count
    await this.urlService.incrementClicks(url.id);

    // 🔁 Redirect to the long URL
    return res.redirect(url.longUrl);
  } catch (error) {
    console.error('Error in redirect():', error);
    return res.status(500).send('Internal server error');
  }
}

@UseGuards(JwtAuthGuard)
@Get()
async list(@Req() req: Request) {
  const userId = (req as any).user?.userId; // depends on your JwtStrategy return shape
  return this.urlService.listByUser(userId);
}
}
