import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique} from 'typeorm';
import { User } from './user.entity';

@Entity({name:'transaction'})
export class Transaction {
    @PrimaryGeneratedColumn('increment')
    id?: number;

    @ManyToOne(type => User, userId => userId.id)
    @JoinColumn({name: "user_id"})
    userId: number;

    @Column({name: "amount", type: "double"})
    amount: number;

    @Column({name: "merchant_id"})
    merchantId: number;

    @Column({name: "type"})
    type: number;
    
}
