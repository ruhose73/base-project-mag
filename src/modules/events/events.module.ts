import { Module } from '@nestjs/common';

import { AuthEventService } from './auth-event.service';

@Module({
  imports: [],
  controllers: [],
  providers: [AuthEventService],
  exports: [AuthEventService],
})
export class EventModule {}
