import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import { UserEntity } from './entities/user';
import { LoginUserDto } from './dto/loginUser.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  @Post('/create')
  async createUser(
    @Body() dataForRegisterUser: RegisterUserDto,
  ): Promise<UserEntity> {
    return new UserEntity(await this.userService.register(dataForRegisterUser));
  }

  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  @Post('/login')
  async login(@Body() dataForLoginUser: LoginUserDto): Promise<string> {
    return this.userService.loginUser(dataForLoginUser);
  }
}
