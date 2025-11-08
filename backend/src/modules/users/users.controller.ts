import {
  Controller,
  Get,

} from '@nestjs/common';
import { UsersService } from './users.service';

import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { UserPayload } from 'src/common/types/user-payload';

@Controller({ version: '1', path: 'user' })
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('me')
  async me(@CurrentUser() user: UserPayload) {
    const result = await this.userService.findUser()
    return {
      message: 'Dados do usuáro',
      result
    };
  }

  
}
