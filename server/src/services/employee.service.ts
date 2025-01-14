import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Employee, Prisma } from '@prisma/client';

@Injectable()
export class EmployeeService {

   constructor(private prisma: PrismaService) {}

   async getOne(id: number): Promise<Employee | null> {
      return this.employee({
         where: { id },
         include: { 
            committees: { include: { committee: true } }
         },
      });
   }

   async getAll() {
      return this.prisma.employee.findMany({
         where: { is_active: true },
         orderBy: { name: "asc" },
         include: { committees: {
            include: { committee: true },
         }},
      });
   }

   async getOptions() {
      return this.prisma.employee.findMany({
         where: { is_active: true },
         orderBy: { name: "asc" },
         select: {
            id: true,
            name: true
         },
      });
   }

   async employee(params: Prisma.EmployeeFindUniqueOrThrowArgs): Promise<Employee | null> {
      return this.prisma.employee.findUnique(params);
   }


   async create(data: Prisma.EmployeeCreateInput): Promise<Employee> {
      return this.prisma.employee.create({ data });
   }

   async update(params: {
      where: Prisma.EmployeeWhereUniqueInput;
      data: Prisma.EmployeeUpdateInput;
   }): Promise<Employee> {
      return this.prisma.employee.update(params);
   }

   async delete(where: Prisma.EmployeeWhereUniqueInput): Promise<Employee> {
      return this.prisma.employee.delete({
         where,
      });
   }

   async getActiveMemberCommitteeHistory(): Promise<any[]> {
      const results = await this.prisma.employee.findMany({
         select: {
            id: true,
            name: true,
            committees: {
               select: {
                  role: true,
                  begin_date: true,
                  observations: true,
                  is_active: true,
                  committee: {
                     select: {
                        id: true,
                        name: true,
                     }
                  }
               },
            }
         },
         where: {
            is_active: true
         },
         orderBy: {
            name: "asc"
         }
      });

      if(!results) return

      results.forEach(m => {
         return (m as any).committees =  m.committees.reduce((obj, curr) => {
            obj[curr.is_active ? 'active' : 'inactive'].push(curr)
            return obj
         }, { active: new Array(), inactive: new Array() })
      })

      return results
   }
}
