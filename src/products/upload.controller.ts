import { Controller, Get, Param, Post, Res, HttpStatus, UseInterceptors, UploadedFile, Put } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import  { extname } from 'path';
import {ProductsService} from './products.service';

@Controller('upload')
export class UploadController {
    SERVER_URL: string = "http://localhost:3000/";

    constructor(private productService: ProductsService) {
    }

    @Put(':code')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './upload',
            filename: (req, file, cb) => {
                const randomName = Array(24).fill(null).map(() => {
                    return (Math.round(Math.random() * 16)).toString(16)
                }).join('');
                cb(null, `${randomName}${extname(file.originalname)}`);
            }
        })
    }))
    async putUpload(@Res() response, @Param('code') code, @UploadedFile() file) {
        this.productService.upload(code,`${this.SERVER_URL}${file.path}`).then(data => {
            response.status(HttpStatus.OK).json({
                ok: true,
                message: 'Imagen cargada correctamente.',
                data
            });
        }).catch(() => {
            response.status(HttpStatus.FORBIDDEN).json({data: 'Error al cargar imagen'});
        });
    }

    @Get(':file')
    async getUpload(@Param('file') file, @Res() response): Promise<any> {
        response.sendFile(file, {root: 'upload'});
    }
}
