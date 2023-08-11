import { Controller, Get, Post, Body, Param, Put, Delete, BadRequestException } from '@nestjs/common';
import { TimeDayService } from "./time-day.service"
import { TimeDay  } from './schemas/time-day.schema';
@Controller('day')
export class TimeDayController {
    constructor(private readonly timeDayService: TimeDayService) {}

    @Get('user/:ownerId')
    async findAllByAuthor(@Param('ownerId') ownerId: string): Promise<TimeDay[]> {
      return this.timeDayService.findAllByAuthor(ownerId);
    }
    @Get()
    async findAll() {
        return this.timeDayService.findAll();
    }
    @Post()
    async create(@Body() user: Partial<TimeDay>) {
        return this.timeDayService.create(user);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() user: Partial<TimeDay>) {
        return this.timeDayService.update(id, user);
    }

    @Delete(':id')
        async delete(@Param('id') id: string) {
        return this.timeDayService.delete(id);
    }

}
