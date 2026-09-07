import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Home,
  RotateCcw,
} from "lucide-react";
import { groups } from "@/data/program";
import { ACCENTS, SlideContent } from "./slides";

/* ------------------------- persistence --------------------------- */

const STORE_KEY = "posture-trx-deck-v1";

interface Stored {
  done: string[];
  group: string | null;
}

function readStore(): Stored {
  try {
    const raw = window.localStorage.getItem(STORE_KEY);
    if (!raw) return { done: [], group: null };
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return { done: [], group: null };
    const p = parsed as { done?: unknown; group?: unknown };
    const done = Array.isArray(p.done)
      ? p.done.filter((x): x is string => typeof x === "string")
      : [];
    const group = typeof p.group === "string" ? p.group : null;
    return { done, group };
  } catch {
    return { done: [], group: null };
  }
}

/* --------------------------- helpers ----------------------------- */

const FILL: Record<string, string> = {
  info: "bg-foreground/60",
  habits: "bg-ochre",
  p1: "bg-pine",
  p2: "bg-ember",
};

const slideVariants = {
  enter: (d: number) => ({ opacity: 0, x: d * 64 }),
  center: { opacity: 1, x: 0 },
  exit: (d: number) => ({ opacity: 0, x: d * -64 }),
};

/* ---------------------------- deck ------------------------------- */

export default function ProgramApp() {
  const [stored] = useState<Stored>(readStore);
  const [activeId, setActiveId] = useState<string>(() =>
    stored.group && groups.some((g) => g.id === stored.group) ? (stored.group as string) : "start",
  );
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const [done, setDone] = useState<Set<string>>(() => new Set(stored.done));

  useEffect(() => {
    try {
      window.localStorage.setItem(
        STORE_KEY,
        JSON.stringify({ done: Array.from(done), group: activeId }),
      );
    } catch {
      /* storage unavailable — check-off state just won't persist */
    }
  }, [done, activeId]);

  const gIdx = groups.findIndex((g) => g.id === activeId);
  const group = groups[Math.max(0, gIdx)];
  const accent = ACCENTS[group.phase];
  const slides = group.slides;
  const dataSlides = slides.filter((s) => s.kind !== "info");
  const safeIdx = Math.min(idx, slides.length - 1);
  const slide = slides[safeIdx];
  const isInfo = slide.kind === "info";
  const dataBefore = slides.slice(0, safeIdx).filter((s) => s.kind !== "info").length;
  const positionNumber = isInfo ? safeIdx + 1 : dataBefore + 1;
  const positionTotal = isInfo ? slides.length : dataSlides.length;
  const doneInGroup = dataSlides.filter((s) => done.has(s.id)).length;
  const groupAllDone = dataSlides.length > 0 && doneInGroup === dataSlides.length;

  const mainRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    // let the exit animation finish before snapping back to the top
    const t = window.setTimeout(() => mainRef.current?.scrollTo(0, 0), 280);
    return () => window.clearTimeout(t);
  }, [activeId, safeIdx]);

  const jumpGroup = (gid: string) => {
    if (gid === activeId) return;
    const target = groups.findIndex((g) => g.id === gid);
    if (target === -1) return;
    setActiveId(gid);
    setIdx(0);
    setDir(target > gIdx ? 1 : -1);
  };

  const jumpToIndex = (gid: string, index: number) => {
    const target = groups.findIndex((g) => g.id === gid);
    if (target === -1) return;
    const max = groups[target].slides.length - 1;
    const i = Math.max(0, Math.min(index, max));
    if (gid === activeId) {
      setDir(i > safeIdx ? 1 : -1);
      setIdx(i);
    } else {
      setActiveId(gid);
      setIdx(i);
      setDir(i > safeIdx ? 1 : -1);
    }
  };

  const goTo = (n: number) => {
    const i = Math.max(0, Math.min(n, slides.length - 1));
    if (i === safeIdx) return;
    setDir(i > safeIdx ? 1 : -1);
    setIdx(i);
  };

  const goNext = () => {
    if (safeIdx < slides.length - 1) {
      goTo(safeIdx + 1);
    } else if (gIdx < groups.length - 1) {
      const nextGroup = groups[gIdx + 1];
      setActiveId(nextGroup.id);
      setIdx(0);
      setDir(1);
    }
  };

  const goPrev = () => {
    if (safeIdx > 0) {
      goTo(safeIdx - 1);
    } else if (gIdx > 0) {
      const prevGroup = groups[gIdx - 1];
      setActiveId(prevGroup.id);
      setIdx(prevGroup.slides.length - 1);
      setDir(-1);
    }
  };

  const toggleDone = (id: string) => {
    setDone((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const resetDay = () => {
    setDone((prev) => {
      const ids = new Set(dataSlides.map((s) => s.id));
      const next = new Set(prev);
      ids.forEach((id) => next.delete(id));
      return next;
    });
  };

  const resetAll = () => setDone(new Set());

  /* keyboard navigation */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) {
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  /* swipe navigation */
  const touch = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    const t0 = e.touches[0];
    touch.current = { x: t0.clientX, y: t0.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touch.current;
    touch.current = null;
    if (!start) return;
    const t0 = e.changedTouches[0];
    const dx = t0.clientX - start.x;
    const dy = t0.clientY - start.y;
    if (Math.abs(dx) > 56 && Math.abs(dx) > Math.abs(dy) * 1.2) {
      if (dx < 0) goNext();
      else goPrev();
    }
  };

  const hasExercises = dataSlides.length > 0;
  const progress = hasExercises ? (doneInGroup / dataSlides.length) * 100 : 0;

  return (
    <div className="flex h-dvh min-h-dvh flex-col bg-background text-foreground">
      {/* ---------- top bar ---------- */}
      <header className="z-30 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-12 w-full max-w-6xl items-center gap-3 px-3 sm:px-5">
          <Link
            to="/"
            className="group flex items-center gap-2 rounded-full outline-offset-4"
            aria-label="Back to program overview"
          >
            <span className="flex items-center">
              <span className="size-2.5 rounded-full bg-pine transition group-hover:scale-110" />
              <span className="-ml-1 size-2.5 rounded-full bg-ember transition group-hover:scale-110" />
            </span>
            <span className="font-display text-[0.95rem] font-bold tracking-tight text-foreground">
              posture<span className="text-ember">+</span>TRX
            </span>
            <span className="hidden text-xs font-medium text-muted-foreground sm:inline">
              12-month deck
            </span>
          </Link>

          <div className="ml-auto flex items-center gap-2">
            <span className="hidden items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground lg:inline-flex">
              <ChevronLeft className="size-3" /> arrows <ChevronRight className="size-3" /> swipe to move
            </span>
            <Link
              to="/"
              className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition hover:text-foreground"
              aria-label="Back to program overview"
            >
              <Home className="size-4" />
            </Link>
          </div>
        </div>

        {/* ---------- day-jump tabs ---------- */}
        <nav
          className="border-t border-border/60"
          aria-label="Jump to a day's routine"
        >
          <div className="no-scrollbar mx-auto flex w-full max-w-6xl items-center gap-1.5 overflow-x-auto px-3 py-2 sm:gap-2 sm:px-5">
            {groups.map((g) => {
              const isActive = g.id === activeId;
              const total = g.slides.filter((s) => s.kind !== "info").length;
              const d = g.slides.filter((s) => s.kind !== "info" && done.has(s.id)).length;
              const doneAll = total > 0 && d === total;
              const a = ACCENTS[g.phase];
              return (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => jumpGroup(g.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={`inline-flex h-10 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-3.5 text-[0.82rem] font-semibold transition active:scale-95 ${
                    isActive
                      ? `${a.solid} border-transparent shadow-sm`
                      : "border-border bg-card text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                  }`}
                >
                  <span
                    className={`size-1.5 rounded-full ${isActive ? "bg-current opacity-70" : a.dot}`}
                  />
                  {g.label}
                  {total > 0 && (
                    <span
                      className={`rounded-full px-1.5 py-0.5 text-[0.62rem] font-bold tabular-nums ${
                        isActive
                          ? "bg-background/25 text-current"
                          : doneAll
                            ? "bg-pine-soft text-pine-deep"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {doneAll ? "all done" : `${d}/${total}`}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </nav>
      </header>

      {/* ---------- slide area ---------- */}
      <main
        ref={mainRef}
        className="flex-1 overflow-y-auto overscroll-contain"
        style={{ touchAction: "pan-y" }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="mx-auto w-full max-w-6xl px-4 pb-16 pt-6 sm:px-6 sm:pt-10">
          <AnimatePresence mode="wait" initial={false} custom={dir}>
            <motion.div
              key={`${group.id}-${safeIdx}`}
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.24, ease: "easeOut" }}
            >
              <SlideContent
                slide={slide}
                group={group}
                number={positionNumber}
                total={positionTotal}
                isDone={!isInfo && done.has(slide.id)}
                onJump={jumpGroup}
                onJumpToIndex={jumpToIndex}
                hasDone={done.size > 0}
                onResetAll={resetAll}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* ---------- bottom controls ---------- */}
      <footer
        className="z-30 border-t border-border bg-background/90 backdrop-blur"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        {hasExercises && (
          <div className="mx-auto w-full max-w-6xl px-3 pt-2 sm:px-5">
            <div className="flex items-center justify-between gap-3 text-[0.66rem] font-bold uppercase tracking-[0.16em] text-muted-foreground">
              <span className="truncate">{group.days}</span>
              <span className="flex shrink-0 items-center gap-3">
                {doneInGroup > 0 && (
                  <button
                    type="button"
                    onClick={resetDay}
                    className="inline-flex items-center gap-1 rounded-full text-muted-foreground transition hover:text-foreground"
                  >
                    <RotateCcw className="size-3" />
                    Reset day
                  </button>
                )}
                <span className="tabular-nums">
                  {doneInGroup}/{dataSlides.length} done
                </span>
              </span>
            </div>
            <div
              className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted"
              role="progressbar"
              aria-valuenow={doneInGroup}
              aria-valuemin={0}
              aria-valuemax={dataSlides.length}
              aria-label={`${doneInGroup} of ${dataSlides.length} exercises done`}
            >
              <div
                className={`h-full rounded-full transition-all duration-500 ${FILL[group.phase]}`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="mx-auto grid w-full max-w-6xl grid-cols-[auto_1fr_auto] items-center gap-2 px-3 py-2.5 sm:gap-3 sm:px-5">
          <button
            type="button"
            onClick={goPrev}
            disabled={gIdx === 0 && safeIdx === 0}
            aria-label="Previous slide"
            className="inline-flex h-13 min-h-13 items-center gap-1.5 rounded-2xl border-2 border-border bg-card px-3.5 text-sm font-bold text-foreground transition enabled:hover:border-foreground/50 enabled:active:scale-95 disabled:opacity-30 sm:h-14 sm:min-h-14 sm:px-5"
          >
            <ChevronLeft className="size-5" strokeWidth={2.5} />
            <span className="hidden md:inline">Prev</span>
          </button>

          <div className="flex justify-center">
            {!isInfo ? (
              <button
                type="button"
                onClick={() => toggleDone(slide.id)}
                aria-pressed={!isInfo && done.has(slide.id)}
                aria-label={
                  done.has(slide.id)
                    ? "Mark exercise as not done"
                    : "Mark exercise as done"
                }
                className={`inline-flex h-13 min-h-13 w-full max-w-72 items-center justify-center gap-2.5 rounded-2xl px-6 text-[0.98rem] font-bold transition active:scale-[0.97] sm:h-14 sm:min-h-14 ${
                  done.has(slide.id)
                    ? `${accent.solid} shadow-sm`
                    : "border-2 border-foreground/25 bg-card text-foreground hover:border-foreground/60"
                }`}
              >
                {done.has(slide.id) ? (
                  <>
                    <CheckCircle2 className="size-5" strokeWidth={2.4} />
                    {groupAllDone ? "Day complete!" : "Done — nice"}
                  </>
                ) : (
                  <>
                    <span
                      className={`grid size-5 place-items-center rounded-full border-2 border-foreground/25 ${accent.mid}`}
                    >
                      <Check className="size-3" strokeWidth={3.2} />
                    </span>
                    Mark done
                  </>
                )}
              </button>
            ) : (
              <span className="inline-flex h-13 min-h-13 items-center rounded-2xl px-6 font-display text-sm font-semibold text-muted-foreground sm:h-14 sm:min-h-14">
                Slide {positionNumber} of {positionTotal}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={goNext}
            disabled={gIdx === groups.length - 1 && safeIdx === slides.length - 1}
            aria-label="Next slide"
            className="inline-flex h-13 min-h-13 items-center gap-1.5 rounded-2xl border-2 border-border bg-card px-3.5 text-sm font-bold text-foreground transition enabled:hover:border-foreground/50 enabled:active:scale-95 disabled:opacity-30 sm:h-14 sm:min-h-14 sm:px-5"
          >
            <span className="hidden md:inline">
              {safeIdx === slides.length - 1 && gIdx < groups.length - 1
                ? `Next: ${groups[gIdx + 1].short}`
                : "Next"}
            </span>
            <ChevronRight className="size-5" strokeWidth={2.5} />
          </button>
        </div>
      </footer>
    </div>
  );
}
