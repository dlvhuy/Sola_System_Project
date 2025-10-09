import { plainToInstance } from "class-transformer";
import { Student } from "../entity/student.entity";

export class CreateStudentDto {
    id?:number
    name: string;
    birthday: string;
    gender: string;
    nameParent: string;
    phoneNumber: string;
    address: string;
}
export function mapStudentDtoToModel(dto: CreateStudentDto): Student {
    return plainToInstance(Student, dto);
}