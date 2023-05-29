import { PartialType } from '@nestjs/mapped-types'
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EmployeeCreateDTO {
   @IsNotEmpty()
   @IsString()
   name: string;

   @IsBoolean()
   @IsOptional()
   is_active?: boolean;
}

export class EmployeeUpdateDTO extends PartialType(EmployeeCreateDTO) {}