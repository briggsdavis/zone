import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

/**
 * The Convex schema.
 *
 * `authTables` adds the tables Convex Auth needs (users, sessions, accounts, …).
 * Everything below those is the content-management model for the site.
 */
export default defineSchema({
  ...authTables,

  // A flexible content type for blog-style entries.
  posts: defineTable({
    title: v.string(),
    slug: v.string(),
    excerpt: v.optional(v.string()),
    // Body is stored as rich text / markdown — swap for a block editor later.
    body: v.string(),
    status: v.union(v.literal("draft"), v.literal("published")),
    authorId: v.id("users"),
    publishedAt: v.optional(v.number()),
  })
    .index("by_slug", ["slug"])
    .index("by_status", ["status"]),

  // Standalone pages (about, contact, landing sections, …).
  pages: defineTable({
    title: v.string(),
    slug: v.string(),
    body: v.string(),
    status: v.union(v.literal("draft"), v.literal("published")),
    authorId: v.id("users"),
  })
    .index("by_slug", ["slug"])
    .index("by_status", ["status"]),
});
