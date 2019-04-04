import { Body, Controller, Delete, Get, Param, Post, Put, Res, HttpStatus, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import  { extname } from 'path';
import { CreateProductDto } from './dto/create-product-dto';
import { ProductsService } from './products.service';
import { ProductEntity } from './entities/product.entity';

@Controller('products')
export class ProductsController {
  SERVER_URL:  string  =  "http://localhost:3000/products";
  constructor (private productService: ProductsService) {}

  @Get()
  findAll(@Res() response) {
    this.productService.findAll().then( data => {
      response.status(HttpStatus.OK).json(data);
    }).catch(() => {
      response.status(HttpStatus.FORBIDDEN).json({ data: 'Error al obtener los productos.' })
    });
  }

  @Get(':code')
  findOne(@Res() response, @Param('code') code) {
    this.productService.findOne(code).then( data => {
      response.status(HttpStatus.OK).json(data);
    }).catch(() =>{
      response.status(HttpStatus.BAD_REQUEST).json({ data: 'Error al encontrar ese producto' })
    });
  }


  @Post()
  async create(@Body() createProductDto: CreateProductDto, @Res() response) {
    this.productService.post(createProductDto).then( data => {
      response.status(HttpStatus.CREATED).json(data);
    }).catch( () => {
      response.status(HttpStatus.FORBIDDEN).json({ data: 'Error al registrar producto.' });
    });
  }

  @Put('update/:code')
  update(@Param('code') code: number, @Body() updateProductDto: CreateProductDto, @Res() response) {
    this.productService.update(code, updateProductDto).then( data => {
      response.status(HttpStatus.OK).json(data);
    }).catch( () => {
      response.status(HttpStatus.FORBIDDEN).json({ data: 'Error al actualizar producto' });
    });
  }

  @Delete(':code')
  remove(@Param('code') code: number, @Res() response) {
    this.productService.remove(code).then(data => {
      response.status(HttpStatus.OK).json(data);
    }).catch(() => {
      response.status(HttpStatus.FORBIDDEN).json({ data: 'Error al eliminar producto' });
    });
  }
}
