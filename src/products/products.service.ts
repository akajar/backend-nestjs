import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './schema/products.schema';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>){}

  async createProduct(createProductDto: CreateProductDto): Promise<Product>{
    const newProduct = new this.productModel(createProductDto);
    return await newProduct.save();
  }

  async getAllProducts(): Promise<Product[]> {
      const products = await this.productModel.find();
      return products;
  }

  async getProduct(productId: string): Promise<Product>{
      const product = await this.productModel.findById(productId);
      return product;
  }

  async updateProduct(productId: string, updateProductDto: UpdateProductDto): Promise<Product>{
      const product = await this.productModel.findByIdAndUpdate(productId, updateProductDto, {new:true});
      return product;
  }

  async deleteProduct(productId: string): Promise<Product>{
      const product = await this.productModel.findByIdAndDelete(productId);
      return product;
  }
}
