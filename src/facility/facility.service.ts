import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {getManager, Repository} from 'typeorm';
import { Facility } from './facility.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class FacilityService {
    private saltRounds = 10;

    constructor(
        @InjectRepository(Facility) private readonly facilityRepository: Repository<Facility>,
    ) {}

    async getFacilities(): Promise<Facility[]> {
        return await this.facilityRepository.find();
    }

    async createFacility(facility: Facility): Promise<Facility> {
        // user.passwordHash = await this.getHash(user.password);

        // clear password as we don't persist passwords
        // user.password = undefined;
        return await this.facilityRepository.save(facility);
    }

    buildFacility(obj: any): Facility {
        const facility = new Facility();
        facility.name = obj.facility.name;
        facility.streetNumber = obj.facility.streetNumber;
        facility.streetName = obj.facility.streetName;
        facility.stateProvince = obj.facility.stateProvince;
        facility.country = obj.facility.country;
        facility.email = obj.facility.email;
        return facility;
    }
    // async getHash(password: string|undefined): Promise<string> {
    //     return bcrypt.hash(password, this.saltRounds);
    // }
    //
    // async compareHash(password: string|undefined, hash: string|undefined): Promise<boolean> {
    //     return bcrypt.compare(password, hash);
    // }
}