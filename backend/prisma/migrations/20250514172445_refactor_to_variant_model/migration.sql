/*
  Warnings:

  - You are about to drop the column `productId` on the `image` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `sold` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `product` table. All the data in the column will be lost.
  - Added the required column `variantId` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `brand` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `model` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `image` DROP FOREIGN KEY `Image_productId_fkey`;

-- DropIndex
DROP INDEX `Image_productId_fkey` ON `image`;

-- AlterTable
ALTER TABLE `image` DROP COLUMN `productId`,
    ADD COLUMN `variantId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `price`,
    DROP COLUMN `quantity`,
    DROP COLUMN `sold`,
    DROP COLUMN `title`,
    ADD COLUMN `brand` VARCHAR(191) NOT NULL,
    ADD COLUMN `model` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Variant` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` INTEGER NOT NULL,
    `variant` VARCHAR(191) NOT NULL,
    `collaboration` JSON NULL,
    `colorway` VARCHAR(191) NOT NULL,
    `gender` VARCHAR(191) NULL,
    `limitedEdition` BOOLEAN NOT NULL DEFAULT false,
    `price` DOUBLE NOT NULL,
    `sold` INTEGER NOT NULL DEFAULT 0,
    `quantity` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Variant` ADD CONSTRAINT `Variant_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_variantId_fkey` FOREIGN KEY (`variantId`) REFERENCES `Variant`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
