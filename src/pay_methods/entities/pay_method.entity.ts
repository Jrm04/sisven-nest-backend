import { Invoice } from "src/invoices/entities/invoice.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class PayMethod {
    @PrimaryGeneratedColumn() id: number;

    @Column ({ type: "varchar", length: 10, unique: true }) name: string;

    @Column ({ type: "text" }) other_details: string;

    @CreateDateColumn() timestamps: Date;

    @OneToMany(() => Invoice, (invoice) => invoice.client) invoices: Invoice[]; 
}
