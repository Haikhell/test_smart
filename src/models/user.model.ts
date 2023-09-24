import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Company } from './company.model';

export type UserDocument = User & Document;

@Schema({ versionKey: false })
export class User {
  @ApiProperty()
  @Prop({ type: Number, require: true })
  fee: number;

  @ApiProperty()
  @Prop({ type: String, require: true, unique: true })
  email: string;

  @ApiProperty()
  @Prop({ type: String, require: true })
  password: string;

  @ApiProperty()
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Company' })
  company: Company;
}

export const UserSchema = SchemaFactory.createForClass(User);
