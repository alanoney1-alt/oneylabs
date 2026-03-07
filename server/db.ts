import { eq, desc, and, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser, users,
  InsertLead, leads,
  InsertVisibilityCheck, visibilityChecks,
  InsertTestimonial, testimonials,
  InsertBlogPost, blogPosts,
  InsertBooking, bookings,
  InsertReview, reviews,
  InsertChatConversation, chatConversations,
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ── USERS ──
export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) { console.warn("[Database] Cannot upsert user: database not available"); return; }
  try {
    const values: InsertUser = { openId: user.openId };
    const updateSet: Record<string, unknown> = {};
    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];
    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };
    textFields.forEach(assignNullable);
    if (user.lastSignedIn !== undefined) { values.lastSignedIn = user.lastSignedIn; updateSet.lastSignedIn = user.lastSignedIn; }
    if (user.role !== undefined) { values.role = user.role; updateSet.role = user.role; }
    else if (user.openId === ENV.ownerOpenId) { values.role = 'admin'; updateSet.role = 'admin'; }
    if (!values.lastSignedIn) values.lastSignedIn = new Date();
    if (Object.keys(updateSet).length === 0) updateSet.lastSignedIn = new Date();
    await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
  } catch (error) { console.error("[Database] Failed to upsert user:", error); throw error; }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ── LEADS ──
export async function createLead(lead: InsertLead) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(leads).values(lead);
  return true;
}

export async function getLeads() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(leads).orderBy(desc(leads.createdAt));
}

export async function updateLeadStatus(id: number, status: "new" | "contacted" | "qualified" | "converted" | "lost") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(leads).set({ status }).where(eq(leads.id, id));
}

// ── VISIBILITY CHECKS ──
export async function createVisibilityCheck(check: InsertVisibilityCheck) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(visibilityChecks).values(check);
  return result[0].insertId;
}

export async function getVisibilityHistory(businessName: string) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(visibilityChecks)
    .where(eq(visibilityChecks.businessName, businessName))
    .orderBy(desc(visibilityChecks.createdAt));
}

// ── TESTIMONIALS ──
export async function createTestimonial(t: InsertTestimonial) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(testimonials).values(t);
}

export async function getPublishedTestimonials() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(testimonials)
    .where(eq(testimonials.published, true))
    .orderBy(desc(testimonials.createdAt));
}

export async function getAllTestimonials() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(testimonials).orderBy(desc(testimonials.createdAt));
}

export async function updateTestimonial(id: number, data: Partial<InsertTestimonial>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(testimonials).set(data).where(eq(testimonials.id, id));
}

export async function deleteTestimonial(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(testimonials).where(eq(testimonials.id, id));
}

// ── BLOG POSTS ──
export async function createBlogPost(post: InsertBlogPost) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(blogPosts).values(post);
}

export async function getPublishedBlogPosts() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(blogPosts)
    .where(eq(blogPosts.status, "published"))
    .orderBy(desc(blogPosts.publishedAt));
}

export async function getAllBlogPosts() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
}

export async function getBlogPostBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateBlogPost(id: number, data: Partial<InsertBlogPost>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(blogPosts).set(data).where(eq(blogPosts.id, id));
}

export async function deleteBlogPost(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(blogPosts).where(eq(blogPosts.id, id));
}

// ── BOOKINGS ──
export async function createBooking(booking: InsertBooking) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(bookings).values(booking);
}

export async function getBookings() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(bookings).orderBy(desc(bookings.createdAt));
}

export async function updateBookingStatus(id: number, status: "pending" | "confirmed" | "completed" | "cancelled") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(bookings).set({ status }).where(eq(bookings.id, id));
}

// ── REVIEWS ──
export async function createReview(review: InsertReview) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(reviews).values(review);
}

export async function getPublishedReviews() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(reviews)
    .where(eq(reviews.published, true))
    .orderBy(desc(reviews.createdAt));
}

export async function getAllReviews() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(reviews).orderBy(desc(reviews.createdAt));
}

export async function updateReview(id: number, data: Partial<InsertReview>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(reviews).set(data).where(eq(reviews.id, id));
}

export async function deleteReview(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(reviews).where(eq(reviews.id, id));
}

// ── CHAT CONVERSATIONS ──
export async function createChatConversation(conv: InsertChatConversation) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(chatConversations).values(conv);
}

export async function updateChatConversation(id: number, data: Partial<InsertChatConversation>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(chatConversations).set(data).where(eq(chatConversations.id, id));
}

export async function getChatConversationBySession(sessionId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(chatConversations)
    .where(eq(chatConversations.sessionId, sessionId))
    .limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ── DASHBOARD STATS ──
export async function getDashboardStats() {
  const db = await getDb();
  if (!db) return { totalLeads: 0, totalBookings: 0, totalChecks: 0, avgScore: 0 };
  
  const [leadCount] = await db.select({ count: sql<number>`count(*)` }).from(leads);
  const [bookingCount] = await db.select({ count: sql<number>`count(*)` }).from(bookings);
  const [checkCount] = await db.select({ count: sql<number>`count(*)` }).from(visibilityChecks);
  const [avgScoreResult] = await db.select({ avg: sql<number>`COALESCE(AVG(score), 0)` }).from(visibilityChecks);

  return {
    totalLeads: leadCount?.count ?? 0,
    totalBookings: bookingCount?.count ?? 0,
    totalChecks: checkCount?.count ?? 0,
    avgScore: Math.round(avgScoreResult?.avg ?? 0),
  };
}
