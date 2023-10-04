CREATE TABLE `posts` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`productId` int NOT NULL,
	`artistId` int NOT NULL,
	`title` text NOT NULL,
	`message` text NOT NULL,
	`users` json DEFAULT ('null'),
	`eventTime` timestamp DEFAULT (now()),
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `posts_id` PRIMARY KEY(`id`)
);
