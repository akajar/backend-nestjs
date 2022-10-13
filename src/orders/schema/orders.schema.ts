import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, mongo } from 'mongoose';
import { Product } from '../../products/schema/products.schema';
import { User } from '../../users/schema/users.schema';

export type OrderDocument = Order & Document;

@Schema()
class orderItems{
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  })
  product: Product;

  @Prop()
  quantity: number;

  @Prop()
  price: number;
}

@Schema({
    timestamps: true,
    versionKey: false
})
export class Order {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  })
  user: User;

  @Prop([orderItems])
  detail: orderItems[];

  @Prop({default:0})
  totalPrice: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);