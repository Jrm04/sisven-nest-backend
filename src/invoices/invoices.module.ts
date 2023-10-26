import { Module } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { Client } from 'src/clients/entities/client.entity';
import { PayMethod } from 'src/pay_methods/entities/pay_method.entity';
import { ClientsController } from 'src/clients/clients.controller';
import { PayMethodsController } from 'src/pay_methods/pay_methods.controller';
import { ClientsService } from 'src/clients/clients.service';
import { PayMethodsService } from 'src/pay_methods/pay_methods.service';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice, Client, PayMethod])],
  controllers: [InvoicesController, ClientsController, PayMethodsController],
  providers: [InvoicesService, ClientsService, PayMethodsService],
})
export class InvoicesModule {}
