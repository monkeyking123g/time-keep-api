import * as path from 'path';
import sharp from 'sharp';
import { Controller, Post, UploadedFile, UseInterceptors, Get, Param, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from './multer-config';
import { Response } from 'express';



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

  @Get(':filename')
  async serveImage(@Param('filename') filename: string, @Res() res: Response) {
    const imagePath = path.resolve(`./uploads/${filename}`);
    return res.sendFile(imagePath);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image', multerOptions))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const originalImagePath = file.path; // Get the path of the uploaded image
    const jpegOutputPath = './uploads/reduced-image.jpeg'; // Destination path for the reduced JPEG image
    const pngOutputPath = './uploads/reduced-image.png'; // Destination path for the reduced PNG image

    // Reduce the image size to 800x600 with 80% quality for JPEG format
    await reduceImageSize(originalImagePath, jpegOutputPath, 800, 600, 80, 'jpeg');

    // Reduce the image size to 800x600 with 80% quality for PNG format
    await reduceImageSize(originalImagePath, pngOutputPath, 800, 600, 80, 'png');

    // Return the response, or you can do further processing here
    return {
      originalFilename: file.filename,
      jpegFilename: 'reduced-image.jpeg',
      pngFilename: 'reduced-image.png',
    };
  }
}