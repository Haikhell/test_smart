import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, Min, Max, IsNumber } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({ description: 'First name of the user', nullable: false })
  @IsString()
  readonly company: string;

  @ApiProperty({ description: 'Last name of the user', nullable: false })
  @IsNumber()
  @Min(1)
  @Max(100)
  readonly fee: number;

  @ApiProperty({ description: 'Email of the user', nullable: false })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ description: 'Password of the user', nullable: false })
  readonly password: string;
}
