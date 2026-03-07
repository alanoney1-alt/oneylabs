CREATE TABLE `blogPosts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(255) NOT NULL,
	`title` varchar(500) NOT NULL,
	`excerpt` text,
	`content` text NOT NULL,
	`coverImageUrl` text,
	`metaTitle` varchar(255),
	`metaDescription` text,
	`tags` text,
	`authorId` int,
	`status` enum('draft','published','archived') NOT NULL DEFAULT 'draft',
	`publishedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `blogPosts_id` PRIMARY KEY(`id`),
	CONSTRAINT `blogPosts_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `bookings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`leadId` int,
	`name` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(50),
	`businessName` varchar(255),
	`serviceType` enum('ai_audit','consultation','workshop','build_session') NOT NULL DEFAULT 'ai_audit',
	`preferredDate` varchar(50) NOT NULL,
	`preferredTime` varchar(50) NOT NULL,
	`notes` text,
	`status` enum('pending','confirmed','completed','cancelled') NOT NULL DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `bookings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `chatConversations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sessionId` varchar(100) NOT NULL,
	`leadId` int,
	`messages` text NOT NULL,
	`emailCaptured` varchar(320),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `chatConversations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `leads` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`name` varchar(255),
	`phone` varchar(50),
	`businessName` varchar(255),
	`service` varchar(255),
	`location` varchar(255),
	`source` enum('visibility_checker','chatbot','contact_form','booking') NOT NULL DEFAULT 'contact_form',
	`visibilityScore` int,
	`message` text,
	`status` enum('new','contacted','qualified','converted','lost') NOT NULL DEFAULT 'new',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `leads_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `reviews` (
	`id` int AUTO_INCREMENT NOT NULL,
	`reviewerName` varchar(255) NOT NULL,
	`rating` int NOT NULL,
	`text` text,
	`source` varchar(100) DEFAULT 'google',
	`reviewDate` varchar(50),
	`profilePhotoUrl` text,
	`published` boolean DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `reviews_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `testimonials` (
	`id` int AUTO_INCREMENT NOT NULL,
	`clientName` varchar(255) NOT NULL,
	`businessName` varchar(255),
	`industry` varchar(255),
	`quote` text NOT NULL,
	`rating` int,
	`imageUrl` text,
	`beforeMetric` varchar(255),
	`afterMetric` varchar(255),
	`featured` boolean DEFAULT false,
	`published` boolean DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `testimonials_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `visibilityChecks` (
	`id` int AUTO_INCREMENT NOT NULL,
	`leadId` int,
	`businessName` varchar(255) NOT NULL,
	`service` varchar(255) NOT NULL,
	`location` varchar(255) NOT NULL,
	`score` int NOT NULL,
	`isVisible` boolean NOT NULL,
	`recommendations` text,
	`fullResponse` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `visibilityChecks_id` PRIMARY KEY(`id`)
);
