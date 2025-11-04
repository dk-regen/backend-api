import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique} from 'typeorm';
import { User } from './user.entity';

@Entity({name:'user_wallet'})
export class UserWallet {
    @PrimaryGeneratedColumn('increment')
    id?: number;

    @OneToOne(type => User, userId => userId.id)
    @JoinColumn({name: "user_id"})
    userId: number;

    @Column({name: "account_number", type:'double'})
    accountNumber: number;

    @Column({name: "balance", type:'double'})
    balance: number;
}
