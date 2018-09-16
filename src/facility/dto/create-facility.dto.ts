import { IsString, IsInt,ValidateIf } from 'class-validator';
import {User} from "../../user/user.entity";
import {Facility} from "../facility.entity";

export class CreateFacilityDto {
    @ValidateIf(o => o instanceof User) user: User;
    @ValidateIf(o => o instanceof Facility) facility: Facility;
    // @IsString() readonly name: string;
    //
    // @IsInt() readonly streetNumber: number;
    //
    // @IsString() readonly streetName: string;
    //
    // @IsString() readonly stateProvince: string;
    //
    // @IsString() readonly country: string;
    //
    // @IsString() readonly email: string;
}