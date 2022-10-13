import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/users.dto';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/users.schema';

//Comparte los metodos que comunican con la BD
@Injectable()
export class UsersService {
    //en el constructor tambien se puede usar una interfaz (parecida al schema) que hereda de Document
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>){}

    //funcionan tambien sin promise<user> convirtiendo las funciones regulares en funciones flecha
    async createUser(createUserDto: CreateUserDto): Promise<User>{
        const newUser = new this.userModel(createUserDto);
        return await newUser.save();
    }

    async getAllUsers(): Promise<User[]> {
        const users = await this.userModel.find();
        return users;
    }
    
    async getUser(userId: string): Promise<User>{
        const user = await this.userModel.findById(userId);
        return user;
    }

    async updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<User>{
        const user = await this.userModel.findByIdAndUpdate(userId, updateUserDto, {new:true});
        return user;
    }

    async deleteUser(userId: string): Promise<User>{
        const user = await this.userModel.findByIdAndDelete(userId);
        return user;
    }
}
