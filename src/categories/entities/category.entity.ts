import { Product } from 'src/products/entities/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';

@Entity()
export class Category {
    @PrimaryGeneratedColumn() id: number;

    @Column({ type: "varchar", length: 64, unique:true }) name: string;

    @Column ({ type: "text", nullable: true }) description: string;

    @CreateDateColumn() timestamps: Date;

    @OneToMany(() => Product, (product) => product.category) products: Product[];
}
