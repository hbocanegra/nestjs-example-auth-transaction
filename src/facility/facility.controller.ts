import {
    Controller, Post, HttpStatus, HttpCode, Get, Response, Body, UsePipes,
    UseInterceptors, ValidationPipe
} from '@nestjs/common';
import { Facility } from './facility.entity';
import { FacilityService } from './facility.service';

import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { getManager } from 'typeorm';
import {CreateFacilityUserDto} from './dto/create-facility-user.dto';
import {LoggingInterceptor} from '../common/interceptors/logging.interceptor';
import {TransformInterceptor} from '../common/interceptors/transform.interceptor';
// import {ValidationPipe} from '../common/pipes/validation.pipe';
import {CreateFacilityDto} from "./dto/create-facility.dto";

@Controller('facility')
// @UseInterceptors(LoggingInterceptor, TransformInterceptor)
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
                return res.status(HttpStatus.OK).json({
                    success: true,
                    payload: newUser,
                });
            });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }

    private buildFacility(obj: any): Facility {
        const facility = new Facility();
        facility.name = obj.facility.name;
        facility.streetNumber = obj.facility.streetNumber;
        facility.streetName = obj.facility.streetName;
        facility.stateProvince = obj.facility.stateProvince;
        facility.country = obj.facility.country;
        facility.email = obj.facility.email;
        return facility;
    }

}