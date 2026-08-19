# ⚡ KV REWARI — CLASS 11 PYTHON HUB

A complete, production-ready educational platform designed specifically for **Class 11 Computer Science students of Kendriya Vidyalaya Rewari (Session 2026–27)**.

Built with a futuristic **Black + Electric Blue coding aesthetic**, adhering strictly to the official **CBSE Computer Science (Code 083) Unit 2: Computational Thinking and Programming - I (45 Marks)** syllabus and the **30-mark practical examination framework**.

---

## 🌟 Key Features

1. **Official CBSE Syllabus (Unit 2 — 45 Marks)**:
   - All 14 official curriculum topics from Problem-Solving to Python Standard Modules.
   - Interactive search and category filters.
   - Rich **Topic Detail Modals** featuring subtopics, built-in functions, and example Python code snippets with one-click copy.
2. **Python Practical Lab (30 Marks)**:
   - Official 30-mark practical structure (12M Lab Test, 10M File + Viva, 8M Project).
   - 21 verified official practical programs with syntax highlighting, sample inputs, and outputs.
3. **Interactive Python Quiz**:
   - In-browser output prediction & error debugging quiz.
   - Instant visual feedback (green/red animations) and detailed explanations for every option.
4. **Centralized Google Drive Integration**:
   - Single configuration file `src/data/config.js` for all video lectures, notes, mind maps, and PDFs.
   - Elegant "Resource Coming Soon" fallback modal for empty links.
5. **Exam Mode ⚡**:
   - High-yield quick-revision capsules (Top 20 Programs, Question Bank, Syntax Cheat Sheet, NCERT Definitions, 1-Day Revision).
6. **5-Step Python Learning Path**:
   - Structured visual pipeline: `WATCH → UNDERSTAND → PRACTICE → TEST → REVISE`.
7. **Teacher Profile**:
   - Dedicated mentorship section for **Neelima Ma'am (PGT Computer Science)** with editable bio, message, and subject specializations.

---

## 📁 Project Structure

```
d:/New folder/
├── index.html                  # Master entry point with dark electric blue UI
├── serve.ps1                   # Zero-dependency local development server
├── README.md                   # Documentation & guide
└── src/
    ├── styles/
    │   └── index.css           # Electric blue tokens, glassmorphism, neon glow
    ├── data/
    │   ├── config.js           # Central Google Drive URLs, teacher & school settings
    │   ├── syllabus.js         # Complete 14 CBSE Unit-2 topics, subtopics & methods
    │   ├── practicalPrograms.js# 21 verified practical programs with sample I/O
    │   ├── quizData.js         # Interactive quiz questions, code snippets & solutions
    │   ├── examModeData.js     # Quick revision kits & high-yield summaries
    │   └── resources.js        # Core resource hub cards metadata
    └── app.js                  # Main controller, state, modals, search & quiz engine
```

---

## 🔗 How to Connect Google Drive Resources

Open `src/data/config.js` in any text editor and paste your Google Drive folder or file shareable links into the `resourceLinks` object:

```javascript
export const resourceLinks = {
    lectures: "https://drive.google.com/drive/folders/YOUR_LECTURES_FOLDER_ID",
    notes: "https://drive.google.com/drive/folders/YOUR_NOTES_FOLDER_ID",
    animatedNotes: "",
    mindMaps: "https://drive.google.com/drive/folders/YOUR_MINDMAPS_FOLDER_ID",
    quizzes: "https://forms.gle/YOUR_QUIZ_FORM_ID",
    practice: "",
    importantPrograms: "",
    importantQuestions: "",
    syntaxSheet: "",
    definitions: "",
    oneDayRevision: "",
    chapterRevision: "",
    practicalPrograms: "",
    projectResources: ""
};
```

> **Note**: Any link left empty (`""`) will automatically show a friendly *"Resource Coming Soon"* notice to students when clicked.

---

## 🚀 How to Run Locally

### Option 1: Double-click or Open directly
Simply open `index.html` in any modern web browser (Chrome, Edge, Firefox, Brave, Safari).

### Option 2: Run with the built-in PowerShell server
Open PowerShell in this directory and run:
```powershell
powershell -ExecutionPolicy Bypass -File .\serve.ps1
```
Then visit `http://localhost:5173/` in your browser.

---

## 👨‍💻 Project Developers & Student Architects

- **Harsh Khola** — Class 11-B (Kendriya Vidyalaya Rewari)
- **Yash Vedi** — Class 11-B (Kendriya Vidyalaya Rewari)

*Mentor & Teacher:* **Neelima Ma'am** (PGT Computer Science)

