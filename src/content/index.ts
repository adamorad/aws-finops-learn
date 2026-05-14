import type { Flashcard, Module } from "../types/content";
import { module1 } from "./module1";
import { module2 } from "./module2";
import { module3 } from "./module3";
import { module4 } from "./module4";
import { module5 } from "./module5";

export const modules: Module[] = [module1, module2, module3, module4, module5];

export const allFlashcards: Flashcard[] = modules.flatMap((m) =>
  m.sections.flatMap((s) => s.flashcards),
);

export function getModule(id: string): Module | null {
  return modules.find((m) => m.id === id) ?? null;
}
