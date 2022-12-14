import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';

const mongoURI = "pidele a dba"
//puede usarse tambien un archivo como "process.env.DB_URI"
@Module({
  imports: [
    MongooseModule.forRoot(mongoURI),
    UsersModule,
    ProductsModule,
    OrdersModule], //se importan modulos de la base de datos
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
