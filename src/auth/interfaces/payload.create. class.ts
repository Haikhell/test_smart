import { User } from 'src/models';

export class PayloadCreate {
  sub: string;
  user: User;
  iat?: number;
  exp?: number;
}
