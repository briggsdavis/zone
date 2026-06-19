import { mutation, query, QueryCtx } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

/** Throws unless there is a signed-in user; returns their id. */
async function requireUser(ctx: QueryCtx) {
  const userId = await getAuthUserId(ctx);
  if (userId === null) {
    throw new Error("Not authenticated");
  }
  return userId;
}

/** Public feed: published posts, newest first. */
export const listPublished = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("posts")
      .withIndex("by_status", (q) => q.eq("status", "published"))
      .order("desc")
      .collect();
  },
});

/** Public: fetch a single published post by slug. */
export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    const post = await ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique();
    if (!post || post.status !== "published") return null;
    return post;
  },
});

/** Admin: every post regardless of status. */
export const listAll = query({
  args: {},
  handler: async (ctx) => {
    await requireUser(ctx);
    return await ctx.db.query("posts").order("desc").collect();
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    excerpt: v.optional(v.string()),
    body: v.string(),
    status: v.union(v.literal("draft"), v.literal("published")),
  },
  handler: async (ctx, args) => {
    const authorId = await requireUser(ctx);
    return await ctx.db.insert("posts", {
      ...args,
      authorId,
      publishedAt: args.status === "published" ? Date.now() : undefined,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("posts"),
    title: v.string(),
    slug: v.string(),
    excerpt: v.optional(v.string()),
    body: v.string(),
    status: v.union(v.literal("draft"), v.literal("published")),
  },
  handler: async (ctx, { id, ...rest }) => {
    await requireUser(ctx);
    const existing = await ctx.db.get(id);
    if (!existing) throw new Error("Post not found");
    const becomingPublished =
      rest.status === "published" && existing.status !== "published";
    await ctx.db.patch(id, {
      ...rest,
      publishedAt: becomingPublished ? Date.now() : existing.publishedAt,
    });
  },
});

export const remove = mutation({
  args: { id: v.id("posts") },
  handler: async (ctx, { id }) => {
    await requireUser(ctx);
    await ctx.db.delete(id);
  },
});
