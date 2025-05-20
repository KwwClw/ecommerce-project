/*
  Warnings:

  - You are about to alter the column `colorway` on the `variant` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.
  - Added the required column `sizes` to the `Variant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `variant` ADD COLUMN `includedAccessories` JSON NULL,
    ADD COLUMN `releaseDate` DATETIME(3) NULL,
    ADD COLUMN `sizes` JSON NOT NULL,
    MODIFY `colorway` JSON NOT NULL;
