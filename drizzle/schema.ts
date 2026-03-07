import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, json } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Leads captured from visibility checker, chatbot, contact form, etc.
 */
export const leads = mysqlTable("leads", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull(),
  name: varchar("name", { length: 255 }),
  phone: varchar("phone", { length: 50 }),
  businessName: varchar("businessName", { length: 255 }),
  service: varchar("service", { length: 255 }),
  location: varchar("location", { length: 255 }),
  source: mysqlEnum("source", ["visibility_checker", "chatbot", "contact_form", "booking"]).default("contact_form").notNull(),
  visibilityScore: int("visibilityScore"),
  message: text("message"),
  status: mysqlEnum("status", ["new", "contacted", "qualified", "converted", "lost"]).default("new").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Lead = typeof leads.$inferSelect;
export type InsertLead = typeof leads.$inferInsert;

/**
 * Visibility check history for tracking scores over time
 */
export const visibilityChecks = mysqlTable("visibilityChecks", {
  id: int("id").autoincrement().primaryKey(),
  leadId: int("leadId"),
  businessName: varchar("businessName", { length: 255 }).notNull(),
  service: varchar("service", { length: 255 }).notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  score: int("score").notNull(),
  isVisible: boolean("isVisible").notNull(),
  recommendations: text("recommendations"),
  fullResponse: text("fullResponse"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type VisibilityCheck = typeof visibilityChecks.$inferSelect;
export type InsertVisibilityCheck = typeof visibilityChecks.$inferInsert;

/**
 * Testimonials and case studies
 */
export const testimonials = mysqlTable("testimonials", {
  id: int("id").autoincrement().primaryKey(),
  clientName: varchar("clientName", { length: 255 }).notNull(),
  businessName: varchar("businessName", { length: 255 }),
  industry: varchar("industry", { length: 255 }),
  quote: text("quote").notNull(),
  rating: int("rating"),
  imageUrl: text("imageUrl"),
  beforeMetric: varchar("beforeMetric", { length: 255 }),
  afterMetric: varchar("afterMetric", { length: 255 }),
  featured: boolean("featured").default(false),
  published: boolean("published").default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = typeof testimonials.$inferInsert;

/**
 * Blog posts with full CMS support
 */
export const blogPosts = mysqlTable("blogPosts", {
  id: int("id").autoincrement().primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: varchar("title", { length: 500 }).notNull(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  coverImageUrl: text("coverImageUrl"),
  metaTitle: varchar("metaTitle", { length: 255 }),
  metaDescription: text("metaDescription"),
  tags: text("tags"),
  authorId: int("authorId"),
  status: mysqlEnum("status", ["draft", "published", "archived"]).default("draft").notNull(),
  publishedAt: timestamp("publishedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = typeof blogPosts.$inferInsert;

/**
 * Bookings for AI audits and consultations
 */
export const bookings = mysqlTable("bookings", {
  id: int("id").autoincrement().primaryKey(),
  leadId: int("leadId"),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  businessName: varchar("businessName", { length: 255 }),
  serviceType: mysqlEnum("serviceType", ["ai_audit", "consultation", "workshop", "build_session"]).default("ai_audit").notNull(),
  preferredDate: varchar("preferredDate", { length: 50 }).notNull(),
  preferredTime: varchar("preferredTime", { length: 50 }).notNull(),
  notes: text("notes"),
  status: mysqlEnum("status", ["pending", "confirmed", "completed", "cancelled"]).default("pending").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = typeof bookings.$inferInsert;

/**
 * Google reviews cache
 */
export const reviews = mysqlTable("reviews", {
  id: int("id").autoincrement().primaryKey(),
  reviewerName: varchar("reviewerName", { length: 255 }).notNull(),
  rating: int("rating").notNull(),
  text: text("text"),
  source: varchar("source", { length: 100 }).default("google"),
  reviewDate: varchar("reviewDate", { length: 50 }),
  profilePhotoUrl: text("profilePhotoUrl"),
  published: boolean("published").default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Review = typeof reviews.$inferSelect;
export type InsertReview = typeof reviews.$inferInsert;

/**
 * Chat conversations from AI chatbot
 */
export const chatConversations = mysqlTable("chatConversations", {
  id: int("id").autoincrement().primaryKey(),
  sessionId: varchar("sessionId", { length: 100 }).notNull(),
  leadId: int("leadId"),
  messages: text("messages").notNull(),
  emailCaptured: varchar("emailCaptured", { length: 320 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ChatConversation = typeof chatConversations.$inferSelect;
export type InsertChatConversation = typeof chatConversations.$inferInsert;
