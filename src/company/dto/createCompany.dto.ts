import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { CompanyCategory } from '../enum';

export class CreateCompanyDto {
  @ApiProperty({ description: 'Company name', nullable: false })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'Company category', nullable: false })
  @IsEnum(CompanyCategory)
  readonly category: string;
}
