import { Injectable, NotFoundException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PayloadCreate } from './interfaces/payload.create. class';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../models';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async findOneByEmail(email: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({
      email,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserDocument | null> {
    const user = await this.findOneByEmail(email);
    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) {
      return;
    }
    return user;
  }

  async login(userId: string, user: User): Promise<string> {
    const payload: PayloadCreate = {
      sub: userId,
      user,
    };
    return this.jwtService.sign(payload);
  }
}
