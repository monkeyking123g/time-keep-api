import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TimeDayService } from "./time-day.service"
import { TimeDay  } from './time-day.model';

@Controller('time-day')
export class TimeDayController {
    constructor(private readonly timeDayService: TimeDayService) {}

    @Get('user/:owner_id')
    async getUserTimeDay(@Param('owner_id') owner_id: string) {
        return  this.timeDayService.getUserTimeDay(owner_id);     
    }
    @Get()
    async findAll() {
        return this.timeDayService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id: string) {
        return this.timeDayService.findById(id);
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
