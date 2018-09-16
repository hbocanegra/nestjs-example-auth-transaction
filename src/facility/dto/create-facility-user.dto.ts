import {Exclude, classToPlain} from 'class-transformer';

export class CreateFacilityUserDto {
    id: number;
    username: string;
    email: string;

    @Exclude()
    password: string;

    toJSON() {
        return classToPlain(this);
    }
    // @IsString() readonly username: string;
    //
    // @IsString() password: string|undefined;
    //
    // @IsString() readonly email: string;
    //
    // @ValidateIf(o => o instanceof CreateFacilityDto) facility: string;
}

// import {Exclude, classToPlain} from "class-transformer";

// export default class User {
//     id: number;
//
//     email: string;
//
//     @Exclude()
//     password: string;
//
//     toJSON() {
//         return classToPlain(this);
//     }
// }