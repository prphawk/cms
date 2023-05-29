import { Module } from '@nestjs/common';
import { EmployeeController } from './controllers/employee.controller';
import { CommiteeController } from './controllers/committee.controller';
import { MemberOnCommitteeController } from './controllers/member_on_committee.controller';
import { PrismaService } from './database/prisma.service';
import { CommitteeService } from './services/committee.service';
import { EmployeeService } from './services/employee.service';
import { MemberOnCommitteeService } from './services/member_on_committee.service';

@Module({
   imports: [],
   controllers: [EmployeeController, CommiteeController, MemberOnCommitteeController],
   providers: [PrismaService, CommitteeService, EmployeeService, MemberOnCommitteeService,
   ],
})
export class AppModule {}
