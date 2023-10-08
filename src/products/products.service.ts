import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';


@Injectable()
export class ProductsService {
  constructor (@InjectRepository(Product) private readonly productRepository: Repository<Product>,
               @InjectRepository(Category) private readonly categoriesRepository: Repository<Category>) {}

  async create(id: number, createProductDto: CreateProductDto): Promise<Product> {

    const category = await this.categoriesRepository.findOneBy({id});

    if (category) {
      const product = this.productRepository.create(createProductDto);
      product.category = category;

      await this.productRepository.save(product);
      return product;
    }

    throw new NotFoundException (`This Category ID: ${id} Don't Exist`);
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
