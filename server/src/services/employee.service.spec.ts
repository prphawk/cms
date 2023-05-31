import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../database/prisma.service';
import { DataFactory } from '../database/data.factory';
import { EmployeeService } from './employee.service'
import { EmployeeCreateDTO } from 'src/DTOs/employee.dto'

describe('EmployeeService', () => {
   let employeeService: EmployeeService;
   let prismaService: PrismaService;

   const factory = new DataFactory();

   const mockEmployee: EmployeeCreateDTO = {
      name: 'Test Name',
      is_active: false,
   };

   beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
         providers: [EmployeeService, PrismaService],
      }).compile();

      employeeService = module.get<EmployeeService>(EmployeeService);
      prismaService = module.get<PrismaService>(PrismaService);
   });

   describe('create', () => {
      it('should call prismaService.create', async () => {
         jest.spyOn(prismaService.employee, 'create').mockImplementationOnce((): any => undefined);

         await employeeService.create(factory.newMockEmployee());

         expect(prismaService.employee.create).toBeCalled();
      });

      it('should create and return employee', async () => {
         const employee = await employeeService.create(factory.newMockEmployee());

         expect(employee).toBeDefined();
      });

      it('should create and return employee with is_Active default value', async () => {
         const mock = factory.newMockEmployee();
         mock.is_active = undefined;

         const employee = await employeeService.create(mock);

         expect(employee.is_active).toBe(true);
      });

      it('should create and return employee w/ the correct attr values', async () => {
         const employee = await employeeService.create(mockEmployee);

         expect(employee.name).toEqual(mockEmployee.name);
         expect(employee.is_active).toBe(mockEmployee.is_active);
      });
   });

   describe('findById', () => {
      it('should call prismaService.findUnique', async () => {
         jest
            .spyOn(prismaService.employee, 'findUnique')
            .mockImplementationOnce((): any => undefined);

         await employeeService.employee({
            where: { id: factory.newMockEmployeeWithId().id },
         });

         expect(prismaService.employee.findUnique).toBeCalled();
      });

      it('should find Employee', async () => {
         const employee = await employeeService.create(factory.newMockEmployee());

         const response = await employeeService.employee({
            where: { id: employee.id },
         });

         expect(response && response.id).toEqual(employee.id);
      });
   });

   describe('update', () => {
      it('should call prismaService.update', async () => {
         jest.spyOn(prismaService.employee, 'update').mockImplementationOnce((): any => undefined);

         await employeeService.update({
            where: { id: factory.newMockEmployeeWithId().id },
            data: { name: 'Updated Name' },
         });

         expect(prismaService.employee.update).toBeCalled();
      });

      it('should update and return employee with the correct attr values', async () => {
         const updatedMock = { name: 'Updated Name', is_active: true };

         let employee = await employeeService.create(mockEmployee);

         employee = await employeeService.update({
            where: { id: employee.id },
            data: updatedMock,
         });

         expect(employee.name).toEqual(updatedMock.name);
         expect(employee.is_active).toBe(updatedMock.is_active);
      });
   });

   describe('delete', () => {
      it('should call prismaService.delete', async () => {
         jest.spyOn(prismaService.employee, 'delete').mockImplementationOnce((): any => undefined);

         await employeeService.delete({
            id: factory.newMockEmployeeWithId().id,
         });

         expect(prismaService.employee.delete).toBeCalled();
      });

      it('should delete', async () => {
         const employee = await employeeService.create(mockEmployee);

         const response = await employeeService.delete({
            id: employee.id,
         });

         expect(response.id).toEqual(employee.id);
      });
   });
});
