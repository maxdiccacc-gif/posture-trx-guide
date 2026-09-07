/**
 * posture-trx program data
 * ------------------------------------------------------------------
 * Every routine item is one object with the same shape (name, day,
 * sets, reps, hold, instructions, gifUrl, youtubeUrl, ...). To swap in
 * real media later, just fill in `gifUrl` — the deck automatically
 * renders the image instead of the styled placeholder, and each slide
 * always shows a working YouTube link (currently a live search query
 * per exercise, which can be replaced with a curated video URL).
 *
 * Content rules baked into the copy below: posture & conditioning
 * only — no diet, no supplements, no height claims.
 */

export type PhaseKey = "info" | "habits" | "p1" | "p2";
export type SlideKind = "exercise" | "habit" | "info";

export interface Slide {
  /** stable id used for check-off state + animations */
  id: string;
  kind: SlideKind;
  name: string;
  /** which routine/day this belongs to (shown as a chip on the slide) */
  day: string;
  /** sets value shown in the dosage card, e.g. "4" or "20 reps = 1 set" */
  sets?: string;
  /** reps value shown in the dosage card, e.g. "18 (each leg)" */
  reps?: string;
  /** hold value shown in the dosage card, e.g. "10s at the top" */
  hold?: string;
  /** habits-only: when the habit applies */
  cadence?: string;
  /** habits-only: short context line */
  focus?: string;
  /** short gear note when the exercise needs something specific */
  gear?: string;
  /** plain-English how-to, 2–4 sentences */
  instructions?: string;
  /** small callout that renders under the how-to */
  note?: string;
  /** bullet list for "info" slides */
  bullets?: string[];
  /** nav chips (label → group id) rendered on phase/setup slides */
  quick?: { label: string; target: string }[];
  /** drop a direct GIF/MP4 URL in here when you have one; null = placeholder */
  gifUrl?: string | null;
  /** guaranteed-working YouTube link; swap for a curated video later */
  youtubeUrl?: string;
}

export interface Group {
  id: string;
  /** full label on the tab chip */
  label: string;
  /** ultra short label (used on small screens + buttons) */
  short: string;
  phase: PhaseKey;
  kicker: string;
  days: string;
  slides: Slide[];
}

/* ---------------------------- helpers ---------------------------- */

function youtubeFor(name: string): string {
  const q = `"${name} tutorial"`;
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;
}

/* ------------------------ overview group ------------------------- */

const overviewSlides: Slide[] = [
  {
    id: "cover",
    kind: "info",
    name: "Posture & TRX",
    day: "12-month home program",
    instructions:
      "A six-days-a-week posture-correction and conditioning program you run at home, on the floor and on a TRX-style suspension trainer. Phase 1 (months 1–6) is corrective mat work: daily posture habits plus three rotating floor routines. Phase 2 (months 7–12) moves the same weekly rhythm onto a TRX suspension circuit. It is posture and conditioning — full stop — not treatment.",
    note:
      "This is a general posture and mobility/strength program, not medical treatment. If any movement causes sharp or worsening pain, stop and check with a physiotherapist. Go by feel — these are guidelines, not requirements to push through pain.",
    quick: [
      { label: "Daily posture habits", target: "habits" },
      { label: "Day 1 & 3 routine", target: "d13" },
      { label: "Day 2 & 4 routine", target: "d24" },
      { label: "Day 5 & 6 routine", target: "d56" },
      { label: "TRX – T1 circuit", target: "t1" },
      { label: "TRX – T2 circuit", target: "t2" },
    ],
  },
  {
    id: "schedule",
    kind: "info",
    name: "The weekly rhythm",
    day: "How the 12 months are built",
    instructions:
      "Posture habits apply every day, in both phases. Phase 1 uses the Day 1 & 3, Day 2 & 4, and Day 5 & 6 mat routines; Phase 2 replaces them with the TRX T1 and T2 circuits. Friday is always a rest day.",
    bullets: [
      "Phase 1 (months 1–6) — mat + light dumbbells, no other equipment.",
      "Phase 2 (months 7–12) — same weekly pattern on a TRX suspension trainer anchored overhead.",
      "Every routine below is shown as its own tab — jump straight to today.",
      "Mark exercises off as you finish them; progress saves on this device.",
    ],
  },
  {
    id: "p1-landing",
    kind: "info",
    name: "Phase 1 — corrective floor work",
    day: "Months 1–6 · mat routines",
    instructions:
      "Six months of slow, controlled posture-corrective work: shoulder retraction, glute bridges, clamshells, rotational stretches, and gentle chest lifts. Most days are ten to twenty minutes on a mat.",
    gear: "A mat, a small pillow or rolled towel, a chair or bed edge, and light dumbbells for one move.",
    bullets: [
      "Move slowly and gently — these are corrective drills, not max-effort lifts.",
      "Hold times matter as much as reps: pause where the routine says to pause.",
      "Alternate sides evenly on every single-sided exercise.",
      "Phase 1 needs no suspension trainer — a quiet floor is enough.",
    ],
    note: "Posture habits run every day underneath this phase.",
    quick: [
      { label: "Day 1 & 3 — Sat & Mon", target: "d13" },
      { label: "Day 2 & 4 — Sun & Tue", target: "d24" },
      { label: "Day 5 & 6 — Wed & Thu", target: "d56" },
    ],
  },
  {
    id: "p2-landing",
    kind: "info",
    name: "Phase 2 — TRX circuit",
    day: "Months 7–12 · suspension training",
    instructions:
      "The same weekly rhythm, now on a TRX-style suspension trainer anchored securely overhead — a door anchor or a bar/beam rated for bodyweight training. Rows, presses, planks, bridges, and squats against the straps build on the base the mat work created.",
    gear: "A TRX-style suspension trainer with an overhead anchor (door anchor or rated bar/beam).",
    bullets: [
      "T1 runs Sunday & Tuesday; T2 runs Saturday, Monday & Thursday.",
      "Check the anchor is secure before every set — no straps over unrated hooks.",
      "Keep tension on the straps the whole time; no slack, no bounce.",
      "Start each move with a short lean-back test before full reps.",
    ],
    note:
      "Wednesday isn't covered in the original TRX material — treat it as a rest day, or repeat T1 or T2.",
    quick: [
      { label: "TRX – T1 circuit", target: "t1" },
      { label: "TRX – T2 circuit", target: "t2" },
    ],
  },
];

/* ------------------------ daily posture habits ------------------- */

const habitSlides: Slide[] = [
  {
    id: "h1",
    kind: "habit",
    name: "Sitting in a chair",
    day: "Every day",
    cadence: "Every long sit — desk, meals, screens",
    focus: "Chair sitting",
    instructions:
      "Sit all the way back so your back is fully supported. Keep your feet flat on the floor. If there's a gap between your lower back and the chair, fill it with a small cushion.",
  },
  {
    id: "h2",
    kind: "habit",
    name: "Sitting in the car",
    day: "Every day",
    cadence: "Every drive",
    focus: "Driving posture",
    instructions:
      "Sit fully back against the seat with the headrest close behind your head — not tilted forward toward the wheel. Re-check after you adjust the mirrors.",
  },
  {
    id: "h3",
    kind: "habit",
    name: "Sleeping position",
    day: "Every day",
    cadence: "Every night",
    focus: "Sleeping posture",
    instructions:
      "Best is on your back with a pillow under your knees. If you sleep on your side, keep a pillow between your knees. If you sleep on your stomach, put a pillow under your stomach.",
  },
  {
    id: "h4",
    kind: "habit",
    name: "Standing for long periods",
    day: "Every day",
    cadence: "Dishes, ironing, cooking, queues",
    focus: "Standing posture",
    instructions:
      "Rest one foot up on a low step, stool, or similar instead of standing flat on both. Alternate feet periodically so you never lock one side.",
  },
  {
    id: "h5",
    kind: "habit",
    name: "Carrying or lifting things",
    day: "Every day",
    cadence: "Any load — including a child",
    focus: "Lifting technique",
    instructions:
      "Bend at the knees, not the back, and keep whatever you're lifting close to your body. That's the whole cue — hinge with the legs and hold the load tight to your chest.",
  },
  {
    id: "h6",
    kind: "habit",
    name: "Ironing",
    day: "Every day",
    cadence: "Whenever you iron",
    focus: "Standing at the board",
    instructions:
      "Same as the standing tip: alternate one foot up on a low step or stool so your lower back isn't loaded flat for the whole session. Switch feet every few minutes.",
  },
];

/* --------------------- Phase 1 · Day 1 & 3 ------------------------ */

const day13Slides: Slide[] = [
  {
    id: "d13-1",
    kind: "exercise",
    name: "Supine Alternating Leg Extension",
    day: "Day 1 & 3 · Sat & Mon",
    sets: "4",
    reps: "18 (each leg)",
    instructions:
      "Lie on your back, hands on the floor at your sides, knees bent halfway up. Extend one leg straight out and back in, then repeat with the other. Each single-leg motion counts as one rep.",
  },
  {
    id: "d13-2",
    kind: "exercise",
    name: "Prone Shoulder Retraction (Press-Up)",
    day: "Day 1 & 3 · Sat & Mon",
    sets: "6",
    reps: "12",
    hold: "slow & gentle",
    gear: "rolled towel or small pillow under the forehead",
    instructions:
      "Lie face down with a rolled towel or small pillow under your forehead, hands on the floor. Slowly draw your shoulder blades back and down, then release. Move slowly and gently — it's a tiny, precise motion.",
  },
  {
    id: "d13-3",
    kind: "exercise",
    name: "Side-Lying Rotational Reach",
    day: "Day 1 & 3 · Sat & Mon",
    sets: "7",
    reps: "20 (alternate sides)",
    gear: "medium pillow under the head",
    instructions:
      "Lie on your side with a medium-thickness pillow under your head, knees bent and stacked. Extend both arms straight in front of you, then sweep the top arm up and over in an arc, letting your head and neck follow the movement, then return. Alternate sides across sets.",
  },
  {
    id: "d13-4",
    kind: "exercise",
    name: "Side-Lying Clamshell",
    day: "Day 1 & 3 · Sat & Mon",
    sets: "4",
    reps: "20 per side",
    hold: "10s at the top",
    instructions:
      "Lie on your side, knees bent, one arm supporting your head. Open your top knee upward like a clamshell and pause 10 seconds at the top before lowering. Do equal sets on both sides.",
  },
  {
    id: "d13-5",
    kind: "exercise",
    name: "Glute Bridge with Alternating Knee Cross",
    day: "Day 1 & 3 · Sat & Mon",
    sets: "6",
    reps: "20",
    hold: "5s per knee cross",
    instructions:
      "Lie on your back, knees bent, and lift your hips into a bridge. Bring one knee across toward the opposite knee, hold 5 seconds, return, then alternate legs.",
  },
  {
    id: "d13-6",
    kind: "exercise",
    name: "Glute Bridge with Heel Raises",
    day: "Day 1 & 3 · Sat & Mon",
    sets: "5",
    reps: "20",
    instructions:
      "Hold a glute bridge position with your hands resting on your stomach. Alternate lifting one heel and then the other off the floor without letting your hips drop.",
  },
  {
    id: "d13-7",
    kind: "exercise",
    name: "Supine Rotational Stretch (Windshield Wiper)",
    day: "Day 1 & 3 · Sat & Mon",
    sets: "5",
    reps: "18 (each side)",
    hold: "10s per side",
    gear: "pillow under the head",
    instructions:
      "Lie on your back with a pillow under your head, knees bent and together, ankles together, arms out to the sides. Let your knees fall gently to one side while turning your head to the opposite side. Hold 10 seconds, return, and alternate sides.",
  },
];

/* --------------------- Phase 1 · Day 2 & 4 ------------------------ */

const day24Slides: Slide[] = [
  {
    id: "d24-1",
    kind: "exercise",
    name: "Standing Hamstring/Calf Stretch (with towel)",
    day: "Day 2 & 4 · Sun & Tue",
    sets: "5",
    reps: "18 per leg",
    hold: "at end range",
    gear: "a towel or band",
    instructions:
      "Loop a towel around one foot, one hand on the shin and one hand near the toes, and pull gently into a stretch. You should feel it in the glutes, back of the thigh, calf, and lower back. Hold at end range, then switch legs.",
  },
  {
    id: "d24-2",
    kind: "exercise",
    name: "Dumbbell Romanian Deadlift",
    day: "Day 2 & 4 · Sun & Tue",
    sets: "3",
    reps: "12",
    gear: "a light dumbbell in each hand",
    note: "The original file didn't specify reps — with light dumbbells, 3 sets of 12 is a good starting dose.",
    instructions:
      "Stand tall holding a dumbbell in each hand at your sides, spine neutral. Bend your knees slightly and hinge forward, lowering the dumbbells toward knee height with a flat back, pause, then return to standing. Keeping the back flat on the way down is the key cue.",
  },
  {
    id: "d24-3",
    kind: "exercise",
    name: "Quadruped Reach (Bird-Dog style)",
    day: "Day 2 & 4 · Sun & Tue",
    sets: "4",
    reps: "15 per arm",
    hold: "brief hold per rep",
    instructions:
      "On hands and knees with your hips slightly back, plant one hand on the floor and extend the opposite arm forward across your chest and then out to the side. Let your head and neck follow your hand.",
  },
  {
    id: "d24-4",
    kind: "exercise",
    name: "Active Straight-Leg Raise with Band",
    day: "Day 2 & 4 · Sun & Tue",
    sets: "4–5",
    reps: "15–18 per side",
    gear: "a towel or resistance band",
    instructions:
      "Lie on your back and raise one leg to 90 degrees, looping a towel or band around the sole of that foot and gently pulling it toward you. Keep your head, lower back, and the heel of your grounded leg flat on the floor throughout. Do both sides.",
  },
  {
    id: "d24-5",
    kind: "exercise",
    name: "Standing Hip/Side-Leg Raise",
    day: "Day 2 & 4 · Sun & Tue",
    sets: "1",
    reps: "20 per side",
    hold: "brief hold at the top",
    note: "Per the original file, 20 reps count as one set — repeat for as many sets as feel right.",
    instructions:
      "Standing, place two fingers of one hand on your hip and the other hand on your lower back for reference. Raise the leg on the side of the lowered hand out to the side and hold briefly at the top. Your lower back doesn't need to stay perfectly straight for this one.",
  },
  {
    id: "d24-6",
    kind: "exercise",
    name: "Glute Bridge with Alternating Knee Cross",
    day: "Day 2 & 4 · Sun & Tue",
    sets: "6",
    reps: "20",
    hold: "5s per knee cross",
    instructions:
      "Same movement as the Day 1 & 3 version — bridge up, bring one knee across toward the opposite knee, hold 5 seconds, then alternate. Keep the hips high and even the whole time.",
  },
];

/* --------------------- Phase 1 · Day 5 & 6 ------------------------ */

const day56Slides: Slide[] = [
  {
    id: "d56-1",
    kind: "exercise",
    name: "Prone Press-Up (Chest Lift)",
    day: "Day 5 & 6 · Wed & Thu",
    sets: "5",
    reps: "15",
    hold: "10s at the top",
    instructions:
      "Lie face down with your hands positioned to help lift your chest up and forward while your hips stay down — like a gentle cobra stretch. Hold 10 seconds at the top, lower, and repeat.",
  },
  {
    id: "d56-2",
    kind: "exercise",
    name: "Forearm Plank Hold (Downward-Dog style)",
    day: "Day 5 & 6 · Wed & Thu",
    sets: "4",
    reps: "18",
    hold: "10s per rep",
    instructions:
      "From the floor, form a triangle shape with your body like a downward dog — forearms straight and weight on your toes. Your heels should not lift further off the floor and your weight stays on your toes throughout. Hold 10 seconds per rep.",
  },
  {
    id: "d56-3",
    kind: "exercise",
    name: "Seated Forward Walk-Out Stretch (Child's-Pose style)",
    day: "Day 5 & 6 · Wed & Thu",
    sets: "6",
    reps: "12",
    hold: "10s at full reach",
    instructions:
      "Sitting on the floor, walk your hands forward as far as you can, letting your head and chest follow down toward the floor. Hold 10 seconds, then walk back up.",
  },
  {
    id: "d56-4",
    kind: "exercise",
    name: "Prone Extension, Arms at Sides",
    day: "Day 5 & 6 · Wed & Thu",
    sets: "5",
    reps: "10",
    hold: "10s per lift",
    instructions:
      "Lie face down with your arms straight alongside your body — not bent at the elbows. Lift your head and chest gently off the floor, hold 10 seconds, lower, and repeat.",
  },
  {
    id: "d56-5",
    kind: "exercise",
    name: "Supine Leg Raise with Knee Hug (Toe-Touch Crunch)",
    day: "Day 5 & 6 · Wed & Thu",
    sets: "5",
    reps: "15",
    hold: "10s behind the knees",
    instructions:
      "Lying on your back, raise both legs straight up to 90 degrees, then curl your head and shoulders off the floor and hold behind your knees with both hands. Hold 10 seconds, lower with control.",
  },
  {
    id: "d56-6",
    kind: "exercise",
    name: "Crunch, Feet Elevated",
    day: "Day 5 & 6 · Wed & Thu",
    sets: "6",
    reps: "17",
    hold: "3s at the top",
    gear: "a stability ball or chair/bed edge",
    instructions:
      "Lie on your back with your feet up on a stability ball or the edge of a chair or bed, hands behind your head. Curl up squeezing your abs, hold 3 seconds at the top, and lower slowly.",
  },
  {
    id: "d56-7",
    kind: "exercise",
    name: "Glute Bridge, Hands Supporting Lower Back",
    day: "Day 5 & 6 · Wed & Thu",
    sets: "6",
    reps: "15",
    hold: "10s per bridge",
    instructions:
      "Lie on your back, bend your knees, and lift your hips into a bridge while supporting your lower back with your hands, shoulder-stand style, with your head flat on the floor. Hold 10 seconds, lower, repeat.",
  },
];

/* --------------------- Phase 2 · TRX T1 (Sun & Tue) -------------- */

const trxSetupT1: Slide = {
  id: "t1-setup",
  kind: "info",
  name: "TRX – T1 · setup & the 15 moves",
  day: "Phase 2 · Sun & Tue",
  gear: "TRX-style suspension trainer anchored securely overhead (door anchor or rated bar/beam).",
  instructions:
    "T1 is the push-and-squat flavour of the TRX phase: presses, rows, squats and leans against the straps. Walk through the numbered moves in order, then repeat for the prescribed sets.",
  bullets: [
    "Routine order is the numbered index below — tap a number to jump straight to that move.",
    "Alternate stances/sides evenly wherever the slide says so.",
    "No slack in the straps: tension is what makes the move work.",
  ],
  note: "Wednesday isn't covered in the original TRX material — treat it as a rest day, or repeat T1 or T2.",
};

const trxT1Slides: Slide[] = [
  {
    id: "t1-1",
    kind: "exercise",
    name: "TRX Split-Stance Chest Press",
    day: "TRX · T1 — Sun & Tue",
    sets: "4",
    reps: "20",
    hold: "10s in the lean-back",
    instructions:
      "Facing the anchor, stand with one leg forward and one leg back in a lunge stance, arms extended gripping the handles. Press and lean slightly back with your arms fully open, hold 10 seconds, and return. Alternate which leg is forward across sets.",
  },
  {
    id: "t1-2",
    kind: "exercise",
    name: "TRX Supine Hip Bridge / Hamstring Curl",
    day: "TRX · T1 — Sun & Tue",
    sets: "5",
    reps: "10",
    hold: "10s curled in",
    instructions:
      "Lying on your back with your heels in the foot cradles, lift your hips into a bridge. Curl your heels in toward your glutes, hold 10 seconds, then extend back out.",
  },
  {
    id: "t1-3",
    kind: "exercise",
    name: "TRX Single-Leg Row-to-Lunge",
    day: "TRX · T1 — Sun & Tue",
    sets: "7",
    reps: "35 per leg",
    hold: "continuous",
    instructions:
      "Standing on one leg facing the anchor, pull into a row while the other leg drives forward, then extend back into a rear lunge. Alternate without pausing — one continuous, flowing rep after another.",
  },
  {
    id: "t1-4",
    kind: "exercise",
    name: "TRX Standing Row",
    day: "TRX · T1 — Sun & Tue",
    sets: "5",
    reps: "7",
    hold: "15s at the top",
    instructions:
      "Lean back holding the handles with your body straight, then pull yourself up toward the anchor point. Hold 15 seconds at the top, then lower back down with control.",
  },
  {
    id: "t1-5",
    kind: "exercise",
    name: "TRX Overhead Squat",
    day: "TRX · T1 — Sun & Tue",
    sets: "10",
    reps: "10",
    hold: "10s at the bottom",
    instructions:
      "With your arms extended straight overhead holding the handles, squat down while keeping your arms locked out above you. Hold 10 seconds at the bottom, then stand back up.",
  },
  {
    id: "t1-6",
    kind: "exercise",
    name: "TRX Squat with Row/Reach",
    day: "TRX · T1 — Sun & Tue",
    sets: "10",
    reps: "10",
    hold: "10s at the bottom",
    instructions:
      "Hold the strap taut in front of you, squat down while keeping tension on the strap, then drive up and pull/reach forward in one motion. Hold 10 seconds at the bottom of each squat.",
  },
  {
    id: "t1-7",
    kind: "exercise",
    name: "TRX Single-Arm Squat Row",
    day: "TRX · T1 — Sun & Tue",
    sets: "10",
    reps: "5 per hand",
    hold: "10s at the bottom",
    instructions:
      "Same squat-and-pull pattern as the two-arm version, but performed one arm at a time. Squat with tension on the strap, drive up, and row with the working arm. Alternate hands across sets.",
  },
  {
    id: "t1-8",
    kind: "exercise",
    name: "TRX Standing Overhead Lean (Y-Raise)",
    day: "TRX · T1 — Sun & Tue",
    sets: "10",
    reps: "15",
    hold: "15s in the Y",
    instructions:
      "Arms extended forward and up holding the handles, lean your whole body back and slightly away from the anchor so you form a Y shape. Hold 15 seconds, then return to standing.",
  },
  {
    id: "t1-9",
    kind: "exercise",
    name: "TRX Lunge/Split-Stance Move",
    day: "TRX · T1 — Sun & Tue",
    sets: "6",
    reps: "20 per side",
    hold: "continuous",
    note: "Heads-up: the original program's reference photo for this one was a mismatched stock image of an unrelated kettlebell exercise — treat this as a general TRX-assisted lunge and follow the tutorial rather than the old photo.",
    instructions:
      "A TRX-assisted lunge: use the straps for light support and sink into a deep split-stance lunge, then drive back up. Alternate sides continuously without pausing.",
  },
  {
    id: "t1-10",
    kind: "exercise",
    name: "TRX Standing Chest Fly",
    day: "TRX · T1 — Sun & Tue",
    sets: "5",
    reps: "7",
    hold: "20s in the lean-back",
    instructions:
      "Arms out to your sides at chest height holding the handles. Lean back with your body straight, hold 20 seconds with the arms wide, then return.",
  },
  {
    id: "t1-11",
    kind: "exercise",
    name: "TRX Plank Hold",
    day: "TRX · T1 — Sun & Tue",
    sets: "4",
    reps: "18",
    hold: "5s per rep",
    instructions:
      "Feet in the foot cradles, hands on the floor in a plank position. Hold the plank 5 seconds per rep, keeping your body one straight line.",
  },
  {
    id: "t1-12",
    kind: "exercise",
    name: "TRX Hamstring Curl (Knee Tuck)",
    day: "TRX · T1 — Sun & Tue",
    sets: "6",
    reps: "8",
    hold: "15s tucked",
    instructions:
      "Feet in the cradles with your hips lifted, curl your knees in toward your chest. Hold 15 seconds in the tucked position, then extend back out.",
  },
  {
    id: "t1-13",
    kind: "exercise",
    name: "TRX Inverted Row",
    day: "TRX · T1 — Sun & Tue",
    sets: "4",
    reps: "9",
    hold: "15s at the top",
    instructions:
      "Body angled back with your arms straight, holding the handles, pull your chest up toward your hands. Hold 15 seconds at the top, then lower with control.",
  },
  {
    id: "t1-14",
    kind: "exercise",
    name: "TRX Rotational Chest Press (Punch)",
    day: "TRX · T1 — Sun & Tue",
    sets: "5",
    reps: "7 per hand",
    hold: "15s at full extension",
    instructions:
      "Standing, punch one arm across your body toward the anchor with a slight rotation. Hold 15 seconds at full extension, return, and switch hands.",
  },
  {
    id: "t1-15",
    kind: "exercise",
    name: "TRX Single-Arm Lateral Lean",
    day: "TRX · T1 — Sun & Tue",
    sets: "6",
    reps: "18 per hand",
    hold: "10s per lean",
    instructions:
      "With one arm extended out to the side holding the handle, lean your body away from the anchor. Hold 10 seconds per lean, return, and switch arms.",
  },
];

/* ------------------- Phase 2 · TRX T2 (Sat, Mon & Thu) ----------- */

const trxSetupT2: Slide = {
  id: "t2-setup",
  kind: "info",
  name: "TRX – T2 · setup & the 18 moves",
  day: "Phase 2 · Sat, Mon & Thu",
  gear: "TRX-style suspension trainer anchored securely overhead (door anchor or rated bar/beam).",
  instructions:
    "T2 is the core-and-floor flavour of the TRX phase: suspended planks, push-ups, bridges, and knee tucks, plus the longer combo flows. Walk through the numbered moves in order, then repeat for the prescribed sets.",
  bullets: [
    "Routine order is the numbered index below — tap a number to jump straight to that move.",
    "Alternate sides evenly wherever the slide says so.",
    "The combo moves count as one rep only when every position is completed.",
  ],
  note: "Wednesday isn't covered in the original TRX material — treat it as a rest day, or repeat T1 or T2.",
};

const trxT2Slides: Slide[] = [
  {
    id: "t2-1",
    kind: "exercise",
    name: "TRX Suspended Hip Bridge (Arms Wide)",
    day: "TRX · T2 — Sat, Mon & Thu",
    sets: "7",
    reps: "10",
    hold: "10s per bridge",
    instructions:
      "Feet hooked in the straps, shoulders on the floor, arms open wide to the sides. Lift your hips into a bridge, hold 10 seconds, and lower with control.",
  },
  {
    id: "t2-2",
    kind: "exercise",
    name: "TRX Side Plank with Reach",
    day: "TRX · T2 — Sat, Mon & Thu",
    sets: "4",
    reps: "14 per side",
    hold: "10s in the rotation",
    instructions:
      "Feet in the straps with one hand as your base on the floor, sweep the other arm up into a side-plank rotation. Hold 10 seconds in the rotation, return, and repeat on both sides.",
  },
  {
    id: "t2-3",
    kind: "exercise",
    name: "TRX Suspended Push-Up",
    day: "TRX · T2 — Sat, Mon & Thu",
    sets: "4",
    reps: "8",
    hold: "10s at the bottom",
    instructions:
      "Feet in the foot cradles, hands on the floor. Lower slowly into a push-up, hold 10 seconds at the bottom, then press back up.",
  },
  {
    id: "t2-4",
    kind: "exercise",
    name: "TRX Plank Fly (Single-Arm)",
    day: "TRX · T2 — Sat, Mon & Thu",
    sets: "4",
    reps: "12 per hand",
    hold: "5s + 5s per rep",
    instructions:
      "Hands in the handles, toes on the floor, body straight with both elbows bent — hold 5 seconds. Fully extend one arm out to the side, hold 5 seconds, return, and alternate arms.",
  },
  {
    id: "t2-5",
    kind: "exercise",
    name: "TRX Standing Single-Arm Lean",
    day: "TRX · T2 — Sat, Mon & Thu",
    sets: "4",
    reps: "18 per hand",
    hold: "10s per lean",
    instructions:
      "One hand in the handle, the other hand resting on your hip. Lean back into an open-arm position, hold 10 seconds, and return. Switch arms between sets.",
  },
  {
    id: "t2-6",
    kind: "exercise",
    name: "TRX Standing Tricep Press",
    day: "TRX · T2 — Sat, Mon & Thu",
    sets: "7",
    reps: "12",
    hold: "10s at full extension",
    instructions:
      "Facing away from the anchor, lean forward with your elbows bent. Press down and back to extend your arms, hold 10 seconds at full extension, then return.",
  },
  {
    id: "t2-7",
    kind: "exercise",
    name: "TRX Reverse Plank Knee Tuck",
    day: "TRX · T2 — Sat, Mon & Thu",
    sets: "6",
    reps: "12 per leg",
    hold: "7s per tuck",
    instructions:
      "Hands on the floor behind you, arms straight, heels in the straps, body in a reverse-plank line. Tuck one knee toward your chest, hold 7 seconds, and extend back out. Alternate legs.",
  },
  {
    id: "t2-8",
    kind: "exercise",
    name: "TRX Standing Bicep Curl / Alternating Reach",
    day: "TRX · T2 — Sat, Mon & Thu",
    sets: "4",
    reps: "10 per hand",
    hold: "10s per position",
    instructions:
      "One hand low and one hand reaching up overhead, hold 10 seconds, then alternate arm positions — a slow, controlled curl-and-reach rhythm against the straps.",
  },
  {
    id: "t2-9",
    kind: "exercise",
    name: "TRX Row-to-Squat Combo (3 positions)",
    day: "TRX · T2 — Sat, Mon & Thu",
    sets: "5",
    reps: "10 (3-part combo)",
    hold: "~5s per position",
    instructions:
      "A three-part combo that counts as one rep: lean back into a row (hold about 5 seconds), sit back into a squat (hold about 5 seconds), then stand tall pulling the handles to your chest (hold about 5 seconds).",
  },
  {
    id: "t2-10",
    kind: "exercise",
    name: "TRX Plank Knee Tuck (Oblique)",
    day: "TRX · T2 — Sat, Mon & Thu",
    sets: "4",
    reps: "10 per leg",
    hold: "10s per tuck",
    instructions:
      "Hands on the floor, toes in the straps, pull one knee toward the same-side elbow and hip. Hold 10 seconds in the tuck, then extend back to plank. Alternate legs.",
  },
  {
    id: "t2-11",
    kind: "exercise",
    name: "TRX Plank-to-Side-Plank Rotation",
    day: "TRX · T2 — Sat, Mon & Thu",
    sets: "4",
    reps: "10 per side",
    hold: "10s in side plank",
    instructions:
      "Start in a forearm plank with your feet in the straps. Rotate into a side plank with the top arm reaching toward the ceiling, hold 10 seconds, then return. Do both sides.",
  },
  {
    id: "t2-12",
    kind: "exercise",
    name: "TRX Assisted Sit-Up",
    day: "TRX · T2 — Sat, Mon & Thu",
    sets: "10",
    reps: "13",
    hold: "5–10s at the top",
    instructions:
      "Lying down holding the straps overhead, use them to assist pulling yourself up into a sit-up. Keep your glutes on the floor throughout, and hold 5–10 seconds at the top of each rep.",
  },
  {
    id: "t2-13",
    kind: "exercise",
    name: "TRX Single-Leg Rear Extension (Arabesque)",
    day: "TRX · T2 — Sat, Mon & Thu",
    sets: "4",
    reps: "10 per leg",
    hold: "10s per extension",
    instructions:
      "Arms extended forward, standing leg bent about 90 degrees, the other leg with its heel in the strap extended straight back behind you. Hold 10 seconds per extension, return, and switch legs.",
  },
  {
    id: "t2-14",
    kind: "exercise",
    name: "TRX Prone Rotation Reach",
    day: "TRX · T2 — Sat, Mon & Thu",
    sets: "5",
    reps: "10 per side",
    hold: "10s per position",
    instructions:
      "Feet suspended in the straps, from a prone/plank position rotate up into a side reach. Hold 10 seconds in each of the two positions, then return and switch sides.",
  },
  {
    id: "t2-15",
    kind: "exercise",
    name: "TRX Jump Lunge",
    day: "TRX · T2 — Sat, Mon & Thu",
    sets: "5",
    reps: "10 per leg",
    hold: "continuous",
    instructions:
      "Using the straps for light support and balance, jump-switch between lunge stances without pausing. Land soft and stay tall through the whole set.",
  },
  {
    id: "t2-16",
    kind: "exercise",
    name: "TRX Kneel–Plank–Push-Up–Rotation Combo",
    day: "TRX · T2 — Sat, Mon & Thu",
    sets: "5",
    reps: "8 per side",
    hold: "5s per position",
    instructions:
      "A four-part flow: kneeling with one hand planted (hold 5 seconds) → hips up into a plank (hold 5 seconds) → lower into a push-up (hold 5 seconds) → extend one arm up into a side-plank rotation (hold 5 seconds).",
  },
  {
    id: "t2-17",
    kind: "exercise",
    name: "TRX Bridge-to-Pike",
    day: "TRX · T2 — Sat, Mon & Thu",
    sets: "4",
    reps: "14",
    hold: "5s per position",
    instructions:
      "Feet suspended, move between a hip-bridge/extension position and a seated pike position. Hold each position for 5 seconds before switching.",
  },
  {
    id: "t2-18",
    kind: "exercise",
    name: "TRX Kneeling-to-Row Combo",
    day: "TRX · T2 — Sat, Mon & Thu",
    sets: "4",
    reps: "10",
    hold: "10s at the bottom",
    instructions:
      "Start kneeling facing the anchor holding the handles. Lean back into a row until your body is nearly horizontal, hold 10 seconds at the bottom, then pull back up to kneeling.",
  },
];

/* --------------------------- exports ----------------------------- */

export const groups: Group[] = [
  {
    id: "start",
    label: "Overview",
    short: "Start",
    phase: "info",
    kicker: "The 12-month plan",
    days: "Plan overview",
    slides: overviewSlides,
  },
  {
    id: "habits",
    label: "Posture Habits",
    short: "Habits",
    phase: "habits",
    kicker: "Daily posture habits — every day, both phases",
    days: "Every day",
    slides: habitSlides,
  },
  {
    id: "d13",
    label: "Day 1 & 3",
    short: "D1 & 3",
    phase: "p1",
    kicker: "Phase 1 · corrective floor work (months 1–6)",
    days: "Day 1 & 3 · Saturday & Monday",
    slides: day13Slides,
  },
  {
    id: "d24",
    label: "Day 2 & 4",
    short: "D2 & 4",
    phase: "p1",
    kicker: "Phase 1 · corrective floor work (months 1–6)",
    days: "Day 2 & 4 · Sunday & Tuesday",
    slides: day24Slides,
  },
  {
    id: "d56",
    label: "Day 5 & 6",
    short: "D5 & 6",
    phase: "p1",
    kicker: "Phase 1 · corrective floor work (months 1–6)",
    days: "Day 5 & 6 · Wednesday & Thursday",
    slides: day56Slides,
  },
  {
    id: "t1",
    label: "TRX – T1",
    short: "TRX T1",
    phase: "p2",
    kicker: "Phase 2 · TRX circuit (months 7–12)",
    days: "TRX T1 · Sunday & Tuesday",
    slides: [trxSetupT1, ...trxT1Slides],
  },
  {
    id: "t2",
    label: "TRX – T2",
    short: "TRX T2",
    phase: "p2",
    kicker: "Phase 2 · TRX circuit (months 7–12)",
    days: "TRX T2 · Saturday, Monday & Thursday",
    slides: [trxSetupT2, ...trxT2Slides],
  },
];

export function groupById(id: string): Group | undefined {
  return groups.find((g) => g.id === id);
}

/** Weekday schedule used on the Overview "weekly rhythm" slide. */
export interface WeekRow {
  day: string;
  weekday: number; // 0 = Sunday … 6 = Saturday
  p1: string;
  p2: string;
  rest?: boolean;
  target: string | null; // group to jump to for the phase-1 routine
}

export const weekSchedule: WeekRow[] = [
  { day: "Saturday", weekday: 6, p1: "Day 1 & 3", p2: "TRX – T2", target: "d13" },
  { day: "Sunday", weekday: 0, p1: "Day 2 & 4", p2: "TRX – T1", target: "d24" },
  { day: "Monday", weekday: 1, p1: "Day 1 & 3", p2: "TRX – T2", target: "d13" },
  { day: "Tuesday", weekday: 2, p1: "Day 2 & 4", p2: "TRX – T1", target: "d24" },
  {
    day: "Wednesday",
    weekday: 3,
    p1: "Day 5 & 6",
    p2: "not covered — rest or repeat",
    target: "d56",
  },
  { day: "Thursday", weekday: 4, p1: "Day 5 & 6", p2: "TRX – T2", target: "d56" },
  { day: "Friday", weekday: 5, p1: "Rest", p2: "Rest", target: null, rest: true },
];

export const PHASE_1_TAG = "Phase 1 · months 1–6";
export const PHASE_2_TAG = "Phase 2 · months 7–12";
export const SAFETY_NOTE =
  "This is a general posture and mobility/strength program, not medical treatment. If any movement causes sharp or worsening pain, stop and check with a physiotherapist. Go by feel — these are guidelines, not requirements to push through pain.";
export const WEDNESDAY_NOTE =
  "Wednesday isn't covered in the original TRX material — treat it as a rest day, or repeat T1 or T2.";
