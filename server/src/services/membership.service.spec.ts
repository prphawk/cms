import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../database/prisma.service';
import { DataFactory } from '../database/data.factory';
import { MemberOnCommitteeService } from './membership.service';
import { CommitteeService } from './committee.service';
import { EmployeeService } from './employee.service';
import { MemberOnCommitteeCreateDTO } from 'src/DTOs/membership.dto'

describe('MemberOnCommitteeService', () => {
   let employeeService: EmployeeService;
   let committeeService: CommitteeService;
   let memberOnCommitteeService: MemberOnCommitteeService;
   let prismaService: PrismaService;

   const factory = new DataFactory();

   beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
         providers: [EmployeeService, CommitteeService, MemberOnCommitteeService, PrismaService],
      }).compile();

      employeeService = module.get<EmployeeService>(EmployeeService);
      committeeService = module.get<CommitteeService>(CommitteeService);
      memberOnCommitteeService = module.get<MemberOnCommitteeService>(MemberOnCommitteeService);
      prismaService = module.get<PrismaService>(PrismaService);
   });

   describe('create', () => {
      it('should call prismaService.create', async () => {
         jest
            .spyOn(prismaService.memberOnCommittee, 'create')
            .mockImplementationOnce((): any => undefined);

         const mock = factory.newMockMemberOnCommittee();

         await memberOnCommitteeService.create({
            ...mock.data,
            employee: { connect: { id: mock.where.employee_id } },
            committee: { connect: { id: mock.where.committee_id } },
         });

         expect(prismaService.memberOnCommittee.create).toBeCalled();
      });

      it('should create', async () => {
         const employee = await employeeService.create(factory.newMockEmployee());
         const com = await committeeService.create(factory.newMockCommittee());

         const mock = factory.newMockMemberOnCommittee(employee, com);

         const response = await memberOnCommitteeService.create({
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
            .spyOn(prismaService.memberOnCommittee, 'findUnique')
            .mockImplementationOnce((): any => undefined);

         const mock = factory.newMockMemberOnCommittee();

         await memberOnCommitteeService.memberOnCommittee({
            where: {
               employee_id_committee_id: {
                  employee_id: mock.where.employee_id,
                  committee_id: mock.where.committee_id,
               },
            },
         });

         expect(prismaService.memberOnCommittee.findUnique).toBeCalled();
      });
   });

   describe('update', () => {
      it('should call prismaService.update', async () => {
         jest
            .spyOn(prismaService.memberOnCommittee, 'update')
            .mockImplementationOnce((): any => undefined);

         const mock = factory.newMockMemberOnCommittee();

         await memberOnCommitteeService.update({
            where: {
               employee_id_committee_id: {
                  employee_id: mock.where.employee_id,
                  committee_id: mock.where.committee_id,
               },
            },
            data: { observations: 'Updated observations' },
         });

         expect(prismaService.memberOnCommittee.update).toBeCalled();
      });
   });

   describe('delete', () => {
      it('should call prismaService.delete', async () => {
         jest
            .spyOn(prismaService.memberOnCommittee, 'delete')
            .mockImplementationOnce((): any => undefined);

         const mock = factory.newMockMemberOnCommittee();

         await memberOnCommitteeService.delete({
            employee_id_committee_id: {
               employee_id: mock.where.employee_id,
               committee_id: mock.where.committee_id,
            },
         });

         expect(prismaService.memberOnCommittee.delete).toBeCalled();
      });
   });
});
