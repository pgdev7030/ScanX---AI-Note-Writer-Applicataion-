"use client";

import Link from "next/link";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/* ────────────────────────────────────────────────────────────────────────── */
/* Line icons (stroke-width 1.5)                                              */
/* ────────────────────────────────────────────────────────────────────────── */

const svgProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.5",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

const Icon = {
  Upload: (props) => (
    <svg {...svgProps} {...props}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  ),
  Sparkles: (props) => (
    <svg {...svgProps} {...props}>
      <path d="M12 3l1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3L12 3z" />
    </svg>
  ),
  PenLine: (props) => (
    <svg {...svgProps} {...props}>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
    </svg>
  ),
  FileSearch: (props) => (
    <svg {...svgProps} {...props}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h5" />
      <path d="M14 2v6h6" />
      <path d="M20 8v3" />
      <circle cx="16.5" cy="17.5" r="3" />
      <path d="m21 22-2.4-2.4" />
    </svg>
  ),
  Columns: (props) => (
    <svg {...svgProps} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M12 3v18" />
    </svg>
  ),
  Save: (props) => (
    <svg {...svgProps} {...props}>
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
      <polyline points="17 21 17 13 7 13 7 21" />
      <polyline points="7 3 7 8 15 8" />
    </svg>
  ),
  Arrow: (props) => (
    <svg {...svgProps} {...props}>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  ),
  Sun: (props) => (
    <svg {...svgProps} {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  ),
  Moon: (props) => (
    <svg {...svgProps} {...props}>
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z" />
    </svg>
  ),
  Check: (props) => (
    <svg {...svgProps} {...props}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  ),
};

/* ────────────────────────────────────────────────────────────────────────── */
/* Content                                                                    */
/* ────────────────────────────────────────────────────────────────────────── */

const FEATURES = [
  {
    icon: Icon.Sparkles,
    title: "Ask about any passage",
    desc: "Highlight text in your notes and ScanX answers using the most relevant parts of your PDF.",
  },
  {
    icon: Icon.FileSearch,
    title: "Grounded in your document",
    desc: "Answers come from the file you uploaded, not from the open web, so they stay on topic.",
  },
  {
    icon: Icon.Columns,
    title: "Side-by-side workspace",
    desc: "Your PDF on the left, your notes on the right. Drag the divider to give either more room.",
  },
  {
    icon: Icon.PenLine,
    title: "A real notes editor",
    desc: "Headings, lists, highlights, underline and alignment. Everything you need to write clean notes.",
  },
  {
    icon: Icon.Save,
    title: "Saved to your account",
    desc: "Notes are stored with each PDF, so you can close the tab and pick up where you left off.",
  },
  {
    icon: Icon.Upload,
    title: "Start in seconds",
    desc: "Upload a PDF from the dashboard. ScanX reads and indexes it while you open the workspace.",
  },
];

const STEPS = [
  {
    step: "01",
    title: "Upload a PDF",
    desc: "Lecture slides, a research paper, a contract. ScanX splits it into passages and indexes them.",
  },
  {
    step: "02",
    title: "Highlight what you need",
    desc: "Write or paste a question in the notes editor, select it, and press the AI button.",
  },
  {
    step: "03",
    title: "Get the answer in your notes",
    desc: "Gemini writes a response based on the matching passages and drops it right into your notes.",
  },
];

const FACTS = [
  { value: "5", label: "PDFs free, no card needed" },
  { value: "Gemini 2.5", label: "Flash model for answers" },
  { value: "1 place", label: "for your PDF and notes" },
];

/* ────────────────────────────────────────────────────────────────────────── */
/* Shared styles                                                              */
/* ────────────────────────────────────────────────────────────────────────── */

const btnBase =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-[background-color,color,transform,box-shadow] duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#0A0A0A]";
const btnPrimary = `${btnBase} bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 shadow-sm`;
const btnGhost = `${btnBase} text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-white/[0.06]`;
const navLink =
  "rounded-md text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500";
const eyebrow =
  "text-xs font-medium uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400 mb-4";
const sectionBorder = "border-t border-zinc-200 dark:border-white/[0.06]";
const muted = "text-zinc-600 dark:text-zinc-400";

/* ────────────────────────────────────────────────────────────────────────── */
/* Page                                                                       */
/* ────────────────────────────────────────────────────────────────────────── */

export default function Home() {
  const { user, isSignedIn } = useUser();
  const createUser = useMutation(api.user.createUser);
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      checkUser();
      router.push("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn]);

  const checkUser = async () => {
    try {
      await createUser({
        email: user?.primaryEmailAddress?.emailAddress || "",
        imageUrl: user?.imageUrl || "",
        userName: user?.fullName || "Anonymous",
      });
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="relative min-h-screen bg-white text-zinc-900 dark:bg-[#0A0A0A] dark:text-white antialiased overflow-x-hidden transition-colors">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-3 focus:py-2 focus:rounded-md focus:bg-zinc-900 focus:text-white"
      >
        Skip to content
      </a>

      <Spotlight />
      <AmbientGlow />

      {/* ===== NAV ===== */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 inset-x-0 z-40 border-b border-zinc-200/80 bg-white/75 dark:border-white/[0.06] dark:bg-[#0A0A0A]/70 backdrop-blur-xl"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 group rounded-md">
            <Image
              src="/scanx-logo.png"
              alt=""
              width={22}
              height={22}
              className="brightness-0 dark:invert opacity-90 group-hover:opacity-100 transition-opacity"
            />
            <span className="text-sm font-semibold tracking-tight">ScanX</span>
          </Link>

          <nav aria-label="Primary" className="hidden md:flex items-center gap-7 text-sm">
            <Link href="/features" className={navLink}>Features</Link>
            <Link href="/solution" className={navLink}>Solution</Link>
            <Link href="/pricing" className={navLink}>Pricing</Link>
            <Link href="/about" className={navLink}>About</Link>
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <ThemeToggle />
            <Link href="/sign-in" className={`${btnGhost} h-9 px-3 text-sm hidden sm:inline-flex`}>
              Sign in
            </Link>
            <Link href="/sign-up" className={`${btnPrimary} h-9 px-4 text-sm`}>
              Get started
            </Link>
          </div>
        </div>
      </motion.header>

      <main id="main" className="relative z-10">
        {/* ===== HERO ===== */}
        <section className="relative pt-32 sm:pt-40 pb-12 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 mb-8 px-3 py-1 rounded-full border border-zinc-200 bg-white/70 text-xs text-zinc-600 dark:border-white/10 dark:bg-white/[0.03] dark:text-zinc-400 backdrop-blur">
                <span className="relative flex w-1.5 h-1.5">
                  <span className="absolute inset-0 rounded-full bg-violet-500 animate-ping opacity-60" />
                  <span className="relative w-1.5 h-1.5 rounded-full bg-violet-500" />
                </span>
                AI answers powered by Gemini 2.5 Flash
              </div>

              <h1 className="text-[2.75rem] leading-[1.05] sm:text-6xl lg:text-7xl font-semibold tracking-tight lg:leading-[1.02] [text-wrap:balance]">
                Read the PDF.
                <br />
                <span className="text-zinc-400 dark:text-zinc-500">Ask it anything.</span>
              </h1>

              <p className={`mt-7 text-lg ${muted} max-w-xl mx-auto lg:mx-0 leading-relaxed [text-wrap:pretty]`}>
                ScanX puts your PDF and your notes side by side. Highlight a
                question and get an answer pulled from the document itself,
                written straight into your notes.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                <Link href="/sign-up" className={`${btnPrimary} h-11 px-6 w-full sm:w-auto group`}>
                  Start free
                  <Icon.Arrow className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <a href="#how-it-works" className={`${btnGhost} h-11 px-5 w-full sm:w-auto`}>
                  See how it works
                </a>
              </div>

              <p className="mt-5 text-xs text-zinc-500">
                Free for your first 5 PDFs. No credit card.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative hidden sm:block h-[380px] lg:h-[460px] mx-auto w-full max-w-md lg:max-w-none"
            >
              <Float3D />
            </motion.div>
          </div>
        </section>

        {/* ===== PRODUCT PREVIEW ===== */}
        <Reveal>
          <section className="px-4 sm:px-6 pb-20 pt-8">
            <div className="max-w-5xl mx-auto">
              <Tilt3D intensity={6}>
                <BrowserFrame>
                  <Image
                    src="/DashBoard.png"
                    alt="ScanX dashboard listing uploaded PDFs"
                    width={1200}
                    height={700}
                    className="w-full h-auto"
                    priority
                  />
                </BrowserFrame>
              </Tilt3D>
            </div>
          </section>
        </Reveal>

        {/* ===== FACTS ===== */}
        <Reveal>
          <section className="px-4 sm:px-6 py-12 border-y border-zinc-200 dark:border-white/[0.06] bg-zinc-50/60 dark:bg-white/[0.015]">
            <dl className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-zinc-200 dark:divide-white/[0.06]">
              {FACTS.map((f) => (
                <div key={f.label} className="text-center px-4 py-5 sm:py-2">
                  <dt className="sr-only">{f.label}</dt>
                  <dd className="text-3xl sm:text-4xl font-semibold tracking-tight tabular-nums">
                    {f.value}
                  </dd>
                  <dd className="mt-2 text-sm text-zinc-500">{f.label}</dd>
                </div>
              ))}
            </dl>
          </section>
        </Reveal>

        {/* ===== FEATURES ===== */}
        <section className="px-4 sm:px-6 py-24 sm:py-28" id="features">
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <div className="max-w-2xl mb-14">
                <p className={eyebrow}>Features</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1] [text-wrap:balance]">
                  Built for reading, not just storing.
                </h2>
                <p className={`mt-5 ${muted} leading-relaxed max-w-xl`}>
                  Most PDF tools stop at opening the file. ScanX helps you
                  understand it and keeps what you learn next to the source.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-200 dark:bg-white/[0.06] border border-zinc-200 dark:border-white/[0.06] rounded-2xl overflow-hidden">
              {FEATURES.map((f) => (
                <TiltCard key={f.title} intensity={5}>
                  <div className="bg-white dark:bg-[#0A0A0A] p-7 h-full transition-colors group-hover:bg-zinc-50 dark:group-hover:bg-[#101012]">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-violet-50 text-violet-600 border border-violet-100 dark:bg-violet-500/10 dark:text-violet-300 dark:border-violet-400/20">
                      <f.icon className="w-[18px] h-[18px]" />
                    </div>
                    <h3 className="mt-5 text-base font-semibold">{f.title}</h3>
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-500 leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>

        {/* ===== HOW IT WORKS ===== */}
        <section id="how-it-works" className={`px-4 sm:px-6 py-24 sm:py-28 scroll-mt-16 ${sectionBorder}`}>
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <div className="max-w-2xl mb-14">
                <p className={eyebrow}>How it works</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1]">
                  Three steps from file to answer.
                </h2>
              </div>
            </Reveal>

            <motion.ol
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
              className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8"
            >
              {STEPS.map((s) => (
                <motion.li
                  key={s.step}
                  variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="text-xs font-semibold tracking-widest text-violet-600 dark:text-violet-400 tabular-nums">
                    {s.step}
                  </div>
                  <div className="h-px w-12 bg-zinc-300 dark:bg-white/20 mt-4 mb-6" />
                  <h3 className="text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-500 leading-relaxed">
                    {s.desc}
                  </p>
                </motion.li>
              ))}
            </motion.ol>
          </div>
        </section>

        {/* ===== WORKSPACE ===== */}
        <section className={`px-4 sm:px-6 py-24 sm:py-28 ${sectionBorder}`}>
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <Reveal>
              <div>
                <p className={eyebrow}>Workspace</p>
                <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-[1.1]">
                  PDF on one side.
                  <br />
                  Notes on the other.
                </h2>
                <p className={`mt-5 ${muted} leading-relaxed`}>
                  No more switching between a reader and a notes app. Scroll the
                  document, write as you go, and ask the AI without leaving the
                  page.
                </p>
                <ul className="mt-6 space-y-3 text-sm">
                  {[
                    "Resizable split view",
                    "AI answers typed straight into your notes",
                    "Light and dark themes",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-300">
                        <Icon.Check className="w-3 h-3" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/sign-up" className={`${btnPrimary} mt-8 h-11 px-6`}>
                  Try the workspace
                </Link>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <Tilt3D intensity={8}>
                <BrowserFrame>
                  <Image
                    src="/PDF-Page.png"
                    alt="ScanX workspace with a PDF on the left and notes on the right"
                    width={600}
                    height={400}
                    className="w-full h-auto"
                  />
                </BrowserFrame>
              </Tilt3D>
            </Reveal>
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className={`px-4 sm:px-6 py-24 sm:py-32 ${sectionBorder}`}>
          <Reveal>
            <div className="relative max-w-3xl mx-auto text-center rounded-3xl border border-zinc-200 bg-zinc-50 dark:border-white/[0.08] dark:bg-white/[0.02] px-6 py-16 sm:px-12 overflow-hidden">
              <div
                aria-hidden
                className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[520px] h-[260px] rounded-full bg-violet-400/20 dark:bg-violet-500/15 blur-3xl"
              />
              <h2 className="relative text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1] [text-wrap:balance]">
                Your next PDF doesn&apos;t have to be a slog.
              </h2>
              <p className={`relative mt-5 ${muted} max-w-md mx-auto`}>
                Upload your first document and ask it a question. It takes
                about a minute.
              </p>
              <div className="relative mt-10 flex flex-col sm:flex-row justify-center gap-3">
                <Link href="/sign-up" className={`${btnPrimary} h-12 px-7 text-base`}>
                  Get started free
                </Link>
                <Link href="/pricing" className={`${btnGhost} h-12 px-6 text-base`}>
                  View pricing
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className={`relative z-10 px-4 sm:px-6 py-10 ${sectionBorder}`}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Image
              src="/scanx-logo.png"
              alt=""
              width={18}
              height={18}
              className="brightness-0 dark:invert opacity-60"
            />
            <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">ScanX</span>
          </div>
          <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            <Link href="/features" className={navLink}>Features</Link>
            <Link href="/solution" className={navLink}>Solution</Link>
            <Link href="/pricing" className={navLink}>Pricing</Link>
            <Link href="/about" className={navLink}>About</Link>
          </nav>
          <p className="text-xs text-zinc-500">© {new Date().getFullYear()} ScanX</p>
        </div>
      </footer>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/* Components                                                                 */
/* ────────────────────────────────────────────────────────────────────────── */

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";
  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="w-9 h-9 rounded-full inline-flex items-center justify-center text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-white/[0.06] transition-colors active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
    >
      {/* Render a stable icon until mounted to avoid a hydration mismatch */}
      {mounted ? (
        isDark ? <Icon.Sun className="w-[18px] h-[18px]" /> : <Icon.Moon className="w-[18px] h-[18px]" />
      ) : (
        <span className="w-[18px] h-[18px]" />
      )}
    </button>
  );
}

function BrowserFrame({ children }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white shadow-[0_30px_80px_-20px_rgba(76,29,149,0.25)] dark:border-white/10 dark:bg-[#0E0E10] dark:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] overflow-hidden">
      <div className="flex items-center gap-1.5 px-4 h-9 border-b border-zinc-200 bg-zinc-50 dark:border-white/5 dark:bg-transparent">
        <span className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-white/10" />
        <span className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-white/10" />
        <span className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-white/10" />
        <span className="ml-3 text-xs text-zinc-400 dark:text-zinc-600">scanx.app</span>
      </div>
      {children}
    </div>
  );
}

/** Cursor-following glow. Only rendered on devices with a fine pointer. */
function Spotlight() {
  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const sx = useSpring(x, { stiffness: 80, damping: 18, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 80, damping: 18, mass: 0.6 });
  const background = useTransform(
    [sx, sy],
    ([vx, vy]) =>
      `radial-gradient(480px circle at ${vx}px ${vy}px, rgba(139,92,246,0.10), transparent 70%)`
  );

  useEffect(() => {
    const onMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 hidden md:block"
      style={{ background }}
    />
  );
}

/** Soft static background glow — tuned separately for light and dark. */
function AmbientGlow() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[900px] z-0 overflow-hidden">
      <div className="absolute -top-40 left-[10%] w-[520px] h-[520px] rounded-full blur-[120px] bg-violet-300/40 dark:bg-violet-600/20" />
      <div className="absolute top-20 right-[5%] w-[420px] h-[420px] rounded-full blur-[120px] bg-sky-200/50 dark:bg-sky-500/10" />
      <div
        className="absolute inset-0 opacity-[0.35] dark:opacity-[0.15] [background-image:radial-gradient(rgba(113,113,122,0.35)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:linear-gradient(to_bottom,black,transparent_80%)]"
      />
    </div>
  );
}

function Reveal({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

function useTilt(intensity, spring) {
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, spring);
  const rotateY = useSpring(ry, spring);

  const onMouseMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    ry.set(((e.clientX - r.left) / r.width - 0.5) * intensity);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * intensity);
  };
  const onMouseLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return { ref, onMouseMove, onMouseLeave, style: { rotateX, rotateY, transformPerspective: 1200 } };
}

function TiltCard({ children, intensity = 6 }) {
  const tilt = useTilt(intensity, { stiffness: 180, damping: 16 });
  return (
    <motion.div {...tilt} className="group h-full">
      {children}
    </motion.div>
  );
}

function Tilt3D({ children, intensity = 8 }) {
  const tilt = useTilt(intensity, { stiffness: 120, damping: 18 });
  return <motion.div {...tilt}>{children}</motion.div>;
}

/** Hero illustration: a PDF page, the notes panel, and an AI answer card. */
function Float3D() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, (v) => -v * 6), { stiffness: 80, damping: 16 });
  const rotateY = useSpring(useTransform(mx, (v) => v * 6), { stiffness: 80, damping: 16 });

  useEffect(() => {
    const onMove = (e) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 2);
      my.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  const card =
    "absolute rounded-2xl border backdrop-blur-sm border-zinc-200 bg-white/90 shadow-[0_20px_50px_-15px_rgba(76,29,149,0.25)] dark:border-white/10 dark:bg-zinc-900/60 dark:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)]";
  const line = "h-1.5 rounded bg-zinc-200 dark:bg-white/[0.08]";
  const enter = (delay) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <motion.div
      className="relative w-full h-full"
      style={{ rotateX, rotateY, transformPerspective: 1400 }}
    >
      {/* PDF page */}
      <motion.div {...enter(0.2)} className={`${card} left-0 top-6 w-[62%] h-[82%] p-5`}>
        <div className="flex items-center gap-2 mb-5">
          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-300">
            PDF
          </span>
          <span className="text-[11px] text-zinc-500 truncate">lecture-04-photosynthesis.pdf</span>
        </div>
        <div className="space-y-2.5">
          <div className={`${line} w-2/3 !h-2.5 !bg-zinc-300 dark:!bg-white/15`} />
          <div className={`${line} w-full`} />
          <div className={`${line} w-11/12`} />
          <div className="h-1.5 w-4/5 rounded bg-violet-300/70 dark:bg-violet-400/40" />
          <div className="h-1.5 w-3/5 rounded bg-violet-300/70 dark:bg-violet-400/40" />
          <div className={`${line} w-5/6`} />
          <div className={`${line} w-full`} />
          <div className={`${line} w-2/3`} />
          <div className={`${line} w-11/12 mt-5`} />
          <div className={`${line} w-3/4`} />
          <div className={`${line} w-5/6`} />
        </div>
      </motion.div>

      {/* Notes panel */}
      <motion.div {...enter(0.35)} className={`${card} right-0 top-0 w-[52%] h-[58%] p-5`}>
        <div className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 mb-3">My notes</div>
        <div className="space-y-2">
          <div className={`${line} w-full`} />
          <div className={`${line} w-4/5`} />
        </div>
        <div className="mt-4 rounded-md px-2 py-1.5 text-[11px] leading-snug bg-yellow-100 text-zinc-800 dark:bg-yellow-400/15 dark:text-yellow-100">
          What does the Calvin cycle produce?
        </div>
        <div className="mt-3 space-y-2">
          <div className={`${line} w-3/4`} />
          <div className={`${line} w-1/2`} />
        </div>
      </motion.div>

      {/* AI answer */}
      <motion.div {...enter(0.5)} className={`${card} right-[4%] bottom-2 w-[64%] p-4`}>
        <div className="flex items-center gap-2 mb-2.5">
          <span className="w-6 h-6 rounded-md flex items-center justify-center bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-300">
            <Icon.Sparkles className="w-3.5 h-3.5" />
          </span>
          <span className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">AI answer</span>
        </div>
        <p className="text-[11px] leading-relaxed text-zinc-600 dark:text-zinc-400">
          It produces G3P, a three-carbon sugar the plant uses to build glucose
          and other carbohydrates.
        </p>
      </motion.div>

      <motion.div
        aria-hidden
        className="absolute -top-3 left-[58%]"
        animate={{ y: [0, -8, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Icon.Sparkles className="w-5 h-5 text-violet-500/80 dark:text-violet-300/80" />
      </motion.div>
    </motion.div>
  );
}
