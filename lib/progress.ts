// Course progress, stored only in this browser's localStorage.

const KEY = "course-progress:v1";
const EVENT = "course-progress-change";

// firstTry[i] is null until question i gets its first answer.
export type QuizResult = { firstTry: (boolean | null)[]; answered: boolean[] };
export type Progress = { completed: string[]; quizzes: Record<string, QuizResult> };

const empty = (): Progress => ({ completed: [], quizzes: {} });

export function readProgress(): Progress {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? "null");
    if (raw && Array.isArray(raw.completed) && typeof raw.quizzes === "object") return raw;
  } catch {}
  return empty();
}

function write(progress: Progress) {
  try {
    localStorage.setItem(KEY, JSON.stringify(progress));
  } catch {}
  window.dispatchEvent(new Event(EVENT));
}

export function setCompleted(slug: string, done: boolean) {
  const p = readProgress();
  const set = new Set(p.completed);
  if (done) set.add(slug);
  else set.delete(slug);
  write({ ...p, completed: [...set] });
}

/** Records an answer. A question counts as first-try correct only if its first answer was right. */
export function recordAnswer(slug: string, index: number, total: number, correct: boolean) {
  const p = readProgress();
  const q = p.quizzes[slug] ?? { firstTry: Array(total).fill(null), answered: Array(total).fill(false) };
  if (q.firstTry[index] === null) q.firstTry[index] = correct;
  if (correct) q.answered[index] = true;
  const quizzes = { ...p.quizzes, [slug]: q };
  const completed = q.answered.every(Boolean) ? [...new Set([...p.completed, slug])] : p.completed;
  write({ completed, quizzes });
}

export function resetProgress() {
  write(empty());
}

export function subscribe(callback: () => void) {
  window.addEventListener(EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}
