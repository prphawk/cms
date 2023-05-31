import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
   IsString,
   IsOptional,
   Min,
   Max,
   IsInt,
   IsNotEmpty,
   IsDate,
   IsBoolean,
} from 'class-validator';

<<<<<<< HEAD:server/src/DTOs/member_on_committee.dto.ts
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
   member_id: number;
=======
export class MembershipCreateDTO {
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

export class MembershipUniqueDTO {
  @IsNotEmpty()
  @IsInt()
  employee_id: number;
>>>>>>> refactor:server/src/DTOs/membership.dto.ts

   @IsNotEmpty()
   @IsInt()
   committee_id: number;
}

<<<<<<< HEAD:server/src/DTOs/member_on_committee.dto.ts
export class MemberOnCommitteeUpdateDTO extends PartialType(MemberOnCommitteeCreateDTO) {}
=======
export class MembershipUpdateDTO extends PartialType(MembershipCreateDTO) {}
>>>>>>> refactor:server/src/DTOs/membership.dto.ts
