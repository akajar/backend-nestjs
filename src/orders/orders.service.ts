import { Body, Injectable, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDto, UpdateOrderDto } from './dto/orders.dto';
import { Order, OrderDocument } from './schema/orders.schema';

@Injectable()
export class OrdersService {
    constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument>){}

    async createOrder(createOrderDto: CreateOrderDto){
        const newOrder = new this.orderModel(createOrderDto);
        return await newOrder.save();
    }

    async addProduct(@Res() res, updateOrderDto: UpdateOrderDto){

    }
    // addproduct()
    // removeproduct()
    // updateproduct()?
}
