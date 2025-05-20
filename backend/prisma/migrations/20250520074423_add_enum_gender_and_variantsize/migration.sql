/*
  Warnings:

  - You are about to drop the column `limitedEdition` on the `variant` table. All the data in the column will be lost.
  - You are about to drop the column `sizes` on the `variant` table. All the data in the column will be lost.
  - You are about to alter the column `gender` on the `variant` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `variant` DROP COLUMN `limitedEdition`,
    DROP COLUMN `sizes`,
    ADD COLUMN `islimitedEdition` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `colorway` VARCHAR(191) NOT NULL,
    MODIFY `gender` ENUM('toddler', 'preschool', 'boy', 'girl', 'men', 'women', 'unisex', 'kids') NULL,
    MODIFY `price` DECIMAL(10, 2) NOT NULL;

-- CreateTable
CREATE TABLE `VariantSize` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `variantId` INTEGER NOT NULL,
    `size` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `VariantSize` ADD CONSTRAINT `VariantSize_variantId_fkey` FOREIGN KEY (`variantId`) REFERENCES `Variant`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
