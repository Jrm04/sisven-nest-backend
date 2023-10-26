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
import { InvoicesModule } from './invoices/invoices.module';
import { Invoice } from './invoices/entities/invoice.entity';
import { PayMethod } from './pay_methods/entities/pay_method.entity';

@Module({
  imports: [ClientsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'sisven',
      entities: [Client, Category, Product, Invoice, PayMethod],
      synchronize: true,
    }),
    CategoriesModule,
    PayMethodsModule,
    ProductsModule,
    InvoicesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  //constructor(private dataSource: DataSource) {}
}
