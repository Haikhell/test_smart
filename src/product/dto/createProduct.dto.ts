import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ description: 'name product', nullable: false })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'description product', nullable: false })
  @IsString()
  readonly description: string;
}
