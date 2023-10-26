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

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find({ relations: ['category'] });
  }

  async findOne(id: number):Promise<Product | null> {
    const product = await this.productRepository.findOne({where: {id}, relations: ['category']});

    if (!product) {
      throw new NotFoundException (`This Product ID: ${id} Don't Exist`);
    }else {
      return product;
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto,  updateCategory: number): Promise<Product> {
    const updateProduct = await this.productRepository.findOne({where: {id}, relations: ['category']});

    if (!updateProduct) {
      throw new NotFoundException (`This Product ID: ${id} Don't Exist`);
    }

    updateProduct.name = updateProductDto.name;
    updateProduct.price = updateProductDto.price;
    updateProduct.stock = updateProductDto.stock;
    
    const category = await this.categoriesRepository.findOne({where: {id: updateCategory}}); //se busca el atributo ID dentro de la tabla category que sea igual a updateCategory que es el valor actualizado

    updateProduct.category = category;

    if (!category) {
      throw new NotFoundException (`This category ID: ${updateCategory} Don't Exist`);
    }

    return await this.productRepository.save(updateProduct);
  }

  async remove(id: number) {
    const product = await this.productRepository.findOneBy({id});

    if (!product) {
      throw new NotFoundException (`This Product ID: ${id} Don't Exist`);
    }

    await this.productRepository.remove(product);
  }
}
