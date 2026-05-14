export type HeadingBlock = { type: "heading"; level: 2 | 3; text: string };
export type ParagraphBlock = { type: "paragraph"; text: string };
export type CalloutBlock = {
  type: "callout";
  variant: "info" | "warning" | "tip" | "important";
  title?: string;
  text: string;
};
export type BulletListBlock = { type: "bullet-list"; items: string[] };
export type NumberedListBlock = { type: "numbered-list"; items: string[] };
export type CodeBlock = { type: "code"; language: string; code: string };
export type TableBlock = { type: "table"; headers: string[]; rows: string[][] };

export type Block =
  | HeadingBlock
  | ParagraphBlock
  | CalloutBlock
  | BulletListBlock
  | NumberedListBlock
  | CodeBlock
  | TableBlock;

export type Flashcard = {
  id: string;
  moduleId: string;
  front: string;
  back: string;
  tags: string[];
};

export type QuizQuestion = {
  id: string;
  text: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
};

export type Section = {
  id: string;
  title: string;
  estimatedMinutes: number;
  blocks: Block[];
  flashcards: Flashcard[];
};

export type Module = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  sections: Section[];
  quiz: QuizQuestion[];
};
