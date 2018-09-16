import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import {Facility} from '../facility/facility.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 50, unique: true })
    username: string;

    @Column({ length: 100, nullable: true })
    password: string|undefined;

    @Column({ length: 100, nullable: true })
    passwordHash: string|undefined;

    @Column({ length: 500 })
    email: string;

    @ManyToOne(type => Facility, facility => facility.users)
    facility: Facility;
}