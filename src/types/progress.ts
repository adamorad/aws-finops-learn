export type CardProgress = {
  ease: number;
  interval: number;
  dueDate: string;
  repetitions: number;
};

export type ModuleProgress = {
  sectionsRead: string[];
  quizScore: number | null;
  bestScore: number | null;
  quizCompleted: boolean;
  attempts: number;
};

export type ProgressState = {
  version: 1;
  modules: Record<string, ModuleProgress>;
  flashcards: Record<string, CardProgress>;
};

export type ProgressAction =
  | { type: "MARK_SECTION_READ"; moduleId: string; sectionId: string }
  | { type: "SUBMIT_QUIZ"; moduleId: string; score: number }
  | { type: "RATE_CARD"; cardId: string; rating: "again" | "good" | "easy" }
  | { type: "HYDRATE"; state: ProgressState };
