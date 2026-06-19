"use client";

import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

type Status = "draft" | "published";

type Editing = {
  id?: Id<"posts">;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  status: Status;
};

const empty: Editing = {
  title: "",
  slug: "",
  excerpt: "",
  body: "",
  status: "draft",
};

export default function AdminPage() {
  const { signOut } = useAuthActions();
  const me = useQuery(api.users.currentUser);
  const posts = useQuery(api.posts.listAll);
  const create = useMutation(api.posts.create);
  const update = useMutation(api.posts.update);
  const remove = useMutation(api.posts.remove);

  const [editing, setEditing] = useState<Editing>(empty);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const { id, excerpt, ...rest } = editing;
    const payload = { ...rest, excerpt: excerpt || undefined };
    if (id) {
      await update({ id, ...payload });
    } else {
      await create(payload);
    }
    setEditing(empty);
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <header className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Content admin</h1>
          {me && (
            <p className="text-sm text-gray-500">Signed in as {me.email}</p>
          )}
        </div>
        <button
          onClick={() => signOut()}
          className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-900"
        >
          Sign out
        </button>
      </header>

      <div className="grid gap-10 md:grid-cols-2">
        {/* Editor */}
        <section>
          <h2 className="mb-4 text-lg font-semibold">
            {editing.id ? "Edit post" : "New post"}
          </h2>
          <form onSubmit={onSubmit} className="space-y-3">
            <input
              placeholder="Title"
              required
              value={editing.title}
              onChange={(e) =>
                setEditing({ ...editing, title: e.target.value })
              }
              className="w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
            />
            <input
              placeholder="slug (e.g. hello-world)"
              required
              value={editing.slug}
              onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
              className="w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
            />
            <input
              placeholder="Excerpt (optional)"
              value={editing.excerpt}
              onChange={(e) =>
                setEditing({ ...editing, excerpt: e.target.value })
              }
              className="w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
            />
            <textarea
              placeholder="Body (markdown)"
              required
              rows={8}
              value={editing.body}
              onChange={(e) => setEditing({ ...editing, body: e.target.value })}
              className="w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-sm dark:border-gray-700 dark:bg-gray-900"
            />
            <select
              value={editing.status}
              onChange={(e) =>
                setEditing({ ...editing, status: e.target.value as Status })
              }
              className="w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
            <div className="flex gap-2">
              <button
                type="submit"
                className="rounded-md bg-black px-4 py-2 font-medium text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
              >
                {editing.id ? "Save changes" : "Create post"}
              </button>
              {editing.id && (
                <button
                  type="button"
                  onClick={() => setEditing(empty)}
                  className="rounded-md border border-gray-300 px-4 py-2 font-medium hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-900"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        {/* List */}
        <section>
          <h2 className="mb-4 text-lg font-semibold">All posts</h2>
          <div className="space-y-3">
            {posts === undefined && (
              <p className="text-gray-500">Loading…</p>
            )}
            {posts?.length === 0 && (
              <p className="text-gray-500">No posts yet.</p>
            )}
            {posts?.map((post) => (
              <div
                key={post._id}
                className="flex items-center justify-between rounded-md border border-gray-200 px-4 py-3 dark:border-gray-800"
              >
                <div>
                  <p className="font-medium">{post.title}</p>
                  <p className="text-xs text-gray-500">
                    /{post.slug} · {post.status}
                  </p>
                </div>
                <div className="flex gap-3 text-sm">
                  <button
                    onClick={() =>
                      setEditing({
                        id: post._id,
                        title: post.title,
                        slug: post.slug,
                        excerpt: post.excerpt ?? "",
                        body: post.body,
                        status: post.status,
                      })
                    }
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => remove({ id: post._id })}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
