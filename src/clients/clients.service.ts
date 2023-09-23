import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Repository } from 'typeorm'; //Sirve para usar la entidad como si fuese un "repositorio" de datos 
import { Client } from './entities/client.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ClientsService {
  constructor(@InjectRepository(Client) private clientsRepository: Repository<Client>) {} //Se crea un clientsRepository de tipo client que es la plantilla de la entidad

  create(createClientDto: CreateClientDto) {
    const newClient = this.clientsRepository.create(createClientDto);
    return this.clientsRepository.save(newClient);
  }

  findAll(): Promise<Client[]> {
    return this.clientsRepository.find();
  }

  findOne(id: number): Promise<Client | null > {
    return this.clientsRepository.findOneBy({id});
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    const updateClient = await this.clientsRepository.findOneBy({id});
    
    updateClient.name = updateClientDto.name;
    updateClient.lastname = updateClientDto.lastname;
    updateClient.direction = updateClientDto.direction;
    updateClient.birth_date = updateClientDto.birth_date;
    updateClient.phone_number = updateClientDto.phone_number;
    updateClient.email = updateClientDto.email;
    

    return await this.clientsRepository.save(updateClient);
  }

  async remove(id: number): Promise<void> {
    await this.clientsRepository.delete(id);
  }
}
