import { IsString, ValidateIf } from 'class-validator';
import {CreateFacilityDto} from './create-facility.dto';

export class CreateFacilityUserDto {
    @IsString() readonly username: string;

    @IsString() password: string|undefined;

    @IsString() readonly email: string;

    @ValidateIf(o => o instanceof CreateFacilityDto) facility: string;
}