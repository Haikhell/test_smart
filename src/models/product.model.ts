import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ versionKey: false })
export class Product {
  @ApiProperty()
  @Prop({ type: String, require: true })
  description: string;

  @ApiProperty()
  @Prop({ type: String, require: true })
  name: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
