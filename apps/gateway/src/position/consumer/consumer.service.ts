import { Injectable } from '@nestjs/common'

@Injectable()
export class ConsumerService {
    getHello(message: any): void {
        console.log(`Hello ${message.value}!`)
    }
}