import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { Company, CompanySchema, User, UserSchema } from '../models';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';

describe('UsersService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AuthModule,
        ConfigModule.forRoot(),
        MongooseModule.forRootAsync({
          useFactory: () => ({
            uri: process.env.MONGO_DB_URI_DEV,
          }),
        }),
        MongooseModule.forFeature([
          { name: User.name, schema: UserSchema },
          { name: Company.name, schema: CompanySchema },
        ]),
      ],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  }, 10000);

  it('should register a user', async () => {
    const user = {
      company: '6510202f4c33c62d9fb5a9dd',
      fee: 15,
      email: 'ivanhaikhell@example.com',
      password: 'password123',
    };

    const registeredUser = await service.register(user);

    expect(registeredUser).toBeDefined();
    expect(registeredUser.fee).toBe(user.fee);
    expect(registeredUser.company.toString()).toBe(user.company);
    expect(registeredUser.email).toBe(user.email);

    await service.deleteUserById(registeredUser.id);
  }, 10000);
});
