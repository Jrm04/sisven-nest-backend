import { Client } from "src/clients/entities/client.entity";
import { PayMethod } from "src/pay_methods/entities/pay_method.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Invoice {
    @PrimaryGeneratedColumn() id: number;

    @ManyToOne(() => Client, (client) => client.invoices) client: Client;

    @ManyToOne(() => PayMethod, (pay_method) => pay_method.invoices) pay_method: PayMethod;

    @Column({ type: "text"}) otherDetails: string;

    @CreateDateColumn() timestamps: Date;
}
