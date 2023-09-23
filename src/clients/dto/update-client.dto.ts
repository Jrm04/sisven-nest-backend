import { PartialType } from '@nestjs/mapped-types';
import { CreateClientDto } from './create-client.dto';

export class UpdateClientDto extends PartialType(CreateClientDto) {
    name?: string;
    lastname?: string;
    direction?: string;
    birth_date?: Date;
    phone_number?: string;
    email?: string;
}
