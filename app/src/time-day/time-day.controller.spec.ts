import { Test, TestingModule } from '@nestjs/testing';
import { TimeDayController } from './time-day.controller';

describe('TimeDayController', () => {
  let controller: TimeDayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimeDayController],
    }).compile();

    controller = module.get<TimeDayController>(TimeDayController);
  });

});
