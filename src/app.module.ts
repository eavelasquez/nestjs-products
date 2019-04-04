// Modules
import { Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// Services
import { AppService } from './app.service';
import { ProductsService } from './products/products.service';
// Controllers
import { AppController } from './app.controller';
import { ProductsController } from './products/products.controller';
import { UploadController } from './products/upload.controller';
// Entities
import { ProductEntity } from './products/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'db_store',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([ProductEntity]),
  ],
  controllers: [AppController, ProductsController, UploadController],
  providers: [AppService, ProductsService],
})
export class AppModule  {}
