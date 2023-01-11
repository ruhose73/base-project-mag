import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { AuthEvent } from 'src/enums';

@Injectable()
export class AuthEventService {
  constructor(private eventEmitter: EventEmitter2) {}

  emitEvent(eventName: AuthEvent, payload: object) {
    this.eventEmitter.emit(eventName, payload);
  }

  @OnEvent(AuthEvent.UserLogin)
  UserLoginEvent(payload: object) {}

  @OnEvent(AuthEvent.UserLogout)
  UserLogoutEvent(payload: object) {}
}
