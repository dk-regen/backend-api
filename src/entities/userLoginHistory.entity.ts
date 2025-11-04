import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique} from 'typeorm';
import { User } from './user.entity';

@Entity({name:'user_login_history'})
export class UserLoginHistory {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(type => User, userId => userId.id)
    @JoinColumn({name: "user_id"})
    userId: number;

    @Column({name: "browser", type:'varchar', length:20})
    browser: string;

    @Column({name: "version", type:'varchar', length:20})
    version: string;

    @Column({name: "os", type:'varchar', length:20})
    os: string;

    @Column({name: "platform", type:'varchar', length:20})
    platform: string;

    @Column({name: "source", type:'text'})
    source: string;

    @Column({name: "status"})
    status: number;

    @Column({name: "login_date", type:'datetime'})
    loginDate: Date;
}
