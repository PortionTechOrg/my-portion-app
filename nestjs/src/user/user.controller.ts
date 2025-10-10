import { Controller, Get } from '@nestjs/common';
import { ParsedToken } from 'decorators';
import { User } from 'src/database/models/User';
import { UserService } from './user.service';

@Controller('/v1/user')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Get('me')
    handleGetUser(@ParsedToken() user: User ) {
        return this.userService.getUser(user.id);
    }

}
