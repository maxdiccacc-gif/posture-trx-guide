import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronRight,
  CircleAlert,
  Clock3,
  Dumbbell,
  Link2,
  Lock,
  Play,
  ShieldCheck,
  Smartphone,
  SwatchBook,
  Video,
} from "lucide-react";
import { Link } from "react-router";
import { weekSchedule } from "@/data/program";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0 },
};

function PhoneMock() {
  return (
    <div className="relative mx-auto w-[300px] max-w-full sm:w-[330px]">
      {/* halo */}
      <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-pine/20 via-transparent to-ember/20 blur-2xl" />
      <div className="relative overflow-hidden rounded-[2.6rem] border border-border bg-card shadow-2xl shadow-foreground/10">
        {/* notch bar */}
        <div className="flex h-9 items-center justify-between border-b border-border/70 px-5">
          <span className="size-1.5 rounded-full bg-pine" />
          <span className="font-display text-[0.62rem] font-bold tracking-[0.18em] text-muted-foreground">
            DAY 1 &amp; 3
          </span>
          <span className="size-1.5 rounded-full bg-ember" />
        </div>
        <div className="p-4">
          {/* mini tabs */}
          <div className="no-scrollbar flex gap-1.5 overflow-x-auto pb-3">
            {["Habits", "D1 & 3", "D2 & 4", "D5 & 6", "T1", "T2"].map((t, i) => (
              <span
                key={t}
                className={`shrink-0 rounded-full px-2.5 py-1 text-[0.58rem] font-bold ${
                  i === 1
                    ? "bg-pine-deep text-background"
                    : "border border-border bg-background text-muted-foreground"
                }`}
              >
                {t}
              </span>
            ))}
          </div>
          {/* mini slide */}
          <div className="rounded-2xl border border-border bg-background p-3.5">
            <div className="flex items-center justify-between gap-2">
              <span className="rounded-full border border-pine/40 bg-pine-soft px-2 py-0.5 text-[0.52rem] font-bold uppercase tracking-wider text-pine-deep">
                Phase 1
              </span>
              <span className="text-[0.56rem] font-bold text-muted-foreground">
                Exercise 5 of 7
              </span>
            </div>
            <p className="mt-2 font-display text-[0.95rem] font-bold leading-tight tracking-tight">
              Glute Bridge with Alternating Knee Cross
            </p>
            <div className="mt-2.5 grid grid-cols-3 gap-1.5">
              {[
                ["Sets", "6"],
                ["Reps", "20"],
                ["Hold", "5s"],
              ].map(([l, v]) => (
                <div
                  key={l}
                  className="rounded-xl border border-border bg-card py-1.5 text-center"
                >
                  <p className="text-[0.45rem] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                    {l}
                  </p>
                  <p className="font-display text-[0.72rem] font-bold">{v}</p>
                </div>
              ))}
            </div>
            <div className="media-fallback mt-2.5 grid aspect-[4/3] w-full place-items-center rounded-xl border border-dashed border-border">
              <span className="grid size-8 place-items-center rounded-lg bg-pine-soft text-pine-deep">
                <Play className="size-3.5 fill-current" />
              </span>
            </div>
            <div className="mt-2.5 flex items-center justify-between gap-2">
              <span className="rounded-full border border-border bg-card px-2.5 py-1 text-[0.5rem] font-bold text-muted-foreground">
                GIF demo + YouTube tutorial
              </span>
            </div>
          </div>
          {/* mini footer controls */}
          <div className="mt-3 flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded-xl border border-border bg-card text-muted-foreground">
              <ChevronRight className="size-3.5 -scale-x-100" />
            </span>
            <span className="inline-flex h-8 flex-1 items-center justify-center gap-1.5 rounded-xl bg-pine-deep text-[0.6rem] font-bold text-background">
              <Check className="size-3" strokeWidth={3} />
              Mark done · 2/7
            </span>
            <span className="grid size-8 place-items-center rounded-xl border border-border bg-card text-muted-foreground">
              <ChevronRight className="size-3.5" />
            </span>
          </div>
        </div>
      </div>
      <span className="absolute -right-3 top-10 rotate-6 rounded-xl border border-ember/40 bg-ember-soft px-2.5 py-1 text-[0.6rem] font-bold text-ember-deep shadow-sm">
        swipe to train
      </span>
    </div>
  );
}

export default function Landing() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      {/* ------------------------------- nav ------------------------------- */}
      <header className="border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center gap-4 px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex items-center">
              <span className="size-2.5 rounded-full bg-pine" />
              <span className="-ml-1 size-2.5 rounded-full bg-ember" />
            </span>
            <span className="font-display text-base font-bold tracking-tight">
              posture<span className="text-ember">+</span>TRX
            </span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex md:ml-6">
            <a href="#program" className="transition hover:text-foreground">
              The program
            </a>
            <a href="#week" className="transition hover:text-foreground">
              Weekly rhythm
            </a>
            <a href="#deck" className="transition hover:text-foreground">
              The deck
            </a>
          </nav>
          <div className="ml-auto flex items-center gap-2 md:ml-0">
            <Link
              to="/dashboard"
              className="inline-flex h-10 items-center gap-1.5 rounded-full bg-foreground px-4 text-sm font-bold text-background transition hover:opacity-85 active:scale-95"
            >
              Start training
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* ------------------------------- hero ------------------------------ */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(52rem 30rem at 85% -10%, color-mix(in srgb, var(--ember) 10%, transparent), transparent 60%), radial-gradient(44rem 26rem at -10% 30%, color-mix(in srgb, var(--pine) 12%, transparent), transparent 60%)",
          }}
        />
        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 lg:pb-24 lg:pt-20">
          <motion.div
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: 0.08, delayChildren: 0.05 }}
          >
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                <CalendarDays className="size-3.5 text-pine" />
                6 days a week · at home · 12 months
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mt-5 font-display text-[2.7rem] font-bold leading-[0.98] tracking-tight text-balance sm:text-[3.6rem] lg:text-[4.2rem]"
            >
              Posture you{" "}
              <span className="text-pine">build on the floor</span>, strength
              that <span className="text-ember">follows</span>.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground"
            >
              A corrective-posture and conditioning program for home: daily
              posture habits, three mat routines in months 1–6, then the same
              weekly rhythm on a TRX-style suspension trainer in months 7–12.
              Delivered as a phone-first slide deck — jump to today, swipe
              through the moves, check them off.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Link
                to="/dashboard"
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-base font-bold text-background shadow-sm transition hover:opacity-85 active:scale-[0.98] sm:min-h-14"
              >
                Start today's routine
                <ArrowRight className="size-5" />
              </Link>
              <Link
                to="/program"
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border-2 border-border bg-card px-6 py-3.5 text-base font-semibold transition hover:border-foreground/50 active:scale-[0.98] sm:min-h-14"
              >
                <Smartphone className="size-5 text-muted-foreground" />
                Preview the deck — no account needed
              </Link>
            </motion.div>
            <motion.p
              variants={fadeUp}
              className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground"
            >
              <Lock className="size-3.5" />
              Signing in is a one-tap guest pass; your check-off progress lives
              in the browser either way.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="relative"
          >
            <PhoneMock />
          </motion.div>
        </div>
      </section>

      {/* --------------------------- trust strip --------------------------- */}
      <section className="border-y border-border bg-card/60">
        <div className="mx-auto grid w-full max-w-6xl gap-4 px-4 py-6 sm:px-6 md:grid-cols-3">
          {[
            {
              icon: Dumbbell,
              title: "Start with what you own",
              body: "Phase 1 needs only a mat, a small pillow or towel, and light dumbbells for one move. Phase 2 adds a TRX-style strap with a secure overhead anchor.",
            },
            {
              icon: ShieldCheck,
              title: "Guided by feel, not force",
              body: "These are guidelines, not requirements to push through pain. Sharp or worsening pain means stop and see a physiotherapist.",
            },
            {
              icon: Video,
              title: "Every move has a demo",
              body: "Each slide carries a GIF slot and a working YouTube tutorial link, so you can watch the pattern before you load up.",
            },
          ].map((f) => (
            <div key={f.title} className="flex gap-3.5">
              <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-foreground text-background">
                <f.icon className="size-5" />
              </span>
              <div>
                <h3 className="font-display text-[0.95rem] font-bold">{f.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {f.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------ weekly ------------------------------ */}
      <section id="week" className="scroll-mt-16">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-ember">
            One rhythm, both phases
          </p>
          <h2 className="mt-2 max-w-2xl font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            Same week, two phases. Tap a day, do the work.
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Phase 1 (months 1–6) runs the mat routines; Phase 2 (months 7–12)
            runs the TRX circuits in the same slots. Posture habits apply every
            day, no matter which phase you're in.
          </p>

          <div className="mt-9 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {weekSchedule.map((row) => (
              <div
                key={row.day}
                className={`rounded-3xl border p-4 ${
                  row.rest
                    ? "border-border bg-card/50"
                    : "border-border bg-card"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="font-display text-sm font-bold">{row.day}</p>
                  {row.rest ? (
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider text-muted-foreground">
                      Rest
                    </span>
                  ) : (
                    <span className="rounded-full bg-foreground px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider text-background">
                      Train
                    </span>
                  )}
                </div>
                <div className="mt-3 space-y-1.5 text-sm">
                  <p className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-1.5 font-semibold text-pine-deep">
                      <span className="size-1.5 rounded-full bg-pine" />
                      M1–6 · {row.p1}
                    </span>
                  </p>
                  <p className="flex items-center justify-between gap-2">
                    {row.rest ? (
                      <span className="flex items-center gap-1.5 text-muted-foreground">
                        <span className="size-1.5 rounded-full bg-muted" />
                        M7–12 · — — — 
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 font-semibold text-ember-deep">
                        <span className="size-1.5 rounded-full bg-ember" />
                        M7–12 · {row.p2}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap items-start gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <p className="inline-flex items-start gap-2">
              <CircleAlert className="mt-0.5 size-4 shrink-0 text-ochre" />
              Wednesday isn't covered in the original TRX material — treat it as
              a rest day, or repeat T1 or T2.
            </p>
            <p className="inline-flex items-start gap-2">
              <Check className="mt-0.5 size-4 shrink-0 text-pine" />
              Daily posture habits apply every day, in both phases.
            </p>
          </div>
        </div>
      </section>

      {/* --------------------------- the phases ---------------------------- */}
      <section id="program" className="scroll-mt-16 border-y border-border bg-card/60">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-pine">
            The two phases
          </p>
          <h2 className="mt-2 max-w-2xl font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            Correct first. Condition second.
          </h2>

          <div className="mt-9 grid gap-5 lg:grid-cols-2">
            {/* phase 1 */}
            <div className="relative overflow-hidden rounded-[2rem] border border-pine/40 bg-pine-soft p-6 sm:p-8">
              <span className="pointer-events-none absolute -right-8 -top-8 size-36 rounded-full bg-pine/15" />
              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full border border-pine/40 bg-card px-3.5 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-pine-deep">
                  <span className="size-1.5 rounded-full bg-pine" />
                  Phase 1 · months 1–6
                </span>
                <h3 className="mt-4 font-display text-2xl font-bold tracking-tight sm:text-[1.7rem]">
                  Corrective mat work
                </h3>
                <p className="mt-2 text-[0.98rem] leading-relaxed text-foreground/80">
                  Slow, gentle floor routines that retrain how you hold your
                  shoulders, pelvis and spine — no equipment beyond a mat, a
                  pillow or towel, and light dumbbells for one move.
                </p>
                <ul className="mt-5 space-y-2.5">
                  {[
                    "Shoulder retraction & gentle chest lifts",
                    "Glute bridges, clamshells & rotational mobility",
                    "Three routines rotate across the week",
                    "Short sessions — most days are 10–20 minutes",
                  ].map((li) => (
                    <li
                      key={li}
                      className="flex items-start gap-2.5 text-[0.95rem] leading-snug text-foreground/85"
                    >
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-pine-deep text-background">
                        <Check className="size-3" strokeWidth={3} />
                      </span>
                      {li}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-2">
                  {["Day 1 & 3", "Day 2 & 4", "Day 5 & 6"].map((d) => (
                    <Link
                      key={d}
                      to="/program"
                      className="inline-flex items-center gap-1 rounded-full border border-pine/40 bg-card px-3.5 py-1.5 text-xs font-bold text-pine-deep transition hover:bg-pine hover:text-background active:scale-95"
                    >
                      {d}
                      <ChevronRight className="size-3.5" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* phase 2 */}
            <div className="relative overflow-hidden rounded-[2rem] border border-ember/40 bg-ember-soft p-6 sm:p-8">
              <span className="pointer-events-none absolute -right-8 -top-8 size-36 rounded-full bg-ember/15" />
              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full border border-ember/40 bg-card px-3.5 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-ember-deep">
                  <span className="size-1.5 rounded-full bg-ember" />
                  Phase 2 · months 7–12
                </span>
                <h3 className="mt-4 font-display text-2xl font-bold tracking-tight sm:text-[1.7rem]">
                  TRX suspension circuit
                </h3>
                <p className="mt-2 text-[0.98rem] leading-relaxed text-foreground/80">
                  The same weekly rhythm on a TRX-style suspension trainer:
                  rows, presses, planks, bridges and squats against straps
                  anchored securely overhead.
                </p>
                <ul className="mt-5 space-y-2.5">
                  {[
                    "T1 pushes and pulls — Sun & Tue",
                    "T2 suspends your core — Sat, Mon & Thu",
                    "Needs a door anchor or bar rated for bodyweight",
                    "Combo flows that chain positions into one rep",
                  ].map((li) => (
                    <li
                      key={li}
                      className="flex items-start gap-2.5 text-[0.95rem] leading-snug text-foreground/85"
                    >
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-ember-deep text-background">
                        <Check className="size-3" strokeWidth={3} />
                      </span>
                      {li}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Link
                    to="/program"
                    className="inline-flex items-center gap-1 rounded-full border border-ember/40 bg-card px-3.5 py-1.5 text-xs font-bold text-ember-deep transition hover:bg-ember hover:text-background active:scale-95"
                  >
                    TRX – T1
                    <ChevronRight className="size-3.5" />
                  </Link>
                  <Link
                    to="/program"
                    className="inline-flex items-center gap-1 rounded-full border border-ember/40 bg-card px-3.5 py-1.5 text-xs font-bold text-ember-deep transition hover:bg-ember hover:text-background active:scale-95"
                  >
                    TRX – T2
                    <ChevronRight className="size-3.5" />
                  </Link>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-foreground/5 px-3.5 py-1.5 text-xs font-semibold text-ember-deep">
                    <CircleAlert className="size-3.5" />
                    Wed = rest or repeat T1/T2
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------- how it works -------------------------- */}
      <section id="deck" className="scroll-mt-16">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-ochre">
            Built like a slide deck
          </p>
          <h2 className="mt-2 max-w-2xl font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            One slide per exercise. Designed for a phone propped beside you.
          </h2>

          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {[
              {
                n: "01",
                icon: SwatchBook,
                title: "Jump straight to today",
                body: "A tab bar for Posture Habits, each mat day, and both TRX circuits. No scrolling through fifty slides to find where you left off.",
              },
              {
                n: "02",
                icon: Smartphone,
                title: "Swipe, tap or use arrow keys",
                body: "Big prev/next targets, arrow keys on desktop, and swipe on a touchscreen. Progress text keeps you honest: 'Exercise 3 of 7'.",
              },
              {
                n: "03",
                icon: Check,
                title: "Check it off and move on",
                body: "Every exercise has a satisfying done button, and your checkmarks survive refreshes on that device. Reset a day any time.",
              },
            ].map((c) => (
              <div
                key={c.n}
                className="group rounded-[2rem] border border-border bg-card p-6 transition hover:border-foreground/30 sm:p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-2xl bg-foreground text-background transition group-hover:scale-105">
                    <c.icon className="size-5" />
                  </span>
                  <span className="font-display text-4xl font-bold text-foreground/10">
                    {c.n}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-lg font-bold">{c.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted-foreground">
                  {c.body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-start gap-3 rounded-3xl border border-dashed border-border bg-card/60 p-5 text-sm leading-relaxed text-muted-foreground">
            <Clock3 className="mt-0.5 size-5 shrink-0 text-ochre" />
            <p>
              The deck opens with a short overview — including the safety note
              and this week's schedule — then drops you into the routines.
              Phase 1 needs a mat; Phase 2 needs an overhead anchor rated for
              bodyweight training. Check both before you start.
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------ CTA -------------------------------- */}
      <section className="px-4 pb-20 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-[2.5rem] bg-foreground px-6 py-14 text-background sm:px-12 lg:py-20"
        >
          <span className="pointer-events-none absolute -left-16 -top-16 size-56 rounded-full bg-pine/30 blur-3xl" />
          <span className="pointer-events-none absolute -bottom-20 -right-10 size-64 rounded-full bg-ember/25 blur-3xl" />
          <div className="relative max-w-2xl">
            <p className="flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-background/60">
              <Link2 className="size-3.5" />
              Posture habits run every day
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-balance sm:text-5xl">
              Tonight's session is a few swipes away.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-background/70">
              Open the deck, pick the day you're on, and work top to bottom.
              Ten to twenty minutes on the floor beats another hour hunched at
              a screen.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/dashboard"
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-background px-7 py-3.5 text-base font-bold text-foreground transition hover:opacity-90 active:scale-[0.98]"
              >
                Open the training deck
                <ArrowRight className="size-5" />
              </Link>
              <Link
                to="/program"
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border-2 border-background/30 px-6 py-3.5 text-base font-semibold text-background transition hover:border-background/60 active:scale-[0.98]"
              >
                Browse without signing in
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ------------------------------ footer ----------------------------- */}
      <footer className="border-t border-border">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-md">
            <Link to="/" className="flex items-center gap-2">
              <span className="flex items-center">
                <span className="size-2.5 rounded-full bg-pine" />
                <span className="-ml-1 size-2.5 rounded-full bg-ember" />
              </span>
              <span className="font-display text-base font-bold tracking-tight">
                posture<span className="text-ember">+</span>TRX
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              A 12-month home posture-correction and conditioning program:
              daily posture habits, corrective mat routines, and a TRX-style
              circuit. Movement only — no diet or supplement plan.
            </p>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground/80">
              General posture and mobility guidance, not medical treatment. If
              any movement causes sharp or worsening pain, stop and check with
              a physiotherapist. "TRX" is used descriptively for suspension
              trainers; the program is not affiliated with the TRX brand.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                Routines
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                {[
                  ["Posture Habits — every day", "/program"],
                  ["Day 1 & 3 — Sat & Mon", "/program"],
                  ["Day 2 & 4 — Sun & Tue", "/program"],
                  ["Day 5 & 6 — Wed & Thu", "/program"],
                ].map(([label, to]) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="inline-flex items-center gap-1 text-muted-foreground transition hover:text-foreground"
                    >
                      {label}
                      <ChevronRight className="size-3.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                TRX circuits
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link
                    to="/program"
                    className="inline-flex items-center gap-1 text-muted-foreground transition hover:text-foreground"
                  >
                    TRX – T1 · 15 moves <ChevronRight className="size-3.5" />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/program"
                    className="inline-flex items-center gap-1 text-muted-foreground transition hover:text-foreground"
                  >
                    TRX – T2 · 18 moves <ChevronRight className="size-3.5" />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard"
                    className="inline-flex items-center gap-1 font-semibold text-foreground transition hover:text-ember"
                  >
                    Start training <ArrowRight className="size-3.5" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-border/70">
          <p className="mx-auto w-full max-w-6xl px-4 py-4 text-xs text-muted-foreground sm:px-6">
            © {new Date().getFullYear()} posture+TRX — a personal reference
            deck. Posture and conditioning only: no diet, no supplements, no
            growth claims.
          </p>
        </div>
      </footer>
    </div>
  );
}
