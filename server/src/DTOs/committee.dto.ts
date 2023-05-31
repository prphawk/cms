import { OmitType, PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
   IsNotEmpty,
   IsString,
   IsBoolean,
   IsOptional,
   IsInt,
   IsDate,
   IsArray,
} from 'class-validator';

export class CommitteeCreateDTO {
   @IsNotEmpty()
   @IsString()
   bond: string;

   @IsNotEmpty()
   @IsString()
   name: string;

   @IsBoolean()
   @IsOptional()
   is_active?: boolean;

   @IsDate()
   @IsOptional()
   @Type(() => Date)
   begin_date?: Date;

   @IsDate()
   @IsOptional()
   @Type(() => Date)
   end_date?: Date;

   @IsString()
   @IsOptional()
   ordinance?: string;

   @IsString()
   @IsOptional()
   observations?: string;

   @IsArray()
   @IsInt({ each: true })
   @IsOptional()
   members?: number[];

   @IsOptional()
   committee_template?: number;
}

export class CommitteeUpdateDTO extends PartialType(
   OmitType(CommitteeCreateDTO, ['members', 'committee_template'] as const),
) {}
