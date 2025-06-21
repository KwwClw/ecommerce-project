/*
  Warnings:

  - Added the required column `sizetype` to the `VariantSize` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `variantsize` ADD COLUMN `sizetype` VARCHAR(191) NOT NULL;
