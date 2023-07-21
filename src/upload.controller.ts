import * as path from 'path';
import * as sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import { Controller, Post, UploadedFile, UseInterceptors, Get, Param, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from './multer-config';
import { Response } from 'express';
import Resize from "./resize";


async function reduceImageSize(originalPath: string, outputPath: string, width: number, height: number, quality: number, format: 'jpeg' | 'png'): Promise<void> {
  await sharp(originalPath)
    .resize(width, height)
    .toFormat(format)
    .jpeg({ quality: quality }) // Only applicable if format is 'jpeg'
    .png({ quality: quality }) // Only applicable if format is 'png'
    .toFile(outputPath);
}



@Controller('upload')
export class UploadController {
  private readonly resize: Resize;

  constructor() {
    this.resize = new Resize('./uploads');
  }

  @Get(':filename')
  async serveImage(@Param('filename') filename: string, @Res() res: Response) {
    const imagePath = path.resolve(`./uploads/${filename}`);
    return res.sendFile(imagePath);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image', multerOptions))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const originalImagePath = file.path; 
  
    const fileExtension = path.extname(originalImagePath);

    let outputPath: string;
    if (fileExtension === '.png') {
      outputPath = `./uploads/${uuidv4()}.png`; 
    } else if (fileExtension === '.jpeg' || fileExtension === '.jpg') {
      outputPath = `./uploads/${uuidv4()}.jpeg`; 
    } else {
     
      throw new Error('Unsupported file format');
    }

    await reduceImageSize(originalImagePath, outputPath, 800, 600, 80, fileExtension === '.png' ? 'png' : 'jpeg');

    return {
      originalFilename: file.filename,
      resizeFilename: 'reduced-image.png',
    };
  }
}