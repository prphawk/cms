import { PartialType } from "@nestjs/mapped-types"
import { Type } from "class-transformer"
import { IsString, IsOptional, Min, Max, IsInt, IsNotEmpty, IsDate, IsBoolean } from "class-validator"

export class MemberOnCommitteeCreateDTO {
  @IsString()
  @IsOptional()
  role?: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  begin_date?: Date;

  @Min(1)
  @Max(100)
  @IsInt()
  @IsOptional()
  term?: number;

  @IsString()
  @IsOptional()
  observations?: string;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}

export class MemberOnCommitteeUniqueDTO {
  @IsNotEmpty()
  @IsInt()
  employee_id: number;

  @IsNotEmpty()
  @IsInt()
  committee_id: number;
}

export class MemberOnCommitteeUpdateDTO extends PartialType(MemberOnCommitteeCreateDTO) {}