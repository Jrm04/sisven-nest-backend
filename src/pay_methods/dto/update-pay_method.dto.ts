import { PartialType } from '@nestjs/mapped-types';
import { CreatePayMethodDto } from './create-pay_method.dto';

export class UpdatePayMethodDto extends PartialType(CreatePayMethodDto) {
    name?: string;
    other_details?: string;
}
