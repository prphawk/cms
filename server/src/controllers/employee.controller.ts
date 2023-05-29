import {
   Controller,
   Get,
   Post,
   Body,
   Delete,
   ParseIntPipe,
   Patch,
   Query,
} from '@nestjs/common';
import { EmployeeService } from '../services/employee.service';
import { Employee, Prisma } from '@prisma/client';
import { EmployeeCreateDTO, EmployeeUpdateDTO } from '../DTOs/employee.dto';

@Controller('employee')
export class EmployeeController {
   constructor(private readonly employeeService: EmployeeService) {}

   // /employee?id=1
   @Get()
   async getOne(
      @Query('id', ParseIntPipe) id: number,
   ): Promise<Employee> {
      return this.employeeService.getOne(id);
   }

   // /employee/all
   @Get('/all')
   async getAll(
   ): Promise<Employee[]> {
      return this.employeeService.getAll();
   }

   @Get('/history')
   async getHistory(
   ) {
      return this.employeeService.getActiveMemberCommitteeHistory();
   }
   
   // /employee/options
   @Get('/options')
   async getOptions(
   ): Promise<any[]> {
      return this.employeeService.getOptions();
   }

   // /employee
   @Post()
   async create(@Body('data') data: EmployeeCreateDTO): Promise<Employee> {
      return this.employeeService.create(data);
   }

   // /employee?id=1
   @Patch()
   async update(
      @Query('id') id: number,
      @Body('data') data: EmployeeUpdateDTO,
   ): Promise<Employee> {
      return this.employeeService.update({
         where: { id },
         data,
      });
   }

   // /employee?id=1
   @Delete()
   async delete(@Query('id') id: number): Promise<Employee> {
      return this.employeeService.delete({ id });
   }
}
