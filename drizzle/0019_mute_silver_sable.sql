CREATE TABLE `contacts` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`category` enum('artist','manager','partner') NOT NULL DEFAULT 'artist',
	`contactInfo` text,
	`message` text,
	CONSTRAINT `contacts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `carts` ADD `checkoutSessionId` varchar(191);--> statement-breakpoint
ALTER TABLE `orders` ADD `username` varchar(191);--> statement-breakpoint
ALTER TABLE `orders` ADD `name` varchar(191);--> statement-breakpoint
ALTER TABLE `orders` ADD `customerId` varchar(191);--> statement-breakpoint
ALTER TABLE `products` ADD `stripePriceId` varchar(191);--> statement-breakpoint
ALTER TABLE `orders` DROP COLUMN `walletID`;--> statement-breakpoint
ALTER TABLE `orders` DROP COLUMN `artistID`;--> statement-breakpoint
ALTER TABLE `orders` DROP COLUMN `productID`;--> statement-breakpoint
ALTER TABLE `orders` DROP COLUMN `stripePaymentIntentId`;--> statement-breakpoint
ALTER TABLE `orders` DROP COLUMN `stripePaymentIntentStatus`;