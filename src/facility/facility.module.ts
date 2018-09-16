import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Facility } from './facility.entity';
import { FacilityService } from './facility.service';
import {FacilityController} from './facility.controller';
import {UserModule} from '../user/user.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Facility]),
        UserModule,
    ],
    providers: [FacilityService],
    controllers: [FacilityController],
    exports: [FacilityService],
})
export class FacilityModule {}