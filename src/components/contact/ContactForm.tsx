"use client";

import { useState, FormEvent } from "react";

/**
 * DEMO ONLY, front-end form. On submit it runs light client-side validation
 * and shows an inline success state. It does NOT send anywhere; wire to Convex
 * or an email service when the backend is connected.
 */
export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = (data.get("name") as string)?.trim();
    const email = (data.get("email") as string)?.trim();

    if (!name || !email) {
      setError("Please provide at least your name and email.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError(null);
    setSubmitted(true);
  };

  const field =
    "w-full border-b border-line bg-transparent py-4 text-white placeholder:text-white-dim/60 focus:border-accent focus:outline-none transition-colors";

  if (submitted) {
    return (
      <div className="flex min-h-[20rem] flex-col justify-center">
        <p className="font-display text-3xl text-white">Thank you.</p>
        <p className="mt-3 max-w-md text-lg text-white-dim">
          we&rsquo;ll be in touch. We accept only ten projects a year, and read
          every inquiry personally.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <label className="block">
          <span className="eyebrow">Name</span>
          <input name="name" type="text" autoComplete="name" className={field} required />
        </label>
        <label className="block">
          <span className="eyebrow">Email</span>
          <input name="email" type="email" autoComplete="email" className={field} required />
        </label>
        <label className="block">
          <span className="eyebrow">Phone</span>
          <input name="phone" type="tel" autoComplete="tel" className={field} />
        </label>
        <label className="block">
          <span className="eyebrow">Project type</span>
          <select name="projectType" className={`${field} appearance-none`} defaultValue="">
            <option value="" disabled className="bg-black">
              Select…
            </option>
            <option className="bg-black">Villa</option>
            <option className="bg-black">Large flat</option>
            <option className="bg-black">Clubhouse</option>
            <option className="bg-black">Other</option>
          </select>
        </label>
        <label className="block md:col-span-2">
          <span className="eyebrow">Project location</span>
          <input name="location" type="text" className={field} />
        </label>
        <label className="block md:col-span-2">
          <span className="eyebrow">Message</span>
          <textarea name="message" rows={4} className={`${field} resize-none`} />
        </label>
      </div>

      {error && (
        <p role="alert" className="text-sm text-accent">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="group inline-flex items-center gap-3 border border-line px-8 py-4 text-sm uppercase tracking-[0.15em] text-white transition-colors hover:border-accent hover:text-accent"
      >
        Send inquiry
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </button>
    </form>
  );
}
