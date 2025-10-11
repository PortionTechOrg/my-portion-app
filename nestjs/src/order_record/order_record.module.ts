import { Module } from '@nestjs/common';
import { OrderRecordService } from './order_record.service';
import { OrderRecordController } from './order_record.controller';

@Module({
  providers: [OrderRecordService],
  controllers: [OrderRecordController]
})
export class OrderRecordModule {}
