import {
  AlertTriangle,
  Armchair,
  BedDouble,
  Car,
  Check,
  CheckCircle2,
  Clock3,
  Footprints,
  Info,
  Package,
  Play,
  Repeat,
  Shirt,
  Video,
  Wrench,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  type Group,
  type PhaseKey,
  type Slide,
  PHASE_1_TAG,
  PHASE_2_TAG,
  SAFETY_NOTE,
  weekSchedule,
} from "@/data/program";

/* ------------------------- accent helpers ------------------------ */

export interface PhaseAccent {
  dot: string;
  mid: string;
  deep: string;
  soft: string;
  border: string;
  solid: string;
  ring: string;
}

export const ACCENTS: Record<PhaseKey, PhaseAccent> = {
  info: {
    dot: "bg-foreground",
    mid: "text-foreground",
    deep: "text-foreground",
    soft: "bg-muted",
    border: "border-border",
    solid: "bg-foreground text-background",
    ring: "ring-foreground/25",
  },
  habits: {
    dot: "bg-ochre",
    mid: "text-ochre",
    deep: "text-ochre-deep",
    soft: "bg-ochre-soft",
    border: "border-ochre/50",
    solid: "bg-ochre-deep text-background",
    ring: "ring-ochre/30",
  },
  p1: {
    dot: "bg-pine",
    mid: "text-pine",
    deep: "text-pine-deep",
    soft: "bg-pine-soft",
    border: "border-pine/50",
    solid: "bg-pine-deep text-background",
    ring: "ring-pine/30",
  },
  p2: {
    dot: "bg-ember",
    mid: "text-ember",
    deep: "text-ember-deep",
    soft: "bg-ember-soft",
    border: "border-ember/50",
    solid: "bg-ember-deep text-background",
    ring: "ring-ember/30",
  },
};

const HABIT_ICONS: Record<string, typeof Armchair> = {
  h1: Armchair,
  h2: Car,
  h3: BedDouble,
  h4: Footprints,
  h5: Package,
  h6: Shirt,
};

function youtubeFallback(name: string): string {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(
    `"${name} tutorial"`,
  )}`;
}

export function phaseTagFor(slide: Slide, group: Group): string | null {
  if (slide.kind === "habit") return "Daily posture habit";
  if (group.phase === "p1") return PHASE_1_TAG;
  if (group.phase === "p2") return PHASE_2_TAG;
  return null;
}

/* --------------------------- shared bits ------------------------- */

function Chip({
  accent,
  children,
  className = "",
}: {
  accent: PhaseAccent;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em] ${accent.soft} ${accent.deep} ${accent.border} ${className}`}
    >
      {children}
    </span>
  );
}

function MediaSlot({
  slide,
  accent,
  isDone,
}: {
  slide: Slide;
  accent: PhaseAccent;
  isDone: boolean;
}) {
  const gif = slide.gifUrl || null;
  return (
    <div
      className={`relative overflow-hidden rounded-[1.75rem] border-2 bg-card ${accent.border} ${
        isDone ? accent.ring + " ring-2" : ""
      }`}
    >
      {gif ? (
        <img
          src={gif}
          alt={`Demonstration of: ${slide.name}`}
          loading="lazy"
          className="aspect-[4/3] w-full object-cover"
        />
      ) : (
        <div className="media-fallback flex aspect-[4/3] w-full flex-col items-center justify-center gap-3 p-6 text-center">
          <div
            className={`grid size-14 place-items-center rounded-2xl ${accent.soft} ${accent.deep}`}
          >
            <Video className="size-7" strokeWidth={1.8} />
          </div>
          <div>
            <p className="font-display text-lg font-semibold leading-tight text-foreground">
              {slide.name}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              GIF placeholder — demo of: {slide.name}
            </p>
          </div>
          <p
            className={`text-[0.65rem] font-semibold uppercase tracking-[0.18em] ${accent.mid}`}
          >
            Drop a gifUrl in the data to play video here
          </p>
        </div>
      )}
      {isDone && (
        <span
          className={`absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold shadow-sm ${accent.solid}`}
        >
          <CheckCircle2 className="size-4" /> Done today
        </span>
      )}
    </div>
  );
}

function YoutubeButton({ slide }: { slide: Slide }) {
  const href = slide.youtubeUrl ?? youtubeFallback(slide.name);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full border-2 border-border bg-card px-5 py-3 text-[0.95rem] font-semibold text-foreground transition hover:border-ember hover:bg-ember-soft active:scale-[0.98]"
    >
      <span className="grid size-6 place-items-center rounded-full bg-ember text-background transition group-hover:scale-110">
        <Play className="size-3 fill-current" />
      </span>
      Watch on YouTube
      <span className="text-muted-foreground">· opens in new tab</span>
    </a>
  );
}

function PositionLine({
  slide,
  number,
  total,
}: {
  slide: Slide;
  number: number;
  total: number;
}) {
  const word =
    slide.kind === "habit" ? "Habit" : slide.kind === "exercise" ? "Exercise" : "Slide";
  return (
    <p className="font-display text-sm font-semibold tracking-wide text-muted-foreground">
      {word} <span className="text-foreground">{number}</span> of {total}
    </p>
  );
}

function DosageTile({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex min-h-16 flex-col items-center justify-center gap-1 rounded-2xl border border-border bg-card px-3 py-3 text-center">
      <span className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>
      <span className="font-display text-lg font-semibold leading-tight text-foreground md:text-xl">
        {value}
      </span>
    </div>
  );
}

function DosageRow({ slide }: { slide: Slide }) {
  if (slide.kind === "habit") {
    return (
      <div className="grid grid-cols-2 gap-2.5">
        <DosageTile label="When" value={slide.cadence ?? "Every day"} />
        <DosageTile label="Focus" value={slide.focus ?? "Everyday posture"} />
      </div>
    );
  }
  const tiles: { label: string; value: string }[] = [];
  if (slide.sets) tiles.push({ label: "Sets", value: slide.sets });
  if (slide.reps) tiles.push({ label: "Reps", value: slide.reps });
  if (slide.hold) tiles.push({ label: "Hold", value: slide.hold });
  if (tiles.length === 0) return null;
  return (
    <div className="grid grid-cols-3 gap-2.5">
      {tiles.map((t) => (
        <DosageTile key={t.label} label={t.label} value={t.value} />
      ))}
    </div>
  );
}

function HowTo({ slide, accent }: { slide: Slide; accent: PhaseAccent }) {
  if (!slide.instructions) return null;
  return (
    <div>
      <div className="flex items-center gap-2">
        <span className={`size-1.5 rounded-full ${accent.dot}`} />
        <h2 className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-muted-foreground">
          How to
        </h2>
        <span className="h-px flex-1 bg-border" />
      </div>
      <p className="mt-2.5 text-[1.02rem] leading-relaxed text-foreground/90">
        {slide.instructions}
      </p>
    </div>
  );
}

function NoteCallout({ slide, accent }: { slide: Slide; accent: PhaseAccent }) {
  if (!slide.note) return null;
  return (
    <div
      className={`flex items-start gap-3 rounded-2xl border p-4 ${accent.soft} ${accent.border}`}
    >
      <Info className={`mt-0.5 size-5 shrink-0 ${accent.mid}`} strokeWidth={2.2} />
      <p className={`text-[0.92rem] leading-relaxed ${accent.deep}`}>{slide.note}</p>
    </div>
  );
}

function GearLine({ slide, accent }: { slide: Slide; accent: PhaseAccent }) {
  if (!slide.gear) return null;
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 rounded-2xl border border-dashed border-border bg-surface-alt/60 px-4 py-2.5">
      <Wrench className={`size-3.5 shrink-0 ${accent.mid}`} />
      <span className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        You'll need
      </span>
      <span className="text-sm leading-snug text-foreground/90">{slide.gear}</span>
    </div>
  );
}

/* ---------------------- exercise / habit slide -------------------- */

function WorkoutSlide({
  slide,
  group,
  accent,
  number,
  total,
  isDone,
}: {
  slide: Slide;
  group: Group;
  accent: PhaseAccent;
  number: number;
  total: number;
  isDone: boolean;
}) {
  const tag = phaseTagFor(slide, group);
  const Icon = slide.kind === "habit" ? HABIT_ICONS[slide.id] ?? Repeat : null;
  const ghost = String(number).padStart(2, "0");

  return (
    <article className="relative">
      {/* ghost number */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-5 right-1 font-display text-[5.5rem] font-bold leading-none tracking-tighter text-foreground/[0.06] select-none md:-top-8 md:text-[7rem]"
      >
        {ghost}
      </span>

      <div className="relative grid gap-5 lg:grid-cols-2 lg:gap-x-12">
        {/* header (left col on mobile, right col on lg) */}
        <div className="order-1 lg:col-start-2 lg:row-start-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <div className="flex flex-wrap items-center gap-2">
              {slide.kind === "habit" && Icon && (
                <span
                  className={`inline-flex size-8 items-center justify-center rounded-xl ${accent.soft} ${accent.deep}`}
                >
                  <Icon className="size-5" strokeWidth={2} />
                </span>
              )}
              {tag && (
                <Chip accent={accent}>
                  <span className={`size-1.5 rounded-full ${accent.dot}`} />
                  {tag}
                </Chip>
              )}
              <span className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {slide.day}
              </span>
            </div>
            <div className="ml-auto">
              <PositionLine slide={slide} number={number} total={total} />
            </div>
          </div>

          <h1 className="mt-3 font-display text-[2rem] font-bold leading-[1.05] tracking-tight text-balance md:text-[2.6rem]">
            {slide.name}
          </h1>
        </div>

        {/* media */}
        <div className="order-2 lg:col-start-1 lg:row-start-1 lg:self-start">
          <MediaSlot slide={slide} accent={accent} isDone={isDone} />
          <div className="mt-3">
            <YoutubeButton slide={slide} />
          </div>
        </div>

        {/* dosage */}
        <div className="order-3 lg:col-start-2 lg:row-start-2">
          <DosageRow slide={slide} />
        </div>

        {/* how-to + note */}
        <div className="order-4 space-y-4 lg:col-start-2 lg:row-start-3">
          <HowTo slide={slide} accent={accent} />
          <GearLine slide={slide} accent={accent} />
          <NoteCallout slide={slide} accent={accent} />
        </div>
      </div>
    </article>
  );
}

/* --------------------------- info slides ------------------------- */

function CoverSlide({
  accent,
  onJump,
  hasDone,
  onResetAll,
}: {
  accent: PhaseAccent;
  onJump: (gid: string) => void;
  hasDone: boolean;
  onResetAll: () => void;
}) {
  return (
    <article className="relative overflow-hidden">
      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.16em] ${accent.soft} ${accent.deep} ${accent.border}`}
            >
              <span className="size-1.5 rounded-full bg-ember" />
              Slide deck · phone-ready
            </span>
            <span className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              6 days a week · at home
            </span>
          </div>

          <h1 className="mt-4 font-display text-[2.6rem] font-bold leading-[0.98] tracking-tight text-balance sm:text-[3.4rem] lg:text-[4rem]">
            Posture on the mat.
            <br />
            <span className="text-pine">Strength</span> that{" "}
            <span className="text-ember">follows</span>.
          </h1>

          <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-muted-foreground">
            A twelve-month, six-days-a-week posture-correction and conditioning
            program. Months 1–6 are slow corrective floor work plus daily
            posture habits; months 7–12 move the same weekly rhythm onto a TRX
            suspension circuit. Every routine below lives in its own tab, so
            you jump straight to today and swipe through.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-pine/40 bg-pine-soft px-3 py-1.5 text-xs font-semibold text-pine-deep">
              <span className="size-1.5 rounded-full bg-pine" /> Phase 1 · months 1–6 — mat work
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-ember/40 bg-ember-soft px-3 py-1.5 text-xs font-semibold text-ember-deep">
              <span className="size-1.5 rounded-full bg-ember" /> Phase 2 · months 7–12 — TRX
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-ochre/40 bg-ochre-soft px-3 py-1.5 text-xs font-semibold text-ochre-deep">
              <span className="size-1.5 rounded-full bg-ochre" /> Daily posture habits
            </span>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onJump("habits")}
              className={`inline-flex min-h-12 items-center gap-2 rounded-full px-6 py-3 text-[0.95rem] font-bold shadow-sm transition active:scale-[0.98] ${accent.solid}`}
            >
              Start with today's habits
              <Play className="size-4 fill-current" />
            </button>
            {hasDone && (
              <button
                type="button"
                onClick={onResetAll}
                className="inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-border bg-card px-5 py-3 text-sm font-semibold text-muted-foreground transition hover:text-foreground active:scale-[0.98]"
              >
                <CheckCircle2 className="size-4" />
                Clear all checkmarks
              </button>
            )}
          </div>
        </div>

        {/* safety note panel */}
        <div className="lg:self-center">
          <div className="relative overflow-hidden rounded-[1.75rem] border border-border bg-card p-6 shadow-sm">
            <span className="pointer-events-none absolute -right-10 -top-10 size-36 rounded-full bg-ember/10" />
            <span className="pointer-events-none absolute -bottom-12 -left-8 size-32 rounded-full bg-pine/10" />
            <div className="relative">
              <div className="flex items-center gap-2.5">
                <span className="grid size-9 place-items-center rounded-xl bg-ember-soft text-ember-deep">
                  <AlertTriangle className="size-5" />
                </span>
                <p className="font-display text-sm font-bold uppercase tracking-[0.16em] text-foreground">
                  Before you start
                </p>
              </div>
              <p className="mt-4 text-[0.98rem] leading-relaxed text-foreground/85">
                {SAFETY_NOTE}
              </p>
              <p className="mt-4 border-t border-dashed border-border pt-4 text-xs leading-relaxed text-muted-foreground">
                Posture habits apply every day, in both phases. Friday is
                always rest. No diet, no supplements — just movement you can
                check off and feel.
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

const TRX_TARGET: Record<number, string> = {
  0: "t1", // Sunday
  1: "t2", // Monday
  2: "t1", // Tuesday
  3: "", // Wednesday (not covered)
  4: "t2", // Thursday
  6: "t2", // Saturday
};

function ScheduleSlide({
  onJump,
}: {
  onJump: (gid: string) => void;
}) {
  const today = new Date().getDay();
  return (
    <article>
      <div className="flex flex-wrap items-center gap-2">
        <Chip accent={ACCENTS.info}>
          <span className="size-1.5 rounded-full bg-foreground" />
          The weekly rhythm
        </Chip>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          <Clock3 className="size-3.5" /> Habit column applies every day
        </span>
      </div>

      <h1 className="mt-3 font-display text-[2rem] font-bold leading-[1.05] tracking-tight text-balance md:text-[2.6rem]">
        One week, two phases, one rhythm
      </h1>
      <p className="mt-3 max-w-2xl text-[1.02rem] leading-relaxed text-muted-foreground">
        Pick the phase you're in — Phase 1 (months 1–6) or Phase 2 (months
        7–12) — and follow its column for the day. Tap any routine row to jump
        straight to that deck.
      </p>

      <div className="mt-7 overflow-hidden rounded-3xl border border-border bg-card">
        <div className="grid grid-cols-[1.1fr_1fr_1.15fr] gap-px bg-border text-sm">
          <div className="bg-card px-4 py-2.5 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            Day
          </div>
          <div className="bg-card px-4 py-2.5 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-pine">
            Phase 1 · months 1–6
          </div>
          <div className="bg-card px-4 py-2.5 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-ember">
            Phase 2 · months 7–12
          </div>

          {weekSchedule.map((row) => {
            const isToday = row.weekday === today;
            const cellBg = isToday ? "bg-pine-soft/70" : "bg-card";
            return (
              <div key={row.day} className="contents">
                <div
                  className={`flex items-center gap-2 px-4 py-3 font-semibold ${cellBg} ${
                    isToday ? "text-pine-deep" : "text-foreground"
                  }`}
                >
                  {row.day}
                  {isToday && (
                    <span className="rounded-full bg-pine-deep px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider text-background">
                      Today
                    </span>
                  )}
                </div>
                <div className={`px-4 py-3 ${cellBg}`}>
                  {row.rest ? (
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
                      <Check className="size-3.5" /> Rest day
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => row.target && onJump(row.target)}
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold transition active:scale-95 ${
                        row.target
                          ? "border-pine/40 bg-pine-soft text-pine-deep hover:bg-pine/30"
                          : ""
                      }`}
                    >
                      {row.p1}
                    </button>
                  )}
                </div>
                <div className={`px-4 py-3 ${cellBg}`}>
                  {row.rest ? (
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
                      <Check className="size-3.5" /> Rest day
                    </span>
                  ) : row.weekday === 3 ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-ochre/50 bg-ochre-soft px-3 py-1.5 text-xs font-semibold text-ochre-deep">
                      <AlertTriangle className="size-3.5" /> {row.p2}
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        const t = TRX_TARGET[row.weekday];
                        if (t) onJump(t);
                      }}
                      className="inline-flex items-center gap-1.5 rounded-full border border-ember/40 bg-ember-soft px-3 py-1.5 text-xs font-bold text-ember-deep transition active:scale-95 hover:bg-ember/30"
                    >
                      {row.p2}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-2">
          <span className="size-2 rounded-full bg-pine" /> Day 1 &amp; 3 &amp; Day 5 &amp; 6 are Phase-1 tabs
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="size-2 rounded-full bg-ochre" /> Habits run every day regardless of phase
        </span>
      </div>
    </article>
  );
}

function GenericInfoSlide({
  slide,
  group,
  accent,
  number,
  total,
  onJump,
  onJumpToIndex,
}: {
  slide: Slide;
  group: Group;
  accent: PhaseAccent;
  number: number;
  total: number;
  onJump: (gid: string) => void;
  onJumpToIndex: (gid: string, index: number) => void;
}) {
  const isSetup = slide.id === "t1-setup" || slide.id === "t2-setup";
  const exercises = group.slides.filter((s) => s.kind !== "info");

  return (
    <article>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <Chip accent={accent}>
            <span className={`size-1.5 rounded-full ${accent.dot}`} />
            {group.kicker}
          </Chip>
          <span className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            {slide.day}
          </span>
        </div>
        <div className="ml-auto">
          <PositionLine slide={slide} number={number} total={total} />
        </div>
      </div>

      <h1 className="mt-3 max-w-2xl font-display text-[2rem] font-bold leading-[1.05] tracking-tight text-balance md:text-[2.6rem]">
        {slide.name}
      </h1>

      {slide.gear && <div className="mt-5 max-w-2xl"><GearLine slide={slide} accent={accent} /></div>}

      {slide.instructions && (
        <p className="mt-5 max-w-2xl text-[1.05rem] leading-relaxed text-foreground/90">
          {slide.instructions}
        </p>
      )}

      {slide.bullets && slide.bullets.length > 0 && (
        <ul className="mt-5 max-w-2xl space-y-2.5">
          {slide.bullets.map((b) => (
            <li key={b} className="flex items-start gap-3 text-[0.98rem] leading-relaxed text-foreground/85">
              <CheckCircle2 className={`mt-0.5 size-5 shrink-0 ${accent.mid}`} strokeWidth={2.2} />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}

      {slide.note && (
        <div className="mt-5 max-w-2xl">
          <NoteCallout slide={slide} accent={ACCENTS.habits} />
        </div>
      )}

      {/* movement index for TRX setup slides */}
      {isSetup && exercises.length > 0 && (
        <div className="mt-7 max-w-2xl rounded-3xl border border-border bg-card p-5">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Jump to a move
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {exercises.map((ex, i) => (
              <button
                key={ex.id}
                type="button"
                onClick={() => onJumpToIndex(group.id, i + 1)}
                className="inline-flex min-h-11 min-w-11 items-center justify-center gap-1.5 rounded-2xl border border-border bg-background px-3 py-2 text-sm font-bold text-foreground transition hover:bg-muted active:scale-95"
              >
                {i + 1}
                <span className="hidden max-w-28 truncate font-medium text-muted-foreground sm:inline">
                  {ex.name.replace(/^TRX\s+/i, "")}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {slide.quick && slide.quick.length > 0 && (
        <div className="mt-6 flex max-w-2xl flex-wrap gap-2.5">
          {slide.quick.map((q) => (
            <button
              key={q.target}
              type="button"
              onClick={() => onJump(q.target)}
              className="inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-border bg-card px-5 py-2.5 text-sm font-bold text-foreground transition hover:border-foreground/50 active:scale-[0.98]"
            >
              {q.label}
              <Play className="size-3.5 fill-current text-muted-foreground" />
            </button>
          ))}
        </div>
      )}
    </article>
  );
}

/* --------------------------- dispatcher -------------------------- */

export function SlideContent(props: {
  slide: Slide;
  group: Group;
  number: number;
  total: number;
  isDone: boolean;
  onJump: (gid: string) => void;
  onJumpToIndex: (gid: string, index: number) => void;
  hasDone: boolean;
  onResetAll: () => void;
}) {
  const { slide, group, number, total, isDone } = props;
  const accent = ACCENTS[group.phase];

  if (slide.kind === "info" && slide.id === "cover") {
    return <CoverSlide accent={accent} onJump={props.onJump} hasDone={props.hasDone} onResetAll={props.onResetAll} />;
  }
  if (slide.kind === "info" && slide.id === "schedule") {
    return <ScheduleSlide onJump={props.onJump} />;
  }
  if (slide.kind === "info") {
    return (
      <GenericInfoSlide
        slide={slide}
        group={group}
        accent={accent}
        number={number}
        total={total}
        onJump={props.onJump}
        onJumpToIndex={props.onJumpToIndex}
      />
    );
  }
  return (
    <WorkoutSlide
      slide={slide}
      group={group}
      accent={accent}
      number={number}
      total={total}
      isDone={isDone}
    />
  );
}

/** Subtle entrance used for the "done" pulse on the exercise card. */
export function DonePulse({ children }: { children: React.ReactNode }) {
  return (
    <motion.span
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 26 }}
    >
      {children}
    </motion.span>
  );
}
