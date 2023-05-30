import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../database/prisma.service';
import { DataFactory } from '../database/data.factory';
import { MembershipService } from './membership.service';
import { CommitteeService } from './committee.service';
import { EmployeeService } from './employee.service';

describe('MembershipService', () => {
   let employeeService: EmployeeService;
   let committeeService: CommitteeService;
   let membershipService: MembershipService;
   let prismaService: PrismaService;

   const factory = new DataFactory();

   beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
         providers: [EmployeeService, CommitteeService, MembershipService, PrismaService],
      }).compile();

      employeeService = module.get<EmployeeService>(EmployeeService);
      committeeService = module.get<CommitteeService>(CommitteeService);
      membershipService = module.get<MembershipService>(MembershipService);
      prismaService = module.get<PrismaService>(PrismaService);
   });

   describe('create', () => {
      it('should call prismaService.create', async () => {
         jest
            .spyOn(prismaService.membership, 'create')
            .mockImplementationOnce((): any => undefined);

         const mock = factory.newMockMembership();

         await membershipService.create({
            ...mock.data,
            employee: { connect: { id: mock.where.employee_id } },
            committee: { connect: { id: mock.where.committee_id } },
         });

         expect(prismaService.membership.create).toBeCalled();
      });

      it('should create', async () => {
         const employee = await employeeService.create(factory.newMockEmployee());
         const com = await committeeService.create(factory.newMockCommittee());

         const mock = factory.newMockMembership(employee, com);

         const response = await membershipService.create({
            ...mock.data,
            employee: { connect: { id: mock.where.employee_id } },
            committee: { connect: { id: mock.where.committee_id } },
         });

         expect(response).toBeDefined();         
      });
   });

   describe('findById', () => {
      it('should call prismaService.findUnique', async () => {
         jest
            .spyOn(prismaService.membership, 'findUnique')
            .mockImplementationOnce((): any => undefined);

         const mock = factory.newMockMembership();

         await membershipService.membership({
            where: {
               employee_id_committee_id: {
                  employee_id: mock.where.employee_id,
                  committee_id: mock.where.committee_id,
               },
            },
         });

         expect(prismaService.membership.findUnique).toBeCalled();
      });
   });

   describe('update', () => {
      it('should call prismaService.update', async () => {
         jest
            .spyOn(prismaService.membership, 'update')
            .mockImplementationOnce((): any => undefined);

         const mock = factory.newMockMembership();

         await membershipService.update({
            where: {
               employee_id_committee_id: {
                  employee_id: mock.where.employee_id,
                  committee_id: mock.where.committee_id,
               },
            },
            data: { observations: 'Updated observations' },
         });

         expect(prismaService.membership.update).toBeCalled();
      });
   });

   describe('delete', () => {
      it('should call prismaService.delete', async () => {
         jest
            .spyOn(prismaService.membership, 'delete')
            .mockImplementationOnce((): any => undefined);

         const mock = factory.newMockMembership();

         await membershipService.delete({
            employee_id_committee_id: {
               employee_id: mock.where.employee_id,
               committee_id: mock.where.committee_id,
            },
         });

         expect(prismaService.membership.delete).toBeCalled();
      });
   });
});
