import { Controller, Get, Post, Body, Patch, Param, Delete, Res, NotFoundException, HttpStatus } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('add')
  async create(@Res() res,@Body() createProductDto: CreateProductDto) {
    const newProduct = await this.productsService.createProduct(createProductDto);
    return res.json({
      message: 'New product created successfully',
      newProduct
    });
  }

  @Get('list')
  async getAll(@Res() res){
    const allProducts = await this.productsService.getAllProducts();
    return res.json(allProducts);
  }

  @Get(':id')
  async getOne(@Res() res,@Param('id') productID){
    const product = await this.productsService.getProduct(productID);
    if(!product) throw new NotFoundException('El producto no existe');
    return res.status(HttpStatus.OK).json(product);
  }

  @Patch(':id')
  async update(@Res() res, @Param('id') productID, @Body() updateproductDto: UpdateProductDto){
    const product = await this.productsService.updateProduct(productID,updateproductDto);
    if(!product) throw new NotFoundException('El producto no existe');
    return res.status(HttpStatus.OK).json({
      message: 'Product updated successfully',
      product
    });
  }

  @Delete(':id')
  async delete(@Res() res, @Param('id') productID){
    const product = await this.productsService.deleteProduct(productID);
    if(!product) throw new NotFoundException('El producto no existe');
    return res.status(HttpStatus.OK).json({
      message: 'Product deleted successfully',
      product
    });    
  }
}
