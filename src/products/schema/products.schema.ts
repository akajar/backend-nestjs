import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({
    timestamps: true,
    versionKey: false
})
export class Product {
  @Prop({required: true})
  name: string;

  @Prop()
  description: string;

  @Prop({required: true})
  price: number;

  @Prop()
  urlImage: string;

}

export const ProductSchema = SchemaFactory.createForClass(Product);