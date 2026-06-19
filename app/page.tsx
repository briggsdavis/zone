"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { Authenticated, Unauthenticated } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Home() {
  const posts = useQuery(api.posts.listPublished);

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <header className="mb-12 flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Zone</h1>
        <nav className="text-sm">
          <Authenticated>
            <Link
              href="/admin"
              className="rounded-md bg-black px-3 py-1.5 font-medium text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
            >
              Admin
            </Link>
          </Authenticated>
          <Unauthenticated>
            <Link
              href="/signin"
              className="rounded-md border border-gray-300 px-3 py-1.5 font-medium hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-900"
            >
              Sign in
            </Link>
          </Unauthenticated>
        </nav>
      </header>

      <section className="space-y-8">
        {posts === undefined && (
          <p className="text-gray-500">Loading…</p>
        )}
        {posts?.length === 0 && (
          <p className="text-gray-500">
            No posts yet. Sign in and create one in the admin.
          </p>
        )}
        {posts?.map((post) => (
          <article key={post._id} className="border-b border-gray-200 pb-8 dark:border-gray-800">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            {post.excerpt && (
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                {post.excerpt}
              </p>
            )}
          </article>
        ))}
      </section>
    </main>
  );
}
