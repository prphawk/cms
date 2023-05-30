import { Module } from '@nestjs/common';
import { EmployeeController } from './controllers/employee.controller';
import { CommiteeController } from './controllers/committee.controller';
import { MembershipController } from './controllers/membership.controller';
import { PrismaService } from './database/prisma.service';
import { CommitteeService } from './services/committee.service';
import { EmployeeService } from './services/employee.service';
import { MembershipService } from './services/membership.service';

@Module({
   imports: [],
   controllers: [EmployeeController, CommiteeController, MembershipController],
   providers: [PrismaService, CommitteeService, EmployeeService, MembershipService,
   ],
})
export class AppModule {}
