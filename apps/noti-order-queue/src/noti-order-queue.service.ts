
import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import { MailDto } from './dto/noti-order.dto'

@Injectable()
export class NotiOrderQueueService {

    constructor(
        private readonly mailerService: MailerService,
    ) { }

    async sendMail(dto: MailDto) {
        try {
            const options = {
                to: dto.email,
                subject: `open position symbol: ${dto.symbol}`,
                html: `<h1>open position ${dto.symbol} leverage: ${dto.leverage}</h1>`,
            }
            await this.mailerService.sendMail(options)
        } catch (error) {
            throw error
        }
    }
}