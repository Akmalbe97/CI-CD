import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto.email, createUserDto.password);
  }

  @Post()
  login(@Body() userInfo: {email:string, password: string}) {
    return this.userService.login(userInfo.email, userInfo.password);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOneUser(+id);
  }

  @Post('forgot-password')
  forgotPassword(@Body() user: { email: string }) {
    return this.userService.forgotPassword(user.email);
  }

  @Post('verify-code')
  verifyCode(@Body() user: { email: string; code: string }) {
    return this.userService.verifyCode(user.email, user.code);
  }

  @Get()
  getCurrentUser(@Query('token') token: string) {
    return this.userService.getCurrentUser(token);
  }

}
