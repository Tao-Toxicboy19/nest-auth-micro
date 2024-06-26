import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { KeyClientService } from './key-client.service';
import { JwtAuthGuard } from '../../../../libs/common/src/guards/jwt-auth.guard';
import { KeyDto } from './dto';
import { JwtPayload } from '@app/common';

@Controller('key')
export class KeyClientController {
  constructor(private readonly keyClientService: KeyClientService) { }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  create(
    @Body() dto: KeyDto,
    @Req() req: { user: JwtPayload }
  ) {
    return this.keyClientService.create({ ...dto, userId: req.user.sub })
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  getKey(
    @Req() req: { user: JwtPayload }
  ) {
    return this.keyClientService.getKey({ userId: req.user.sub })
  }
}
