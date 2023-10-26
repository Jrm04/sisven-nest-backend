import { PartialType } from '@nestjs/mapped-types';
import { CreateInvoiceDto } from './create-invoice.dto';

export class UpdateInvoiceDto extends PartialType(CreateInvoiceDto) {
    id?: number;
    clientId?: number;
    payMethodId?: number;
    otherDetails?: string;
}
