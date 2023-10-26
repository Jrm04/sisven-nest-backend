import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { Repository } from 'typeorm';
import { Client } from 'src/clients/entities/client.entity';
import { PayMethod } from 'src/pay_methods/entities/pay_method.entity';

@Injectable()
export class InvoicesService {
  constructor (@InjectRepository(Invoice) private invoicesRepository: Repository<Invoice>,
               @InjectRepository(Client) private clientsRepository: Repository<Client>,
               @InjectRepository(PayMethod) private payMethodRepository: Repository<PayMethod>) {}

  
  async create(clientId: number, PayMethodId: number, createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
    const client = await this.clientsRepository.findOne({where: {id: clientId}});
    const payMethod = await this.payMethodRepository.findOne({where: {id: PayMethodId}});

    if (client && payMethod) {
      const invoice = this.invoicesRepository.create(createInvoiceDto);
      invoice.client = client;
      invoice.pay_method = payMethod;

      await this.invoicesRepository.save(invoice);
      
      return invoice;

    } else if (!client) {
      throw new NotFoundException (`This Client ID: ${clientId} Don't Exist`);

    } else if (!payMethod) {
      throw new NotFoundException (`This Pay Method ID: ${PayMethodId} Don't Exist`);
      
    }
  }

  findAll() {
    return this.invoicesRepository.find({relations: ['client', 'pay_method']});
  }

  findOne(id: number) {
    return `This action returns a #${id} invoice`;
  }

  update(id: number, updateInvoiceDto: UpdateInvoiceDto) {
    return `This action updates a #${id} invoice`;
  }

  remove(id: number) {
    return `This action removes a #${id} invoice`;
  }
}
