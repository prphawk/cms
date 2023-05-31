import { Module } from '@nestjs/common';

import { EmployeeController } from './controllers/employee.controller';
import { MembershipController } from './controllers/membership.controller';
import { PrismaService } from './database/prisma.service';
import { CommitteeService } from './services/committee.service';
import { EmployeeService } from './services/employee.service';
import { MembershipService } from './services/membership.service';
import { CommitteeController } from './controllers/committee.controller'

@Module({
   imports: [],
   controllers: [EmployeeController, CommitteeController, MembershipController],
   providers: [PrismaService, CommitteeService, EmployeeService, MembershipService,
   ],
})
export class AppModule {}
