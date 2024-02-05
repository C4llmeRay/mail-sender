import {
  Controller,
  Post,
  Body,
  Get,
  Req,
  Res,
  StreamableFile,
  Param,
} from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send')
  async sendEmail(
    @Body() body: { to: string; subject: string; text: string },
  ): Promise<void> {
    const { to, subject, text } = body;
    await this.emailService.sendMail(to, subject, text);
  }

  @Get('callback/:id')
  async callback(
    @Body() body: { to: string; subject: string; text: string },
    @Req() req,
    @Param() id,
    @Res() res,
  ) {
    console.log(id);
    const file = createReadStream(join(process.cwd(), 'image.avif'));
    return new StreamableFile(file);
  }
}
