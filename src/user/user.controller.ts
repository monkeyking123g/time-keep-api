import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() userData: Partial<User>): Promise<User> {
    return this.userService.createUser(userData);
  }

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.findAllUsers();
  }

//   @Get(':id')
//   async getUserById(@Param('id') id: string): Promise<User> {
//     return this.userService.findUserById(id);
//   }

//   @Put(':id')
//   async updateUser(@Param('id') id: string, @Body() userData: Partial<User>): Promise<User> {
//     return this.userService.updateUser(id, userData);
//   }

//   @Delete(':id')
//   async deleteUser(@Param('id') id: string): Promise<User> {
//     return this.userService.deleteUser(id);
//   }
}
