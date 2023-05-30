import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Membership, Prisma } from '@prisma/client';

@Injectable()
export class MembershipService {
   constructor(private prisma: PrismaService) {}

   async membership(
      params: Prisma.MembershipFindUniqueOrThrowArgs,
   ): Promise<Membership | null> {
      return this.prisma.membership.findUnique(params);
   }

   async memberships(
      params: Prisma.MembershipFindManyArgs,
   ): Promise<Membership[]> {
      return this.prisma.membership.findMany(params);
   }

   async create(data: Prisma.MembershipCreateInput): Promise<Membership> {
      return this.prisma.membership.create({
         data,
      });
   }

   async update(params: {
      where: Prisma.MembershipWhereUniqueInput;
      data: Prisma.MembershipUpdateInput;
   }): Promise<Membership> {
      return this.prisma.membership.update(params);
   }

   async delete(where: Prisma.MembershipWhereUniqueInput): Promise<Membership> {
      return this.prisma.membership.delete({
         where,
      });
   }
}
