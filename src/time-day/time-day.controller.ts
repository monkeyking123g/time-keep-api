import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TimeDayService } from "./time-day.service"
@Controller('time-day')
export class TimeDayController {
    constructor(private readonly timeDayService: TimeDayService) {}

    @Get('user/:owner_id')
    async getUserTimeDay(@Param('owner_id') owner_id: string) {
        try {
            const timeDays = await this.timeDayService.getUserTimeDay(owner_id);
            return { data: timeDays, status: 'success' };
        } catch (err) {
            throw new Error(err.message);
        }
    }

}
