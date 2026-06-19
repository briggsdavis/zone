import type { Metadata } from "next";
import RevealText from "@/src/components/motion/RevealText";
import Reveal from "@/src/components/motion/Reveal";
import RevealImage from "@/src/components/motion/RevealImage";
import ContactForm from "@/src/components/contact/ContactForm";
import { images } from "@/src/lib/imageManifest";
import { contact, brand } from "@/src/lib/content";

export const metadata: Metadata = {
  title: "Contact — Begin a project | 1ZONE",
  description:
    "Begin a project with 1ZONE. We accept only ten whole-case projects a year.",
};

export default function ContactPage() {
  return (
    <section className="px-6 pb-[clamp(6rem,14vh,12rem)] pt-40 md:px-10">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-16 lg:grid-cols-12">
        {/* Left — intro + details */}
        <div className="lg:col-span-5">
          <p className="eyebrow mb-6">Contact</p>
          <RevealText as="h1" split className="display-hero text-white">
            Begin a project.
          </RevealText>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-white-dim">
              {brand.scarcity} Tell us about yours, and we&rsquo;ll be in touch.
            </p>

            {/* PLACEHOLDER details — client to provide */}
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
            <p className="mt-8 text-xs text-white-dim">{contact.note}</p>
          </Reveal>
        </div>

        {/* Right — form */}
        <div className="lg:col-span-7 lg:pl-10">
          <ContactForm />
        </div>
      </div>

      {/* Closing full-width image band */}
      <div className="mx-auto mt-[clamp(4rem,10vh,8rem)] max-w-[1600px]">
        <RevealImage
          src={images.contact.hero.src}
          alt={images.contact.hero.alt}
          parallax
          className="aspect-[16/9] w-full"
          sizes="100vw"
        />
      </div>
    </section>
  );
}
