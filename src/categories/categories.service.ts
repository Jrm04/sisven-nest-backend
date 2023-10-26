import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(Category) private categoriesRepository: Repository<Category>){}

  async create(createCategoryDto: CreateCategoryDto):Promise<Category> {
    const category = this.categoriesRepository.create(createCategoryDto);
  
    return await this.categoriesRepository.save(category);
  }

  async findAll(): Promise<Category[]> {
    return await this.categoriesRepository.find();
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoriesRepository.findOneBy({id});

    if (!category) {
      throw new NotFoundException(`This Category ID: ${id} Don't Exist`);
    } 

    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const category = await this.categoriesRepository.findOneBy({id});

    if (!category) {
      throw new NotFoundException(`This Category ID: ${id} Don't Exist`);
    }

    category.name = updateCategoryDto.name;
    category.description = updateCategoryDto.description;

    return await this.categoriesRepository.save(category);
  }

  async remove(id: number): Promise<void>{
    const category = await this.categoriesRepository.findOneBy({id});
    
    if (!category) {
      throw new NotFoundException(`This Category ID: ${id} Don't Exist`);
    }

    await this.categoriesRepository.remove(category);
  }
}
