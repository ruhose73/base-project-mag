import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { confirmMessage } from './templates';
import { ConfirmMessageDto } from './dto';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  public confirmMessage(dto: ConfirmMessageDto): void {
    this.mailerService
      .sendMail({
        to: dto.to,
        subject: dto.subject,
        html: confirmMessage(dto), // HTML body content
      })
      .then(() => {})
      .catch(() => {});
  }
}
