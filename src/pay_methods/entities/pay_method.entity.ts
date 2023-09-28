import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class PayMethod {
    @PrimaryGeneratedColumn() id: number;

    @Column ({ type: "varchar", length: 10, unique: true }) name: string;

    @Column ({ type: "text" }) other_details: string;

    @CreateDateColumn() timestamps: Date;
}
