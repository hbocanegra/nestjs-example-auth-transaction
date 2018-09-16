import {
    Controller, Post, HttpStatus, Get, Response, Body, UsePipes, ValidationPipe,
} from '@nestjs/common';
import { Facility } from './facility.entity';
import { FacilityService } from './facility.service';

import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { getManager } from 'typeorm';

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
    @UsePipes(new ValidationPipe({ transform: true }))
    async registerFacility(@Response() res: any, @Body() user: User): Promise<User> {
        try {
            await getManager().transaction(async transactionalEntityManager => {
                const facility = new Facility();
                facility.name = user.facility.name;
                facility.streetNumber = user.facility.streetNumber;
                facility.streetName = user.facility.streetName;
                facility.stateProvince = user.facility.stateProvince;
                facility.country = user.facility.country;
                facility.email = user.facility.email;
                user.facility = await transactionalEntityManager.save(facility);
                user.password = await this.userService.getHash(user.password);

                const newUser = await transactionalEntityManager.save(user);
                delete newUser.password;
                return res.status(HttpStatus.OK).json({
                    success: true,
                    payload: newUser,
                });
            });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                success: false,
                message: error.code,
            });
        }
    }
}