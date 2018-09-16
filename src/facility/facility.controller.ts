import {Controller, Post, HttpStatus, HttpCode, Get, Response, Body, ValidationPipe, UsePipes} from '@nestjs/common';
import { Facility } from './facility.entity';
import { FacilityService } from './facility.service';

import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import {TransactionManager, getManager, Transaction, EntityManager} from 'typeorm';

@Controller('facility')
export class FacilityController {
    constructor(
        private readonly facilityService: FacilityService,
        private readonly userService: UserService,
    ) {}

    @Get()
    findAll(): Promise<Facility[]> {
        return this.facilityService.getFacilities();
    }

    @Post('register')
    async registerUser(@Response() res: any, @Body() body: User): Promise<User> {
        try {
            await getManager().transaction(async transactionalEntityManager => {
                // const facility = new Facility();
                // facility.name = body.facility.name;
                // facility.streetNumber = body.facility.streetNumber;
                // facility.streetName = body.facility.streetName;
                // facility.state = body.facility.state;
                // facility.province = body.facility.province;
                // facility.country = body.facility.country;
                // facility.email = body.facility.email;

                const facilityObj = this.facilityService.buildFacility(body.facility);

                const facility = await transactionalEntityManager.save(facilityObj);

                const user = new User();
                user.username = body.username;
                user.password = undefined;
                user.passwordHash = await this.userService.getHash(body.password);
                user.email = body.email;
                user.facility = facility;

                const userObj = await transactionalEntityManager.save(user);
                return userObj;
            });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }

}