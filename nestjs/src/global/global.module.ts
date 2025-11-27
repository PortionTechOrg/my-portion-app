import { Global, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';

@Global()
@Module({
    imports: [
        MulterModule.register(
          { storage: diskStorage({
            destination: (req, file, cb) => {
              cb(null, './dist/nestjs/uploads');
            },
            
            filename: (req, file, cb) => {
          
              const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
              const fileExtension = path.extname(file.originalname);
              const newFileName = file.originalname + uniqueSuffix + fileExtension;
              cb(null, newFileName);
            },
          }) }
        ),],

    exports: [MulterModule]
})
export class GlobalModule {}
