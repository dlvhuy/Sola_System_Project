import { plainToInstance } from "class-transformer";
import { LessionReport } from "../entity/lession-report.entity";

export class CreateLessionReportDto {
    studentID: number;
    name_lession: string;
    date_lession: string;
    class_thinking_skill: number;
    comment_thinking_skill: string;
    class_attitude: number;
    comment_attitude: string;
    class_theory_skill: number;
    comment_theory_skill: string;
    class_practice_skill: number;
    comment_practice_skill: string;
}

export function mapLessionReportDtoToModel(dto: CreateLessionReportDto): LessionReport {
    return plainToInstance(LessionReport, dto);
}