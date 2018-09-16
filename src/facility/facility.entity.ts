import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Facility {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 500 })
    name: string;

    @Column({ nullable: true })
    streetNumber: number;

    @Column({ length: 500, nullable: true })
    streetName: string;

    @Column({ length: 500, nullable: true })
    stateProvince: string;

    @Column({ length: 500, nullable: true })
    country: string;

    @Column({ length: 500 })
    email: string;

    @OneToMany(type => User, user => user.facility)
    users: User[];
}