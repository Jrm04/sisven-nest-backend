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
  constructor(@InjectRepository(Invoice) private invoicesRepository: Repository<Invoice>,
    @InjectRepository(Client) private clientsRepository: Repository<Client>,
    @InjectRepository(PayMethod) private payMethodRepository: Repository<PayMethod>) { }


  async create(clientId: number, PayMethodId: number, createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
    const client = await this.clientsRepository.findOne({ where: { id: clientId } });
    const payMethod = await this.payMethodRepository.findOne({ where: { id: PayMethodId } });

    if (client && payMethod) {
      const invoice = this.invoicesRepository.create(createInvoiceDto);
      invoice.client = client;
      invoice.pay_method = payMethod;

      await this.invoicesRepository.save(invoice);

      return invoice;

    } else if (!client) {
      throw new NotFoundException(`This Client ID: ${clientId} Don't Exist`);

    } else if (!payMethod) {
      throw new NotFoundException(`This Pay Method ID: ${PayMethodId} Don't Exist`);

    }

    /* const invoice = new Invoice();

    invoice.client = { id: clientId } as any;
    invoice.pay_method = { id: PayMethodId } as any;

    return await this.invoicesRepository.save(invoice);
     */
  }

  async findAll(): Promise<Invoice[]> {
    return await this.invoicesRepository.find({ relations: ['client', 'pay_method'] });
  }

  async findOne(id: number): Promise<Invoice> {
    const invoice = await this.invoicesRepository.findOne({ where: { id }, relations: ['client', 'pay_method'] });

    if (!invoice) {
      throw new NotFoundException(`This Invoice ID: ${id} Don't Exist`);
    } else {
      return invoice;
    }

  }

  async update(id: number, clientId: number, payMethodId: number, updateInvoiceDto: UpdateInvoiceDto): Promise<Invoice> {
    const updateInvoice = await this.invoicesRepository.findOne({ where: { id }, relations: ['client', 'pay_method'] });

    if (!updateInvoice) {

      throw new NotFoundException (`This Invoice ID: ${id} Don't Exist`);

    }
    
    const updateClient = await this.clientsRepository.findOne({ where: { id: clientId } });
    
    if (!updateClient) {
      
      throw new NotFoundException(`This Client ID: ${clientId} Don't Exist`);
      
    }
    
    const updatePayMethod = await this.payMethodRepository.findOne({ where: { id: payMethodId } });
    
    if (!updatePayMethod) {
      
      throw new NotFoundException(`This Pay Method ID: ${payMethodId} Don't Exist`);
      
    }
    
    updateInvoice.otherDetails = updateInvoiceDto.otherDetails;
    updateInvoice.client = updateClient;
    updateInvoice.pay_method = updatePayMethod;
    
    return await this.invoicesRepository.save(updateInvoice);
  }

  async remove(id: number) {
    const invoice = await this.invoicesRepository.findOneBy({id});

    if (!invoice) {

      throw new NotFoundException (`This Invoice ID: ${id} Don't Exist`);

    }

    return this.invoicesRepository.remove(invoice);
  }
}
