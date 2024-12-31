import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserSchema } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    const existUser = await this.userModel.findOne({
      email: createUserDto.email,
    });
    if (existUser) throw new BadRequestException('user already exsists');
    return this.userModel.create(createUserDto);
  }

  findAll() {
    return this.userModel.find();
  }

  findOne(id: mongoose.Schema.Types.ObjectId) {
    return this.userModel.findById(id);
  }

  update(id: mongoose.Schema.Types.ObjectId, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto);
  }

  remove(id: mongoose.Schema.Types.ObjectId) {
    return this.userModel.findByIdAndDelete(id);
  }
}
