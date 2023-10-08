import { Category } from "src/categories/entities/category.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn() id: number;

    @Column ({ type: "varchar", length: 30 }) name: string;

    @Column ({ type: "decimal" }) price: number;

    @Column ({ type: "integer" }) stock: number;

    @ManyToOne(() => Category, (category) => category.products) category: Category;

    @CreateDateColumn() timestamps: Date;
}
