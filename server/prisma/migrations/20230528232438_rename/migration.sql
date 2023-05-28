/*
  Warnings:

  - You are about to drop the `member` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `membersoncommittees` DROP FOREIGN KEY `MembersOnCommittees_member_id_fkey`;

-- DropTable
DROP TABLE `member`;

-- CreateTable
CREATE TABLE `Employee` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MembersOnCommittees` ADD CONSTRAINT `MembersOnCommittees_member_id_fkey` FOREIGN KEY (`member_id`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
