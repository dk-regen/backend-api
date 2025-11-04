import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique} from 'typeorm';
import { User } from './user.entity';

@Entity({name:'refresh_token'})
export class RefreshToken {
    @PrimaryGeneratedColumn('increment')
    id?: number;

    @OneToOne(type => User, userId => userId.id)
    @JoinColumn({name: "user_id"})
    userId: number;

    @Column({name: "token", type:'text'})
    token: string;
}
