/*
  Warnings:

  - The primary key for the `membersoncommittees` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `member_id` on the `membersoncommittees` table. All the data in the column will be lost.
  - Added the required column `employee_id` to the `MembersOnCommittees` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `membersoncommittees` DROP FOREIGN KEY `MembersOnCommittees_member_id_fkey`;

-- AlterTable
ALTER TABLE `membersoncommittees` DROP PRIMARY KEY,
    DROP COLUMN `member_id`,
    ADD COLUMN `employee_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`employee_id`, `committee_id`);

-- AddForeignKey
ALTER TABLE `MembersOnCommittees` ADD CONSTRAINT `MembersOnCommittees_employee_id_fkey` FOREIGN KEY (`employee_id`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
