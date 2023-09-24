import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { CompanyCategory } from 'src/company/enum';

export type CompanyDocument = Company & Document;

@Schema({ versionKey: false })
export class Company {
  @ApiProperty()
  @Prop({ type: String, require: true })
  name: string;

  @ApiProperty()
  @Prop({ type: String, enum: CompanyCategory, require: true })
  category: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
