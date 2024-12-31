import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Expense } from './schema/expense.schema';
import mongoose, { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectModel(Expense.name) private expenseModel: Model<Expense>,
    private readonly usersService: UsersService,
  ) {}
  async create(
    createExpenseDto: CreateExpenseDto,
    userId: mongoose.Schema.Types.ObjectId,
  ) {
    const user = await this.usersService.findOne(userId);
    if (!Object.keys(user).length)
      throw new BadRequestException('User not found');
    return this.expenseModel.create({ ...createExpenseDto, user: user._id });
  }

  findAll() {
    return this.expenseModel.find();
  }

  findOne(id: mongoose.Schema.Types.ObjectId) {
    return this.expenseModel.findById(id).populate({path: 'user', select: '-createdAt -updatedAt -__v'});
  }

  update(
    id: mongoose.Schema.Types.ObjectId,
    updateExpenseDto: UpdateExpenseDto,
  ) {
    return this.expenseModel.findByIdAndUpdate(id, updateExpenseDto);
  }

  remove(id: mongoose.Schema.Types.ObjectId) {
    return this.expenseModel.findByIdAndDelete(id);
  }
}
