import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./components/layout/AppShell";
import { FlashcardsPage } from "./pages/FlashcardsPage";
import { ModulePage } from "./pages/ModulePage";
import { QuizPage } from "./pages/QuizPage";
import { RoadmapPage } from "./pages/RoadmapPage";
import { SectionPage } from "./pages/SectionPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppShell />}>
          <Route index element={<RoadmapPage />} />
          <Route path="module/:moduleId" element={<ModulePage />} />
          <Route
            path="module/:moduleId/section/:sectionId"
            element={<SectionPage />}
          />
          <Route path="module/:moduleId/quiz" element={<QuizPage />} />
          <Route path="flashcards" element={<FlashcardsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
