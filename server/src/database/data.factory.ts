import { faker } from '@faker-js/faker';
import { Committee, Employee } from '@prisma/client';
import { CommitteeCreateDTO } from 'src/DTOs/committee.dto'
import { EmployeeCreateDTO } from 'src/DTOs/employee.dto'
import { MembershipCreateDTO, MembershipUniqueDTO } from 'src/DTOs/membership.dto'

export class DataFactory {
   constructor() {}

   newMockEmployee() {
      return {
         name: faker.name.fullName(),
         is_active: faker.datatype.boolean(),
      } as EmployeeCreateDTO;
   }

   newMockEmployeeWithId() {
      const mock = this.newMockEmployee() as Employee;
      mock.id = +faker.random.numeric(3);
      return mock;
   }

   newMockCommittee() {
      return {
         name: 'Órgão ' + faker.name.fullName(),
         bond: 'Vínculo ' + faker.commerce.department(),
         begin_date: faker.date.past(),
         end_date: faker.date.future(),
         ordinance: 'Portaria ' + faker.random.alphaNumeric(5),
         observations: faker.lorem.sentence(),
         is_active: true,
      } as CommitteeCreateDTO;
   }

   newMockCommitteeWithId() {
      const mock = this.newMockCommittee() as Committee;
      mock.id = +faker.random.numeric(3);
      return mock;
   }

   newMockMembership(mockEmployee?: Employee, mockCommittee?: Committee) {
      if (!mockEmployee) mockEmployee = this.newMockEmployeeWithId();
      if (!mockCommittee) mockCommittee = this.newMockCommitteeWithId();

      return {
         where: {
            employee_id: mockEmployee.id,
            committee_id: mockCommittee.id,
         } as MembershipUniqueDTO,
         data: {
            role: faker.name.jobType(),
            begin_date: faker.date.past(),
            term: +faker.random.numeric(),
            observations: faker.lorem.sentence(),
         } as MembershipCreateDTO
      }
   }
}
