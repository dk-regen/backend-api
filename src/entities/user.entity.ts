import {Column, Entity, PrimaryGeneratedColumn, Unique} from 'typeorm';

@Entity({name:'app_user'})
export class User {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({name: "first_name", type:'varchar', length:20})
    firstName: string;

    @Column({name: "last_name", type:'varchar', length:20})
    lastName: string;

    @Column({name: "date_of_birth", type:'date'})
    dateOfBirth: Date;

    @Column({name: "street_address", type:'varchar', length:40})
    streetAddress: string;

    @Column({name: "city", type:'varchar', length:20})
    city: string;

    @Column({name: "province", type:'varchar', length:20})
    province: string;

    @Column({name: "telephone_number", type:'varchar', length:20})
    telephoneNumber: string;

    @Column({name: "email_address", type:'varchar', length:20})
    @Unique(['email_address'])
    emailAddress: string;

    @Column({name: "password", type:'varchar', length:100})
    password?: string;

    @Column({name: "registration_date", type:'datetime'})
    registrationDate: Date;
}
