import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Client {
    @PrimaryGeneratedColumn() id: number;

    @Column("varchar", { length: 10 } ) name: string;

    @Column("varchar", { length: 20 }) lastname: string;

    @Column("varchar", { length: 30 }) direction: string;

    @Column("date") birth_date: Date;

    @Column("varchar", { length: 10 }) phone_number: string;

    @Column("varchar") email: string;

    @CreateDateColumn() timestamps: Date;

}
