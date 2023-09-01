CREATE TABLE `artists` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`userId` varchar(191) NOT NULL,
	`name` varchar(191) NOT NULL,
	`description` text,
	`image` json DEFAULT ('null'),
	`products` json DEFAULT ('null'),
	`createdAt` timestamp DEFAULT (now()),
	`slug` text,
	CONSTRAINT `artists_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `upcoming` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`artistID` int NOT NULL,
	`name` varchar(191) NOT NULL,
	`description` text,
	`perks` json DEFAULT ('null'),
	`images` json DEFAULT ('null'),
	`category` enum('deck','wrap','sponsorship') NOT NULL DEFAULT 'sponsorship',
	`price` decimal(10,2) NOT NULL DEFAULT '0',
	`createdAt` timestamp DEFAULT (now()),
	`releaseDate` timestamp DEFAULT (now()),
	`slug` text,
	CONSTRAINT `upcoming_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `wallet` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`userId` varchar(191) NOT NULL,
	`products` json DEFAULT ('null'),
	`orders` json DEFAULT ('null'),
	CONSTRAINT `wallet_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
DROP TABLE `email_preferences`;--> statement-breakpoint
DROP TABLE `stores`;--> statement-breakpoint
ALTER TABLE `products` MODIFY COLUMN `category` enum('deck','wrap','sponsorship') NOT NULL DEFAULT 'sponsorship';--> statement-breakpoint
ALTER TABLE `orders` ADD `walletID` int NOT NULL;--> statement-breakpoint
ALTER TABLE `orders` ADD `artistID` int NOT NULL;--> statement-breakpoint
ALTER TABLE `orders` ADD `productID` int NOT NULL;--> statement-breakpoint
ALTER TABLE `orders` ADD `price` decimal(10,2) DEFAULT '0' NOT NULL;--> statement-breakpoint
ALTER TABLE `payments` ADD `artistID` int NOT NULL;--> statement-breakpoint
ALTER TABLE `products` ADD `artistID` int NOT NULL;--> statement-breakpoint
ALTER TABLE `products` ADD `perks` json DEFAULT ('null');--> statement-breakpoint
ALTER TABLE `products` ADD `decksLeft` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `products` ADD `owners` json DEFAULT ('null');--> statement-breakpoint
ALTER TABLE `products` ADD `slug` text;--> statement-breakpoint
ALTER TABLE `orders` DROP COLUMN `storeId`;--> statement-breakpoint
ALTER TABLE `orders` DROP COLUMN `items`;--> statement-breakpoint
ALTER TABLE `orders` DROP COLUMN `total`;--> statement-breakpoint
ALTER TABLE `orders` DROP COLUMN `name`;--> statement-breakpoint
ALTER TABLE `orders` DROP COLUMN `email`;--> statement-breakpoint
ALTER TABLE `orders` DROP COLUMN `addressId`;--> statement-breakpoint
ALTER TABLE `payments` DROP COLUMN `storeId`;--> statement-breakpoint
ALTER TABLE `products` DROP COLUMN `subcategory`;--> statement-breakpoint
ALTER TABLE `products` DROP COLUMN `inventory`;--> statement-breakpoint
ALTER TABLE `products` DROP COLUMN `rating`;--> statement-breakpoint
ALTER TABLE `products` DROP COLUMN `tags`;--> statement-breakpoint
ALTER TABLE `products` DROP COLUMN `storeId`;