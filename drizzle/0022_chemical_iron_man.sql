CREATE TABLE `comments` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`user` varchar(191) NOT NULL,
	`artistId` int NOT NULL,
	`postId` int NOT NULL,
	`replyingTo` int DEFAULT 0,
	`numReplies` int NOT NULL DEFAULT 0,
	`message` text NOT NULL,
	`likers` json DEFAULT ('null'),
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `comments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `reported` (
	`reported` serial AUTO_INCREMENT NOT NULL,
	`user` varchar(191),
	`title` text,
	`message` text,
	`artistId` int NOT NULL,
	CONSTRAINT `reported_reported` PRIMARY KEY(`reported`)
);
--> statement-breakpoint
CREATE TABLE `userStats` (
	`user` varchar(191) NOT NULL,
	`username` text,
	`firstName` text,
	`lastName` text,
	`image` text,
	`hubsJoined` json DEFAULT ('null'),
	`premiumHubs` json DEFAULT ('null'),
	`sponsorAmounts` json DEFAULT ('null'),
	`numLikes` int NOT NULL DEFAULT 0,
	`numComments` int NOT NULL DEFAULT 0,
	`numPosts` int NOT NULL DEFAULT 0,
	`updatedAt` timestamp DEFAULT (now())
);
--> statement-breakpoint
ALTER TABLE `posts` RENAME COLUMN `users` TO `likers`;--> statement-breakpoint
ALTER TABLE `artists` MODIFY COLUMN `image` json NOT NULL DEFAULT ('[null,null]');--> statement-breakpoint
ALTER TABLE `artists` ADD `premiumDescription` text;--> statement-breakpoint
ALTER TABLE `artists` ADD `links` json DEFAULT ('null');--> statement-breakpoint
ALTER TABLE `artists` ADD `hubMembers` json DEFAULT ('null');--> statement-breakpoint
ALTER TABLE `artists` ADD `premiumHubMembers` json DEFAULT ('null');--> statement-breakpoint
ALTER TABLE `posts` ADD `user` varchar(191) NOT NULL;--> statement-breakpoint
ALTER TABLE `posts` ADD `isArtist` boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `posts` ADD `images` json DEFAULT ('null');--> statement-breakpoint
ALTER TABLE `posts` ADD `numLikes` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `posts` ADD `numComments` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `posts` ADD `isEvent` boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `posts` ADD `isPremium` boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `posts` DROP COLUMN `productId`;