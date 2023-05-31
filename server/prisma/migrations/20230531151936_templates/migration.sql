/*
  Warnings:

  - You are about to drop the column `term` on the `committee` table. All the data in the column will be lost.
  - You are about to drop the column `committeeTemplateId` on the `roletemplate` table. All the data in the column will be lost.
  - Added the required column `committee_template_id` to the `RoleTemplate` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `roletemplate` DROP FOREIGN KEY `RoleTemplate_committeeTemplateId_fkey`;

-- AlterTable
ALTER TABLE `committee` DROP COLUMN `term`,
    ADD COLUMN `committee_template_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `committeetemplate` ADD COLUMN `is_singleton` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `roletemplate` DROP COLUMN `committeeTemplateId`,
    ADD COLUMN `committee_template_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Committee` ADD CONSTRAINT `Committee_committee_template_id_fkey` FOREIGN KEY (`committee_template_id`) REFERENCES `CommitteeTemplate`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RoleTemplate` ADD CONSTRAINT `RoleTemplate_committee_template_id_fkey` FOREIGN KEY (`committee_template_id`) REFERENCES `CommitteeTemplate`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
