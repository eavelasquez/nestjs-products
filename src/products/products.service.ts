import { Injectable } from '@nestjs/common';
import { ProductEntity } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product-dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    ) {}

    async findAll(): Promise<ProductEntity[]> {
      return await this.productRepository.find();
    }

    async findOne( code: number ): Promise<ProductEntity> {
      return await this.productRepository.findOne(code);
    }

    async post( product: CreateProductDto ): Promise<ProductEntity> {
      const newProduct = new ProductEntity();
      newProduct.ref = product.ref;
      newProduct.name = product.name;
      newProduct.description = product.description;
      newProduct.cost = product.cost;
      newProduct.count = product.count;
      newProduct.date = product.date;
      newProduct.img = product.img;
      return await this.productRepository.save(product);
    }

    async upload( code: number, imgUrl: string ) {
      this.productRepository.update(code, { img: imgUrl })
    }

    async update( code: number, productUpdate: CreateProductDto ): Promise<ProductEntity> {
    if (!code) { return; }
      const updateProduct = await this.productRepository.findOne(code);
      updateProduct.ref = productUpdate.ref;
      updateProduct.name = productUpdate.name;
      updateProduct.description = productUpdate.description;
      updateProduct.cost = productUpdate.cost;
      updateProduct.count = productUpdate.count;
      updateProduct.date = productUpdate.date;
      return await this.productRepository.save(updateProduct);
    }

    async remove( code: number ): Promise<any> {
      return await this.productRepository.delete(code);
    }
}
