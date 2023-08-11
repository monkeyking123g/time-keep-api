import * as path from 'path';
import * as sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import { Controller, Post, UploadedFile, UseInterceptors, Get, Param, Res, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from './multer-config';
import { Response } from 'express';
import * as fs from 'fs';

async function reduceImageSize(originalPath: string, outputPath: string, width: number, height: number, quality: number, format: 'jpeg' | 'png'): Promise<void> {
  await sharp(originalPath)
    .resize(width, height)
    .toFormat(format)
    .jpeg({ quality: quality }) 
    .png({ quality: quality }) 
    .toFile(outputPath);
}



@Controller('uploads')
export class UploadController {

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
     
      throw new BadRequestException('Unsupported file format');
    }

    await reduceImageSize(originalImagePath, outputPath, 450, 450, 80, fileExtension === '.png' ? 'png' : 'jpeg');

    fs.unlinkSync(originalImagePath);

    return {
      resizeFileName: outputPath.replace(".", ""),
    };
  }
}