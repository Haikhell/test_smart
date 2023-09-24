import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ description: 'Email of the user', nullable: false })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ description: 'Password of the user', nullable: false })
  readonly password: string;
}
