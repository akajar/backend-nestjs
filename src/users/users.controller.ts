import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req, HttpStatus, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/users.dto';
import { UsersService } from './users.service';

//Define las rutas relacionadas a los usuarios
@Controller()
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post("/register")
    async create(@Res() res,@Body() createUserDto: CreateUserDto) {
        const newUser = await this.usersService.createUser(createUserDto);
        return res.json({
            message: 'New user created successfully',
            newUser
        });
    }

    @Get('all-users')
    async getAll(@Res() res){
        const allUsers = await this.usersService.getAllUsers();
        return res.json(allUsers);
    }

    @Get('user/:id')
    async getOne(@Res() res,@Param('id') userID){
        const user = await this.usersService.getUser(userID);
        if(!user) throw new NotFoundException('El producto no existe');
        return res.status(HttpStatus.OK).json(user);
    }

    @Patch('user/:id')
    async update(@Res() res, @Param('id') userID, @Body() updateUserDto: UpdateUserDto){
        const user = await this.usersService.updateUser(userID,updateUserDto);
        if(!user) throw new NotFoundException('El producto no existe');
        return res.status(HttpStatus.OK).json({
            message: 'User updated successfully',
            user
        });
    }

    @Delete('user/:id')
    async delete(@Res() res, @Param('id') userID){
        const user = await this.usersService.deleteUser(userID);
        if(!user) throw new NotFoundException('El producto no existe');
        return res.status(HttpStatus.OK).json({
            message: 'User deleted successfully',
            user
        });    
    }
}
