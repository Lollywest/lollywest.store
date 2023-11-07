ALTER TABLE `userStats` RENAME COLUMN `user` TO `userId`;--> statement-breakpoint
ALTER TABLE `posts` ADD `videoAssetId` text DEFAULT ('');--> statement-breakpoint
ALTER TABLE `posts` ADD `videoPlaybackId` text DEFAULT ('');