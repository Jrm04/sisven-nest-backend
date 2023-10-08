import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './clients/entities/client.entity';
import { CategoriesModule } from './categories/categories.module';
import { Category } from './categories/entities/category.entity';
import { PayMethodsModule } from './pay_methods/pay_methods.module';
import { ProductsModule } from './products/products.module';
import { Product } from './products/entities/product.entity';

@Module({
  imports: [ClientsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'sisven',
      entities: [Client, Category, Product],
      synchronize: true,
    }),
    CategoriesModule,
    PayMethodsModule,
    ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  //constructor(private dataSource: DataSource) {}
}
