import type { Metadata } from "next";
import RevealText from "@/src/components/motion/RevealText";
import Reveal from "@/src/components/motion/Reveal";
import ContactForm from "@/src/components/contact/ContactForm";
import SiteExplore from "@/src/components/sections/SiteExplore";
import { contact, brand } from "@/src/lib/content";

export const metadata: Metadata = {
  title: "Contact | 1ZONE",
  description:
    "Begin a project with 1ZONE. We accept only ten whole-case projects a year.",
};

export default function ContactPage() {
  return (
    <>
    <section className="flex min-h-screen flex-col px-6 pb-24 pt-32 md:px-10">
      <div className="mx-auto grid w-full max-w-[1600px] flex-1 grid-cols-1 gap-16 lg:grid-cols-12">
        {/* Left, intro + details */}
        <div className="flex flex-col justify-center lg:col-span-5">
          <p className="eyebrow mb-6">Contact</p>
          <RevealText as="h1" split className="display-hero text-white">
            Begin a project.
          </RevealText>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-white-dim">
              {brand.scarcity} Tell us about yours, and we&rsquo;ll be in touch.
            </p>

            <dl className="mt-12 space-y-6">
              <div>
                <dt className="eyebrow mb-1">Email</dt>
                <dd className="text-white">{contact.email}</dd>
              </div>
              <div>
                <dt className="eyebrow mb-1">Phone</dt>
                <dd className="text-white">{contact.phone}</dd>
              </div>
              <div>
                <dt className="eyebrow mb-1">Studio</dt>
                <dd className="text-white">{contact.studio}</dd>
              </div>
            </dl>
          </Reveal>
        </div>

        {/* Right, form */}
        <div className="flex flex-col justify-center lg:col-span-7 lg:pl-10">
          <ContactForm />
        </div>
      </div>
    </section>

      {/* EXPLORE MORE */}
      <SiteExplore current="/contact" />
    </>
  );
}
