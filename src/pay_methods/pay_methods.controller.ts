import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PayMethodsService } from './pay_methods.service';
import { CreatePayMethodDto } from './dto/create-pay_method.dto';
import { UpdatePayMethodDto } from './dto/update-pay_method.dto';

@Controller('pay-methods')
export class PayMethodsController {
  constructor(private readonly payMethodsService: PayMethodsService) {}

  @Post()
  create(@Body() createPayMethodDto: CreatePayMethodDto) {
    return this.payMethodsService.create(createPayMethodDto);
  }

  @Get()
  findAll() {
    return this.payMethodsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.payMethodsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePayMethodDto: UpdatePayMethodDto) {
    return this.payMethodsService.update(+id, updatePayMethodDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.payMethodsService.remove(+id);
  }
}
