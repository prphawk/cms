import {
   Controller,
   Get,
   Post,
   Body,
   Patch,
   ParseIntPipe,
   Query,
} from '@nestjs/common';
import { MembershipService } from '../services/membership.service';
import { Membership as MembershipModel } from '@prisma/client';
import { MembershipCreateDTO, MembershipUpdateDTO } from 'src/DTOs/membership.dto'
import { ValidatePayloadExistsPipe } from 'src/pipes/validate_payload_exists'

@Controller('membership')
export class MembershipController {
   constructor(private readonly membershipService: MembershipService) {}

   // @Get()
   // async getOne(
   //    @Query('employee_id', ParseIntPipe) employee_id: number,
   //    @Query('committee_id', ParseIntPipe) committee_id: number
   // ): Promise<MembershipModel> {
   //    return this.membershipService.membership({
   //       where: { employee_id_committee_id: { employee_id, committee_id } },
   //    });
   // }
   
   @Get('/role_history')
   async getHistory(
      @Query('committee_id', ParseIntPipe) committee_id: number,
      @Query('role') role: string,
   ): Promise<MembershipModel[]> {
      return this.membershipService.memberships({
         where: {
            committee_id,
            role//: { equals: role } 
         },
         select: {
            role: true,
            begin_date: true,
            term: true,
            observations: true,
            employee: { select: { 
               id: true,
               name: true } }
         },
         orderBy: {
            employee: {
               name: "asc"
            }
         }
      });
   }


   @Post()
   async create( //TODO tentar quebrar ao fazer update por POST.
      @Query('employee_id', ParseIntPipe) employee_id: number,
      @Query('committee_id', ParseIntPipe) committee_id: number,
      @Body('data', ValidatePayloadExistsPipe) data: MembershipCreateDTO,
   ): Promise<MembershipModel> {
      return this.membershipService.create({
         ...data as MembershipCreateDTO,
         employee: { connect: { id: employee_id } },
         committee: { connect: { id: committee_id } },
      });
   }

   @Patch()
   async update(
      @Query('employee_id', ParseIntPipe) employee_id: number,
      @Query('committee_id', ParseIntPipe) committee_id: number,
      @Body('data', ValidatePayloadExistsPipe) data: MembershipUpdateDTO,
   ): Promise<MembershipModel> {
      return this.membershipService.update({
         where: { employee_id_committee_id: { employee_id, committee_id } },
         data
      });
   }

   // @Delete()
   // async delete(
   //    @Query('employee_id', ParseIntPipe) employee_id: number,
   //    @Query('committee_id', ParseIntPipe) committee_id: number
   // ): Promise<MembershipModel> {
   //    return this.membershipService.delete({
   //       employee_id_committee_id: { employee_id, committee_id },
   //    });
   // }
}
