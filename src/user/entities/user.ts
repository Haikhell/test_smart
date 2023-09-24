import { Exclude } from 'class-transformer';
import { User } from 'src/models';

export class UserEntity {
  _id: string;
  email: string;
  fee: number;
  company: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<User>) {
    const user = JSON.parse(JSON.stringify(partial));

    Object.assign(this, user);
  }
}
