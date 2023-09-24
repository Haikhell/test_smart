import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hash } from 'bcrypt';
import { Company, CompanyDocument, User, UserDocument } from '../models';
import { RegisterUserDto } from './dto/registerUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
    private readonly authService: AuthService,
  ) {}

  async hashPassword(password: string) {
    return await hash(password, 10);
  }

  public async register({
    email,
    password,
    fee,
    company,
  }: RegisterUserDto): Promise<UserDocument> {
    const encryptedPassword = await this.hashPassword(password);

    const modelCompany = await this.companyModel.find({
      _id: company,
    });

    if (!modelCompany) {
      throw new BadRequestException('Company not found');
    }

    const user = await this.userModel.findOne({
      email,
    });

    if (user) {
      throw new NotFoundException(`email is busy `);
    }

    return await this.userModel.create({
      fee,
      company,
      email,
      password: encryptedPassword,
    });
  }

  public async loginUser({ email, password }: LoginUserDto): Promise<string> {
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    return this.authService.login(user.id, user);
  }

  public async deleteUserById(id: string): Promise<void> {
    await this.userModel.deleteOne({
      id,
    });
  }
}
