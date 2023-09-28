import { Module } from '@nestjs/common';
import { PayMethodsService } from './pay_methods.service';
import { PayMethodsController } from './pay_methods.controller';
import { PayMethod } from './entities/pay_method.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PayMethod])],
  controllers: [PayMethodsController],
  providers: [PayMethodsService],
})
export class PayMethodsModule {}
