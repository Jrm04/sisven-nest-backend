import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePayMethodDto } from './dto/create-pay_method.dto';
import { UpdatePayMethodDto } from './dto/update-pay_method.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PayMethod } from './entities/pay_method.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PayMethodsService {
  constructor(@InjectRepository(PayMethod) private PayMethodRepository: Repository<PayMethod>){}

  async create(createPayMethodDto: CreatePayMethodDto):Promise<PayMethod> {
    const pay_method = this.PayMethodRepository.create(createPayMethodDto);

    return await this.PayMethodRepository.save(pay_method);
  }

  async findAll(): Promise<PayMethod[]> {
    return await this.PayMethodRepository.find();
  }

  async findOne(id: number): Promise<PayMethod> {
    const pay_method = await this.PayMethodRepository.findOneBy({id});

    if (!pay_method) {
      throw new NotFoundException(`This Pay Method ID: ${id} Don't Exist`)
    }

    return pay_method;
  }

  async update(id: number, updatePayMethodDto: UpdatePayMethodDto): Promise<PayMethod> {
    const pay_method = await this.PayMethodRepository.findOneBy({id});

    if (!pay_method) {
      throw new NotFoundException(`This Pay Method ID: ${id} Don't Exist`);
    }

    pay_method.name = updatePayMethodDto.name;
    pay_method.other_details = updatePayMethodDto.other_details;

    return await this.PayMethodRepository.save(pay_method);
  }

  async remove(id: number) {
    const pay_method = await this.PayMethodRepository.findOneBy({id});

    if (!pay_method) {
      throw new NotFoundException(`This Pay Method ID: ${id} Don't Exist`)
    }

    await this.PayMethodRepository.remove(pay_method);
  }
}
