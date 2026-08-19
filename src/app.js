/**
 * KV REWARI - CLASS 11 PYTHON HUB
 * Main Application Logic & Interactive State Controller
 */

import { resourceLinks, teacherInfo, schoolInfo } from './data/config.js';
import { syllabusTopics } from './data/syllabus.js';
import { practicalStructure, practicalPrograms, practicalCategories } from './data/practicalPrograms.js';
import { quizQuestions } from './data/quizData.js';
import { examModeCards } from './data/examModeData.js';
import { coreResources } from './data/resources.js';

// State Management
const appState = {
    currentQuizIndex: 0,
    quizAnswers: {},
    quizScore: 0,
    selectedTopicId: null,
    selectedProgramId: null,
    selectedExamCardId: null,
    syllabusSearchQuery: "",
    syllabusFilter: "all",
    practicalSearchQuery: "",
    practicalFilter: "All",
    activeHeroCodeTab: "main",
    heroTerminalOutput: null
};

// Hero Code Snippets
const heroSnippets = {
    main: {
        filename: "main.py",
        code: `# Welcome to Class 11 Python Hub
# Kendriya Vidyalaya Rewari (2026-27)

def start_journey(school, student_class):
    print(f"🚀 Initializing Python Learning for {school} {student_class}...")
    topics = ["Problem Solving", "Operators", "Strings", "Lists", "Tuples", "Dicts", "Modules"]
    
    for i, topic in enumerate(topics, 1):
        print(f"[{i:02d}] Mastering {topic} (CBSE Unit 2)")
    
    return "45/45 Theory Marks + 30/30 Practical Goal!"

result = start_journey("KV Rewari", "Class 11")
print("Target:", result)`
    },
    welcome: {
        filename: "welcome.py",
        code: `# Hello Python World
class_11 = ["Aarav", "Sneha", "Diya", "Kabir"]

print("Hello, Class 11 Python Explorers!")
for student in class_11:
    print(f"💻 {student} is ready to code Python!")`
    },
    fibonacci: {
        filename: "fibonacci.py",
        code: `# Fibonacci Sequence in Python
def fibonacci_series(n):
    a, b = 0, 1
    series = []
    for _ in range(n):
        series.append(a)
        a, b = b, a + b
    return series

print("First 8 Fibonacci terms:", fibonacci_series(8))`
    }
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    renderNavbar();
    renderHeroInfo();
    renderHeroCode();
    renderSyllabusFilters();
    renderSyllabusCards();
    renderResourceHub();
    renderExamMode();
    renderQuiz();
    renderPracticalLab();
    renderTeacherSection();
    renderFooter();
    setupGlobalEventListeners();
    setupScrollSpy();
});

// 1. Navigation Controller
function renderNavbar() {
    const navContainer = document.getElementById('navbar-container');
    if (!navContainer) return;

    navContainer.innerHTML = `
        <header class="sticky top-0 z-50 bg-[#050811]/90 backdrop-blur-xl border-b border-blue-500/20 transition-all duration-300">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between h-20">
                    <!-- Brand / Logo -->
                    <a href="#hero" class="flex items-center gap-3 group">
                        <div class="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 via-blue-500 to-cyan-400 p-[2px] shadow-lg shadow-blue-500/30 group-hover:shadow-cyan-400/50 transition-all duration-300">
                            <div class="w-full h-full bg-[#070B16] rounded-[10px] flex items-center justify-center">
                                <svg class="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                </svg>
                            </div>
                        </div>
                        <div>
                            <div class="font-heading text-lg font-black tracking-wider text-white group-hover:text-cyan-400 transition-colors">
                                KV REWARI
                            </div>
                            <div class="text-[11px] font-semibold tracking-widest text-cyan-400 flex items-center gap-1.5">
                                <span class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
                                CLASS 11 PYTHON HUB
                            </div>
                        </div>
                    </a>

                    <!-- Desktop Navigation Links -->
                    <nav class="hidden md:flex items-center gap-1 lg:gap-2">
                        <a href="#hero" class="nav-link px-3 py-2 text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors rounded-lg hover:bg-blue-500/10">Home</a>
                        <a href="#syllabus" class="nav-link px-3 py-2 text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors rounded-lg hover:bg-blue-500/10">Syllabus</a>
                        <a href="#resources" class="nav-link px-3 py-2 text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors rounded-lg hover:bg-blue-500/10">Resources</a>
                        <a href="#learning-path" class="nav-link px-3 py-2 text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors rounded-lg hover:bg-blue-500/10">Path</a>
                        <a href="#exam-mode" class="nav-link px-3 py-2 text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors rounded-lg hover:bg-blue-500/10 flex items-center gap-1">
                            Exam Mode <span class="text-xs text-amber-400">⚡</span>
                        </a>
                        <a href="#quiz" class="nav-link px-3 py-2 text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors rounded-lg hover:bg-blue-500/10">Quiz</a>
                        <a href="#practicals" class="nav-link px-3 py-2 text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors rounded-lg hover:bg-blue-500/10">Practical</a>
                        <a href="#teacher" class="nav-link px-3 py-2 text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors rounded-lg hover:bg-blue-500/10">Teacher</a>
                    </nav>

                    <!-- Right CTA -->
                    <div class="hidden sm:flex items-center gap-3">
                        <a href="#syllabus" class="btn-electric text-sm py-2.5 px-5">
                            <span>Start Learning</span>
                            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </a>
                    </div>

                    <!-- Mobile Hamburger Button -->
                    <div class="flex md:hidden">
                        <button id="mobile-menu-btn" class="p-2.5 rounded-xl bg-blue-950/40 border border-blue-500/30 text-slate-200 hover:text-cyan-400 focus:outline-none" aria-label="Toggle Menu">
                            <svg id="hamburger-icon" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                            <svg id="close-icon" class="w-6 h-6 hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Mobile Drawer -->
            <div id="mobile-menu-drawer" class="hidden md:hidden border-b border-blue-500/20 bg-[#070B16]/95 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-2">
                <a href="#hero" class="mobile-nav-link block px-4 py-3 rounded-xl text-base font-medium text-slate-200 hover:bg-blue-600/20 hover:text-cyan-400">Home</a>
                <a href="#syllabus" class="mobile-nav-link block px-4 py-3 rounded-xl text-base font-medium text-slate-200 hover:bg-blue-600/20 hover:text-cyan-400">Class 11 Syllabus (Unit 2)</a>
                <a href="#resources" class="mobile-nav-link block px-4 py-3 rounded-xl text-base font-medium text-slate-200 hover:bg-blue-600/20 hover:text-cyan-400">Resource Hub</a>
                <a href="#learning-path" class="mobile-nav-link block px-4 py-3 rounded-xl text-base font-medium text-slate-200 hover:bg-blue-600/20 hover:text-cyan-400">5-Step Learning Path</a>
                <a href="#exam-mode" class="mobile-nav-link block px-4 py-3 rounded-xl text-base font-medium text-slate-200 hover:bg-blue-600/20 hover:text-cyan-400">Exam Mode ⚡</a>
                <a href="#quiz" class="mobile-nav-link block px-4 py-3 rounded-xl text-base font-medium text-slate-200 hover:bg-blue-600/20 hover:text-cyan-400">Interactive Quiz Preview</a>
                <a href="#practicals" class="mobile-nav-link block px-4 py-3 rounded-xl text-base font-medium text-slate-200 hover:bg-blue-600/20 hover:text-cyan-400">Python Practical Lab (30M)</a>
                <a href="#teacher" class="mobile-nav-link block px-4 py-3 rounded-xl text-base font-medium text-slate-200 hover:bg-blue-600/20 hover:text-cyan-400">Meet Teacher (Neelima Ma'am)</a>
                <div class="pt-4">
                    <a href="#syllabus" class="btn-electric w-full justify-center py-3">
                        <span>Start Learning →</span>
                    </a>
                </div>
            </div>
        </header>
    `;

    // Mobile Menu Toggle
    const menuBtn = document.getElementById('mobile-menu-btn');
    const menuDrawer = document.getElementById('mobile-menu-drawer');
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const closeIcon = document.getElementById('close-icon');

    if (menuBtn && menuDrawer) {
        menuBtn.addEventListener('click', () => {
            const isHidden = menuDrawer.classList.contains('hidden');
            if (isHidden) {
                menuDrawer.classList.remove('hidden');
                hamburgerIcon.classList.add('hidden');
                closeIcon.classList.remove('hidden');
            } else {
                menuDrawer.classList.add('hidden');
                hamburgerIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
            }
        });

        // Close on link click
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                menuDrawer.classList.add('hidden');
                hamburgerIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
            });
        });
    }
}

// 2. Hero Information Strip
function renderHeroInfo() {
    const infoStripContainer = document.getElementById('hero-info-strip');
    if (!infoStripContainer) return;

    infoStripContainer.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mt-12">
            <!-- Card 1: For -->
            <div class="glass-card p-5 border-blue-500/20 relative overflow-hidden group">
                <div class="absolute -right-6 -bottom-6 w-24 h-24 bg-blue-600/10 rounded-full blur-xl group-hover:bg-blue-600/20 transition-colors"></div>
                <div class="text-xs font-bold tracking-widest text-cyan-400 uppercase mb-1">FOR</div>
                <div class="font-heading text-2xl font-extrabold text-white">Class 11</div>
                <div class="text-sm text-slate-400 mt-1">KV Rewari Students</div>
            </div>

            <!-- Card 2: Syllabus -->
            <div class="glass-card p-5 border-blue-500/20 relative overflow-hidden group">
                <div class="absolute -right-6 -bottom-6 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl group-hover:bg-cyan-500/20 transition-colors"></div>
                <div class="text-xs font-bold tracking-widest text-cyan-400 uppercase mb-1">SYLLABUS</div>
                <div class="font-heading text-2xl font-extrabold text-white">45+ Marks</div>
                <div class="text-sm text-slate-400 mt-1">Python / Programming Unit</div>
            </div>

            <!-- Card 3: Practice -->
            <div class="glass-card p-5 border-blue-500/20 relative overflow-hidden group">
                <div class="absolute -right-6 -bottom-6 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl group-hover:bg-emerald-500/20 transition-colors"></div>
                <div class="text-xs font-bold tracking-widest text-cyan-400 uppercase mb-1">PRACTICE</div>
                <div class="font-heading text-2xl font-extrabold text-white">30 Marks</div>
                <div class="text-sm text-slate-400 mt-1">Practical Component</div>
            </div>
        </div>
    `;
}

// 3. Hero Interactive Code Visualizer
function renderHeroCode() {
    const heroCodeContainer = document.getElementById('hero-code-visual');
    if (!heroCodeContainer) return;

    const currentTab = appState.activeHeroCodeTab;
    const snippet = heroSnippets[currentTab];

    heroCodeContainer.innerHTML = `
        <div class="relative w-full max-w-xl mx-auto lg:max-w-none">
            <!-- Neon Glow Behind Editor -->
            <div class="absolute -inset-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 rounded-2xl blur-xl opacity-30 animate-pulse-glow"></div>
            
            <!-- Code Editor Container -->
            <div class="relative glass-card border border-blue-500/40 rounded-2xl overflow-hidden shadow-2xl bg-[#060B18]">
                <!-- Editor Top Bar -->
                <div class="bg-[#090F24] px-4 py-3 border-b border-blue-500/20 flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <span class="code-dot code-dot-red"></span>
                        <span class="code-dot code-dot-yellow"></span>
                        <span class="code-dot code-dot-green"></span>
                        <span class="text-xs font-mono text-slate-400 ml-2">python3-idle // KV-REWARI</span>
                    </div>

                    <!-- File Tabs -->
                    <div class="flex items-center gap-1 bg-[#050811] p-1 rounded-lg border border-blue-500/20">
                        <button onclick="window.switchHeroTab('main')" class="px-2.5 py-1 text-xs font-mono rounded ${currentTab === 'main' ? 'bg-blue-600 text-white font-semibold shadow' : 'text-slate-400 hover:text-slate-200'}">main.py</button>
                        <button onclick="window.switchHeroTab('welcome')" class="px-2.5 py-1 text-xs font-mono rounded ${currentTab === 'welcome' ? 'bg-blue-600 text-white font-semibold shadow' : 'text-slate-400 hover:text-slate-200'}">welcome.py</button>
                        <button onclick="window.switchHeroTab('fibonacci')" class="px-2.5 py-1 text-xs font-mono rounded ${currentTab === 'fibonacci' ? 'bg-blue-600 text-white font-semibold shadow' : 'text-slate-400 hover:text-slate-200'}">fib.py</button>
                    </div>
                </div>

                <!-- Code Body -->
                <div class="p-4 sm:p-6 font-mono text-xs sm:text-sm overflow-x-auto text-slate-200 bg-[#050814]/90 max-h-80 select-text leading-relaxed">
                    <pre><code>${highlightPythonSyntax(snippet.code)}</code></pre>
                </div>

                <!-- Live Run Action Bar -->
                <div class="bg-[#090F24] px-4 py-3 border-t border-blue-500/20 flex items-center justify-between">
                    <div class="flex items-center gap-2 text-xs font-mono text-slate-400">
                        <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                        <span>Python 3.12 (CBSE Class XI)</span>
                    </div>

                    <button onclick="window.runHeroCode()" class="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold font-mono text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/25 border border-cyan-400/40 rounded-lg transition-all">
                        <svg class="w-3.5 h-3.5 text-cyan-400 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                        <span>Run Code</span>
                    </button>
                </div>

                <!-- Terminal Output Simulation -->
                ${appState.heroTerminalOutput ? `
                    <div class="bg-[#03060E] p-4 border-t border-cyan-500/30 font-mono text-xs text-emerald-400 space-y-1">
                        <div class="text-[11px] text-slate-400 flex items-center justify-between mb-1 pb-1 border-b border-slate-800">
                            <span>▶ TERMINAL OUTPUT</span>
                            <span class="text-emerald-500">✔ Exit Code: 0</span>
                        </div>
                        <pre class="whitespace-pre-wrap">${appState.heroTerminalOutput}</pre>
                    </div>
                ` : ''}
            </div>

            <!-- Floating Mini Badges -->
            <div class="absolute -top-4 -right-4 glass-card px-3 py-1.5 border-blue-400/40 text-xs font-bold text-cyan-300 shadow-xl hidden sm:flex items-center gap-1.5 animate-float">
                <span>⚡</span> Unit 2 • 45 Marks
            </div>
            <div class="absolute -bottom-4 -left-4 glass-card px-3 py-1.5 border-emerald-400/40 text-xs font-bold text-emerald-300 shadow-xl hidden sm:flex items-center gap-1.5 animate-float-delay">
                <span>🧪</span> 30 Marks Practical List
            </div>
        </div>
    `;
}

window.switchHeroTab = (tab) => {
    appState.activeHeroCodeTab = tab;
    appState.heroTerminalOutput = null;
    renderHeroCode();
};

window.runHeroCode = () => {
    if (appState.activeHeroCodeTab === 'main') {
        appState.heroTerminalOutput = `🚀 Initializing Python Learning for KV Rewari Class 11...\n[01] Mastering Problem Solving (CBSE Unit 2)\n[02] Mastering Operators (CBSE Unit 2)\n[03] Mastering Strings (CBSE Unit 2)\n[04] Mastering Lists (CBSE Unit 2)\n[05] Mastering Tuples (CBSE Unit 2)\n[06] Mastering Dicts (CBSE Unit 2)\n[07] Mastering Modules (CBSE Unit 2)\nTarget: 45/45 Theory Marks + 30/30 Practical Goal!`;
    } else if (appState.activeHeroCodeTab === 'welcome') {
        appState.heroTerminalOutput = `Hello, Class 11 Python Explorers!\n💻 Aarav is ready to code Python!\n💻 Sneha is ready to code Python!\n💻 Diya is ready to code Python!\n💻 Kabir is ready to code Python!`;
    } else {
        appState.heroTerminalOutput = `First 8 Fibonacci terms: [0, 1, 1, 2, 3, 5, 8, 13]`;
    }
    renderHeroCode();
};

// Simple Python Syntax Highlighter for UI
function highlightPythonSyntax(code) {
    if (!code) return "";
    const escapeHtml = (str) => str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    
    const lines = code.split('\n');
    return lines.map(line => {
        // Comment
        if (line.trim().startsWith('#')) {
            return `<span class="token-comment">${escapeHtml(line)}</span>`;
        }
        
        let formatted = escapeHtml(line);
        
        // Strings
        formatted = formatted.replace(/(["'])(?:(?=(\\?))\2[\s\S])*?\1/g, '<span class="token-string">$&</span>');
        
        // Keywords
        const keywords = ['def', 'return', 'for', 'in', 'if', 'elif', 'else', 'while', 'import', 'from', 'as', 'class', 'break', 'continue', 'pass', 'try', 'except', 'True', 'False', 'None', 'and', 'or', 'not', 'is'];
        keywords.forEach(kw => {
            const regex = new RegExp(`\\b(${kw})\\b`, 'g');
            formatted = formatted.replace(regex, '<span class="token-keyword">$1</span>');
        });
        
        // Builtins & Functions
        const builtins = ['print', 'input', 'len', 'range', 'enumerate', 'int', 'float', 'str', 'list', 'tuple', 'dict', 'sum', 'min', 'max', 'type', 'append'];
        builtins.forEach(fn => {
            const regex = new RegExp(`\\b(${fn})(?=\\()`, 'g');
            formatted = formatted.replace(regex, '<span class="token-function">$1</span>');
        });

        // Numbers
        formatted = formatted.replace(/\b(\d+(\.\d+)?)\b/g, '<span class="token-number">$1</span>');

        return formatted;
    }).join('\n');
}

// 4. Syllabus Section
function renderSyllabusFilters() {
    const filterContainer = document.getElementById('syllabus-filter-bar');
    if (!filterContainer) return;

    filterContainer.innerHTML = `
        <div class="flex flex-col md:flex-row items-center justify-between gap-4 glass-card p-3 md:p-4 border-blue-500/20">
            <!-- Search Input -->
            <div class="relative w-full md:w-80">
                <svg class="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input 
                    type="text" 
                    id="syllabus-search-input"
                    placeholder="Search topics, methods (e.g., isalnum, for loop, dict)..."
                    class="w-full bg-[#050811] text-sm text-slate-200 pl-10 pr-4 py-2 rounded-xl border border-blue-500/30 focus:border-cyan-400 focus:outline-none placeholder-slate-500 transition-colors"
                />
            </div>

            <!-- Category Pills -->
            <div class="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
                <button onclick="window.setSyllabusFilter('all')" class="syllabus-pill text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${appState.syllabusFilter === 'all' ? 'bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-500/30' : 'bg-[#090F24] text-slate-400 border-blue-500/20 hover:text-white'}">All (14 Topics)</button>
                <button onclick="window.setSyllabusFilter('fundamentals')" class="syllabus-pill text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${appState.syllabusFilter === 'fundamentals' ? 'bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-500/30' : 'bg-[#090F24] text-slate-400 border-blue-500/20 hover:text-white'}">Basics & Types</button>
                <button onclick="window.setSyllabusFilter('control')" class="syllabus-pill text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${appState.syllabusFilter === 'control' ? 'bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-500/30' : 'bg-[#090F24] text-slate-400 border-blue-500/20 hover:text-white'}">Conditionals & Loops</button>
                <button onclick="window.setSyllabusFilter('sequences')" class="syllabus-pill text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${appState.syllabusFilter === 'sequences' ? 'bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-500/30' : 'bg-[#090F24] text-slate-400 border-blue-500/20 hover:text-white'}">Strings, Lists & Dicts</button>
                <button onclick="window.setSyllabusFilter('modules')" class="syllabus-pill text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${appState.syllabusFilter === 'modules' ? 'bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-500/30' : 'bg-[#090F24] text-slate-400 border-blue-500/20 hover:text-white'}">Modules</button>
            </div>
        </div>
    `;

    const searchInput = document.getElementById('syllabus-search-input');
    if (searchInput) {
        searchInput.value = appState.syllabusSearchQuery;
        searchInput.addEventListener('input', (e) => {
            appState.syllabusSearchQuery = e.target.value;
            renderSyllabusCards();
        });
    }
}

window.setSyllabusFilter = (filter) => {
    appState.syllabusFilter = filter;
    renderSyllabusFilters();
    renderSyllabusCards();
};

function renderSyllabusCards() {
    const cardsContainer = document.getElementById('syllabus-cards-container');
    if (!cardsContainer) return;

    let filtered = syllabusTopics.filter(t => {
        // Query match
        const q = appState.syllabusSearchQuery.toLowerCase().trim();
        const matchesQuery = !q || 
            t.title.toLowerCase().includes(q) ||
            t.shortDesc.toLowerCase().includes(q) ||
            t.keywords.some(k => k.toLowerCase().includes(q)) ||
            (t.builtInMethods && t.builtInMethods.some(m => m.toLowerCase().includes(q)));

        // Category filter
        let matchesCat = true;
        const idNum = parseInt(t.id, 10);
        if (appState.syllabusFilter === 'fundamentals') {
            matchesCat = idNum >= 1 && idNum <= 6;
        } else if (appState.syllabusFilter === 'control') {
            matchesCat = idNum >= 7 && idNum <= 9;
        } else if (appState.syllabusFilter === 'sequences') {
            matchesCat = idNum >= 10 && idNum <= 13;
        } else if (appState.syllabusFilter === 'modules') {
            matchesCat = idNum === 14;
        }

        return matchesQuery && matchesCat;
    });

    if (filtered.length === 0) {
        cardsContainer.innerHTML = `
            <div class="col-span-full text-center py-12 glass-card border-blue-500/20">
                <div class="text-4xl mb-3">🔍</div>
                <div class="text-lg font-semibold text-slate-300">No syllabus topic matched "${appState.syllabusSearchQuery}"</div>
                <p class="text-sm text-slate-500 mt-1">Try searching for keywords like "for loop", "slicing", "random", "list", or "dict".</p>
                <button onclick="window.clearSyllabusSearch()" class="mt-4 px-4 py-2 text-xs font-semibold text-cyan-400 bg-blue-500/10 border border-blue-500/30 rounded-lg hover:bg-blue-500/20">Reset Search Filters</button>
            </div>
        `;
        return;
    }

    cardsContainer.innerHTML = filtered.map(topic => `
        <div onclick="window.openTopicModal('${topic.id}')" class="glass-card glass-card-interactive p-6 flex flex-col justify-between group relative overflow-hidden">
            <div class="absolute top-0 right-0 w-28 h-28 bg-blue-600/5 group-hover:bg-cyan-500/10 rounded-bl-full transition-colors pointer-events-none"></div>

            <div>
                <!-- Top Badge & Number -->
                <div class="flex items-center justify-between mb-3">
                    <span class="font-mono text-xs font-bold text-cyan-400 bg-blue-950/60 border border-blue-500/30 px-2.5 py-1 rounded-lg group-hover:border-cyan-400/60 transition-colors">
                        TOPIC ${topic.number}
                    </span>
                    <span class="badge-blue text-[11px]">${topic.tag}</span>
                </div>

                <!-- Title -->
                <h3 class="font-heading text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-2 leading-snug">
                    ${topic.title}
                </h3>

                <!-- Short Description -->
                <p class="text-sm text-slate-400 leading-relaxed mb-4 line-clamp-2">
                    ${topic.shortDesc}
                </p>

                <!-- Keywords Chips -->
                <div class="flex flex-wrap gap-1.5 mb-4">
                    ${topic.keywords.slice(0, 3).map(k => `
                        <span class="text-[11px] font-mono bg-[#070B16] text-slate-400 px-2 py-0.5 rounded border border-blue-500/15 group-hover:border-blue-500/30">#${k}</span>
                    `).join('')}
                    ${topic.keywords.length > 3 ? `<span class="text-[11px] font-mono text-cyan-400/80 px-1 py-0.5">+${topic.keywords.length - 3}</span>` : ''}
                </div>
            </div>

            <!-- Card Bottom Bar -->
            <div class="pt-4 border-t border-blue-500/15 flex items-center justify-between text-xs">
                <span class="text-slate-400 font-medium flex items-center gap-1">
                    <svg class="w-3.5 h-3.5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                    ${topic.subtopics.length} Key Subtopics
                </span>
                <span class="text-cyan-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Explore Topic
                    <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                </span>
            </div>
        </div>
    `).join('');
}

window.clearSyllabusSearch = () => {
    appState.syllabusSearchQuery = "";
    appState.syllabusFilter = "all";
    renderSyllabusFilters();
    renderSyllabusCards();
};

// 5. Topic Detail Modal
window.openTopicModal = (topicId) => {
    const topic = syllabusTopics.find(t => t.id === topicId);
    if (!topic) return;

    appState.selectedTopicId = topicId;
    const modalContainer = document.getElementById('modal-root');
    if (!modalContainer) return;

    modalContainer.innerHTML = `
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay overflow-y-auto" onclick="window.handleModalBackdropClick(event)">
            <div class="relative w-full max-w-4xl glass-card bg-[#070B18]/95 border-blue-500/40 p-6 sm:p-8 rounded-2xl shadow-2xl animate-modal-pop my-8 max-h-[90vh] overflow-y-auto">
                
                <!-- Close Button -->
                <button onclick="window.closeModal()" class="absolute top-5 right-5 p-2 rounded-xl bg-blue-950/60 border border-blue-500/30 text-slate-300 hover:text-cyan-400 hover:border-cyan-400 transition-colors">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>

                <!-- Header -->
                <div class="flex flex-wrap items-center gap-2 mb-3">
                    <span class="font-mono text-xs font-bold text-cyan-400 bg-blue-950/80 border border-blue-500/40 px-3 py-1 rounded-lg">TOPIC ${topic.number}</span>
                    <span class="badge-blue">${topic.tag}</span>
                    <span class="badge-cyan">CBSE Class 11 • Unit 2</span>
                </div>

                <h2 class="font-heading text-2xl sm:text-3xl font-extrabold text-white mb-3">
                    ${topic.title}
                </h2>

                <p class="text-sm sm:text-base text-slate-300 mb-6 leading-relaxed bg-blue-950/30 p-4 rounded-xl border border-blue-500/20">
                    ${topic.overview}
                </p>

                <!-- Subtopics Breakdown -->
                <div class="mb-6">
                    <h3 class="text-sm font-bold tracking-wider text-cyan-400 uppercase mb-3 flex items-center gap-2">
                        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
                        Official CBSE Subtopics & Key Concepts
                    </h3>
                    <ul class="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                        ${topic.subtopics.map(sub => `
                            <li class="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 bg-[#050811] p-2.5 rounded-lg border border-blue-500/15">
                                <span class="text-cyan-400 font-bold mt-0.5">›</span>
                                <span>${sub}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>

                <!-- Built-In Functions if present -->
                ${topic.builtInMethods && topic.builtInMethods.length > 0 ? `
                    <div class="mb-6">
                        <h3 class="text-sm font-bold tracking-wider text-cyan-400 uppercase mb-3 flex items-center gap-2">
                            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
                            Official Built-in Functions & Methods (${topic.builtInMethods.length})
                        </h3>
                        <div class="flex flex-wrap gap-2 p-3 bg-[#050811] rounded-xl border border-blue-500/20">
                            ${topic.builtInMethods.map(m => `
                                <span class="font-mono text-xs text-slate-200 bg-blue-900/30 hover:bg-blue-900/60 border border-blue-500/30 px-2.5 py-1 rounded-md transition-colors">
                                    ${m}
                                </span>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- Example Python Code -->
                ${topic.sampleCode ? `
                    <div class="mb-6">
                        <div class="flex items-center justify-between mb-2">
                            <h3 class="text-sm font-bold tracking-wider text-cyan-400 uppercase flex items-center gap-2">
                                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                                Example Python Code
                            </h3>
                            <button onclick="window.copyToClipboard(decodeURIComponent('${encodeURIComponent(topic.sampleCode)}'), this)" class="text-xs font-mono text-cyan-400 hover:text-white px-2.5 py-1 rounded bg-blue-950/60 border border-blue-500/30 flex items-center gap-1 transition-colors">
                                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                                <span>Copy Code</span>
                            </button>
                        </div>
                        <div class="code-container p-4 bg-[#050811] text-xs sm:text-sm text-slate-200 overflow-x-auto max-h-64">
                            <pre><code>${highlightPythonSyntax(topic.sampleCode)}</code></pre>
                        </div>
                    </div>
                ` : ''}

                <!-- Suggested Programs -->
                ${topic.suggestedPrograms && topic.suggestedPrograms.length > 0 ? `
                    <div class="mb-6">
                        <h3 class="text-sm font-bold tracking-wider text-cyan-400 uppercase mb-2">Suggested CBSE Practical Programs:</h3>
                        <ul class="space-y-1.5 text-xs sm:text-sm text-slate-300">
                            ${topic.suggestedPrograms.map(p => `
                                <li class="flex items-center gap-2">
                                    <span class="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                                    <span>${p}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                ` : ''}

                <!-- Direct Resource Launch Buttons -->
                <div class="pt-6 border-t border-blue-500/20">
                    <div class="text-xs font-bold text-slate-400 uppercase mb-3">Topic Study Material (Google Drive):</div>
                    <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        <button onclick="window.openResource('lectures')" class="btn-ghost text-xs py-2 px-3 justify-center">🎥 Lectures</button>
                        <button onclick="window.openResource('notes')" class="btn-ghost text-xs py-2 px-3 justify-center">📚 Notes</button>
                        <button onclick="window.openResource('mindMaps')" class="btn-ghost text-xs py-2 px-3 justify-center">🧠 Mind Map</button>
                        <button onclick="window.openResource('practice')" class="btn-ghost text-xs py-2 px-3 justify-center">💻 Practice</button>
                    </div>
                </div>

            </div>
        </div>
    `;
    document.body.classList.add('overflow-hidden');
};

// 6. Resource Hub Section
function renderResourceHub() {
    const resourceGrid = document.getElementById('resource-hub-grid');
    if (!resourceGrid) return;

    resourceGrid.innerHTML = coreResources.map(res => `
        <div class="glass-card p-6 flex flex-col justify-between group relative overflow-hidden border-blue-500/20">
            <div class="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 group-hover:bg-cyan-500/10 rounded-bl-full transition-colors pointer-events-none"></div>

            <div>
                <!-- Emoji & Badge -->
                <div class="flex items-center justify-between mb-4">
                    <div class="w-12 h-12 rounded-xl bg-blue-950/60 border border-blue-500/30 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:border-cyan-400 transition-all">
                        ${res.emoji}
                    </div>
                    <span class="badge-cyan text-xs">${res.badge}</span>
                </div>

                <!-- Title -->
                <h3 class="font-heading text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                    ${res.title}
                </h3>

                <!-- Description -->
                <p class="text-sm text-slate-400 leading-relaxed mb-4">
                    ${res.desc}
                </p>

                <!-- Features list -->
                <ul class="space-y-1.5 mb-6 text-xs text-slate-300">
                    ${res.features.map(f => `
                        <li class="flex items-center gap-2">
                            <span class="text-cyan-400">✔</span>
                            <span>${f}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>

            <!-- Action Button -->
            <button onclick="window.openResource('${res.configKey}')" class="btn-electric w-full text-xs font-semibold py-2.5">
                <span>Open ${res.title}</span>
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
            </button>
        </div>
    `).join('');
}

// 7. Exam Mode Section
function renderExamMode() {
    const examGrid = document.getElementById('exam-mode-grid');
    if (!examGrid) return;

    examGrid.innerHTML = examModeCards.map(card => `
        <div class="glass-card p-6 flex flex-col justify-between group border-blue-500/20 hover:border-cyan-400/50">
            <div>
                <div class="flex items-center justify-between mb-3">
                    <span class="badge-blue text-xs">${card.tag}</span>
                    <span class="text-amber-400 font-mono text-xs font-bold">⚡ EXAM CAPSULE</span>
                </div>

                <h3 class="font-heading text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                    ${card.title}
                </h3>

                <p class="text-sm text-slate-400 mb-4">
                    ${card.shortDesc}
                </p>

                <div class="bg-[#050811] p-3 rounded-xl border border-blue-500/15 mb-6 space-y-1.5">
                    <div class="text-[11px] font-bold text-cyan-400 tracking-wide uppercase">Includes:</div>
                    ${card.highlights.slice(0, 3).map(h => `
                        <div class="text-xs text-slate-300 flex items-start gap-1.5">
                            <span class="text-blue-400">•</span>
                            <span>${h}</span>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="grid grid-cols-2 gap-2">
                <button onclick="window.openExamCardModal('${card.id}')" class="btn-ghost text-xs py-2 px-2 justify-center">
                    Quick Preview
                </button>
                <button onclick="window.openResource('${card.configKey}')" class="btn-electric text-xs py-2 px-2 justify-center">
                    Drive PDF ↗
                </button>
            </div>
        </div>
    `).join('');
}

window.openExamCardModal = (cardId) => {
    const card = examModeCards.find(c => c.id === cardId);
    if (!card) return;

    const modalContainer = document.getElementById('modal-root');
    if (!modalContainer) return;

    modalContainer.innerHTML = `
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay overflow-y-auto" onclick="window.handleModalBackdropClick(event)">
            <div class="relative w-full max-w-2xl glass-card bg-[#070B18]/95 border-blue-500/40 p-6 sm:p-8 rounded-2xl shadow-2xl animate-modal-pop my-8">
                
                <!-- Close Button -->
                <button onclick="window.closeModal()" class="absolute top-5 right-5 p-2 rounded-xl bg-blue-950/60 border border-blue-500/30 text-slate-300 hover:text-cyan-400 transition-colors">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>

                <div class="flex items-center gap-2 mb-2">
                    <span class="badge-blue">${card.tag}</span>
                    <span class="text-amber-400 text-xs font-bold font-mono">⚡ HIGH YIELD REVISION</span>
                </div>

                <h2 class="font-heading text-2xl font-bold text-white mb-2">${card.title}</h2>
                <p class="text-sm text-slate-300 mb-5 leading-relaxed">${card.shortDesc}</p>

                <div class="bg-[#050811] p-4 rounded-xl border border-blue-500/20 mb-6">
                    <div class="text-xs font-bold text-cyan-400 tracking-wider uppercase mb-3">Key Focus Topics in This Kit:</div>
                    <ul class="space-y-2">
                        ${card.highlights.map(h => `
                            <li class="flex items-start gap-2 text-xs sm:text-sm text-slate-200">
                                <span class="text-cyan-400 font-bold">✔</span>
                                <span>${h}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>

                <p class="text-xs text-slate-400 mb-6 bg-blue-950/30 p-3 rounded-lg border border-blue-500/15">
                    💡 ${card.previewNote}
                </p>

                <div class="flex justify-end gap-3">
                    <button onclick="window.closeModal()" class="btn-ghost text-xs py-2.5 px-4">Close</button>
                    <button onclick="window.openResource('${card.configKey}')" class="btn-electric text-xs py-2.5 px-5">Open in Google Drive ↗</button>
                </div>

            </div>
        </div>
    `;
    document.body.classList.add('overflow-hidden');
};

// 8. Interactive Quiz Engine
function renderQuiz() {
    const quizContainer = document.getElementById('interactive-quiz-container');
    if (!quizContainer) return;

    const currentQ = quizQuestions[appState.currentQuizIndex];
    const totalQ = quizQuestions.length;
    const currentAnswer = appState.quizAnswers[currentQ.id];
    const hasAnswered = currentAnswer !== undefined;

    quizContainer.innerHTML = `
        <div class="glass-card p-6 sm:p-8 border-blue-500/30 relative overflow-hidden bg-[#070C1A]">
            <div class="absolute -top-12 -right-12 w-48 h-48 bg-blue-600/10 rounded-full blur-2xl pointer-events-none"></div>

            <!-- Quiz Header -->
            <div class="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-blue-500/20">
                <div class="flex items-center gap-2">
                    <span class="badge-blue text-xs font-mono">QUESTION ${appState.currentQuizIndex + 1} OF ${totalQ}</span>
                    <span class="badge-cyan text-xs">${currentQ.topic}</span>
                </div>
                <div class="text-xs font-mono text-slate-300 bg-[#050811] px-3 py-1.5 rounded-lg border border-blue-500/20">
                    Current Score: <span class="font-bold text-cyan-400">${appState.quizScore}</span> / ${totalQ}
                </div>
            </div>

            <!-- Question Text -->
            <div class="mb-4">
                <h3 class="text-base sm:text-lg font-bold text-white leading-snug">
                    ${currentQ.question}
                </h3>
            </div>

            <!-- Code Snippet Box -->
            ${currentQ.codeSnippet ? `
                <div class="code-container p-4 mb-6 bg-[#040711] text-xs sm:text-sm text-slate-200">
                    <pre><code>${highlightPythonSyntax(currentQ.codeSnippet)}</code></pre>
                </div>
            ` : ''}

            <!-- 4 Multiple Choice Options -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                ${currentQ.options.map(opt => {
                    let btnClass = "bg-[#0A1024] border-blue-500/20 hover:border-cyan-400/60 text-slate-200";
                    let stateBadge = "";

                    if (hasAnswered) {
                        if (opt.id === currentQ.correctOption) {
                            btnClass = "bg-emerald-950/70 border-emerald-400 text-emerald-200 font-bold shadow-lg shadow-emerald-500/20";
                            stateBadge = "<span class='text-emerald-400 ml-auto'>✔ Correct</span>";
                        } else if (currentAnswer === opt.id) {
                            btnClass = "bg-rose-950/70 border-rose-500 text-rose-200 font-bold shadow-lg shadow-rose-500/20";
                            stateBadge = "<span class='text-rose-400 ml-auto'>✖ Incorrect</span>";
                        } else {
                            btnClass = "bg-[#080D1E]/40 border-blue-500/10 text-slate-500 opacity-60";
                        }
                    }

                    return `
                        <button 
                            onclick="window.selectQuizOption('${opt.id}')"
                            ${hasAnswered ? 'disabled' : ''}
                            class="p-4 rounded-xl border text-left text-xs sm:text-sm flex items-center gap-3 transition-all ${btnClass}"
                        >
                            <span class="w-7 h-7 rounded-lg bg-blue-900/40 border border-blue-500/30 flex items-center justify-center font-mono font-bold text-cyan-300">
                                ${opt.id}
                            </span>
                            <span class="flex-1 font-mono">${opt.text}</span>
                            ${stateBadge}
                        </button>
                    `;
                }).join('')}
            </div>

            <!-- Answer Explanation Box if answered -->
            ${hasAnswered ? `
                <div class="p-4 rounded-xl mb-6 text-xs sm:text-sm leading-relaxed ${currentAnswer === currentQ.correctOption ? 'bg-emerald-950/30 border border-emerald-500/30 text-emerald-300' : 'bg-rose-950/30 border border-rose-500/30 text-rose-300'} animate-modal-pop">
                    <div class="font-bold mb-1 flex items-center gap-2">
                        <span>${currentAnswer === currentQ.correctOption ? '🎉 Excellent! You got it right.' : '💡 Let\'s Understand Why:'}</span>
                    </div>
                    <p class="text-slate-300">${currentQ.explanation}</p>
                </div>
            ` : ''}

            <!-- Navigation & Full Quiz Link -->
            <div class="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-blue-500/20">
                <div class="flex items-center gap-2">
                    <button 
                        onclick="window.prevQuizQuestion()"
                        ${appState.currentQuizIndex === 0 ? 'disabled' : ''}
                        class="btn-ghost text-xs py-2 px-3 disabled:opacity-40 disabled:pointer-events-none"
                    >
                        ← Prev
                    </button>
                    <button 
                        onclick="window.nextQuizQuestion()"
                        ${appState.currentQuizIndex === totalQ - 1 ? 'disabled' : ''}
                        class="btn-ghost text-xs py-2 px-3 disabled:opacity-40 disabled:pointer-events-none"
                    >
                        Next →
                    </button>
                </div>

                <button onclick="window.openResource('quizzes')" class="btn-electric text-xs py-2 px-4 ml-auto">
                    <span>Take Full Online Quiz (All Chapters) →</span>
                </button>
            </div>
        </div>
    `;
}

window.selectQuizOption = (optId) => {
    const currentQ = quizQuestions[appState.currentQuizIndex];
    if (appState.quizAnswers[currentQ.id]) return; // already answered

    appState.quizAnswers[currentQ.id] = optId;
    if (optId === currentQ.correctOption) {
        appState.quizScore += 1;
    }
    renderQuiz();
};

window.prevQuizQuestion = () => {
    if (appState.currentQuizIndex > 0) {
        appState.currentQuizIndex -= 1;
        renderQuiz();
    }
};

window.nextQuizQuestion = () => {
    if (appState.currentQuizIndex < quizQuestions.length - 1) {
        appState.currentQuizIndex += 1;
        renderQuiz();
    }
};

// 9. Python Practical Lab Section
function renderPracticalLab() {
    // 1. Structure Cards
    const structureContainer = document.getElementById('practical-structure-cards');
    if (structureContainer) {
        structureContainer.innerHTML = practicalStructure.components.map(comp => `
            <div class="glass-card p-6 border-blue-500/20 flex flex-col justify-between">
                <div>
                    <div class="flex items-center justify-between mb-3">
                        <span class="badge-cyan text-xs font-mono font-bold">${comp.badge}</span>
                        <span class="text-xs text-slate-400 font-mono">CBSE PRACTICAL</span>
                    </div>
                    <h3 class="font-heading text-xl font-bold text-white mb-2">${comp.title}</h3>
                    <p class="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed">${comp.description}</p>
                    
                    <div class="bg-[#050811] p-3.5 rounded-xl border border-blue-500/15 space-y-2 mb-4">
                        <div class="text-[11px] font-bold text-cyan-400 tracking-wider uppercase">Mark Distribution:</div>
                        ${comp.breakdown.map(b => `
                            <div class="flex items-center justify-between text-xs text-slate-300">
                                <span>${b.item}</span>
                                <span class="font-mono text-cyan-300 font-semibold">${b.weight}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    }

    // 2. Program List & Filters
    renderPracticalPrograms();
}

function renderPracticalPrograms() {
    const listContainer = document.getElementById('practical-programs-container');
    const filterContainer = document.getElementById('practical-filter-bar');
    if (!listContainer) return;

    if (filterContainer) {
        filterContainer.innerHTML = `
            <div class="flex flex-col md:flex-row items-center justify-between gap-4 glass-card p-3 md:p-4 border-blue-500/20 mb-6">
                <!-- Search Input -->
                <div class="relative w-full md:w-80">
                    <svg class="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input 
                        type="text" 
                        id="practical-search-input"
                        placeholder="Search 20+ practical programs (e.g. Armstrong, Fibonacci, Palindrome)..."
                        class="w-full bg-[#050811] text-sm text-slate-200 pl-10 pr-4 py-2 rounded-xl border border-blue-500/30 focus:border-cyan-400 focus:outline-none placeholder-slate-500 transition-colors"
                    />
                </div>

                <!-- Category Filters -->
                <div class="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
                    ${practicalCategories.map(cat => `
                        <button onclick="window.setPracticalFilter('${cat}')" class="text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${appState.practicalFilter === cat ? 'bg-blue-600 text-white border-blue-400 shadow-md' : 'bg-[#090F24] text-slate-400 border-blue-500/20 hover:text-white'}">
                            ${cat}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;

        const searchInput = document.getElementById('practical-search-input');
        if (searchInput) {
            searchInput.value = appState.practicalSearchQuery;
            searchInput.addEventListener('input', (e) => {
                appState.practicalSearchQuery = e.target.value;
                renderPracticalPrograms();
            });
        }
    }

    // Filter Logic
    let filtered = practicalPrograms.filter(prog => {
        const q = appState.practicalSearchQuery.toLowerCase().trim();
        const matchesQuery = !q ||
            prog.title.toLowerCase().includes(q) ||
            prog.description.toLowerCase().includes(q) ||
            prog.tags.some(t => t.toLowerCase().includes(q));

        const matchesCat = appState.practicalFilter === "All" || prog.category === appState.practicalFilter;
        return matchesQuery && matchesCat;
    });

    if (filtered.length === 0) {
        listContainer.innerHTML = `
            <div class="col-span-full text-center py-12 glass-card border-blue-500/20">
                <div class="text-4xl mb-3">📂</div>
                <div class="text-lg font-semibold text-slate-300">No practical programs found for "${appState.practicalSearchQuery}"</div>
                <p class="text-sm text-slate-500 mt-1">Try another keyword or category filter.</p>
            </div>
        `;
        return;
    }

    listContainer.innerHTML = filtered.map(prog => `
        <div onclick="window.openProgramModal('${prog.id}')" class="glass-card glass-card-interactive p-5 flex flex-col justify-between group border-blue-500/20 hover:border-cyan-400/50">
            <div>
                <div class="flex items-center justify-between mb-3">
                    <span class="font-mono text-xs font-bold text-cyan-400 bg-blue-950/80 border border-blue-500/30 px-2.5 py-0.5 rounded">
                        PROG #${prog.num.toString().padStart(2, '0')}
                    </span>
                    <span class="badge-blue text-[11px]">${prog.category}</span>
                </div>

                <h3 class="font-heading text-base font-bold text-white group-hover:text-cyan-300 transition-colors mb-2 line-clamp-1">
                    ${prog.title}
                </h3>

                <p class="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-2">
                    ${prog.description}
                </p>

                <div class="flex flex-wrap gap-1.5 mb-4">
                    ${prog.tags.map(t => `
                        <span class="text-[10px] font-mono bg-[#050811] text-slate-400 px-2 py-0.5 rounded border border-blue-500/15">${t}</span>
                    `).join('')}
                </div>
            </div>

            <div class="pt-3 border-t border-blue-500/15 flex items-center justify-between text-xs">
                <span class="text-slate-400 font-mono">CBSE Verified</span>
                <span class="text-cyan-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    View Program →
                </span>
            </div>
        </div>
    `).join('');
}

window.setPracticalFilter = (cat) => {
    appState.practicalFilter = cat;
    renderPracticalPrograms();
};

window.openProgramModal = (progId) => {
    const prog = practicalPrograms.find(p => p.id === progId);
    if (!prog) return;

    appState.selectedProgramId = progId;
    const modalContainer = document.getElementById('modal-root');
    if (!modalContainer) return;

    modalContainer.innerHTML = `
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay overflow-y-auto" onclick="window.handleModalBackdropClick(event)">
            <div class="relative w-full max-w-3xl glass-card bg-[#070B18]/95 border-blue-500/40 p-6 sm:p-8 rounded-2xl shadow-2xl animate-modal-pop my-8 max-h-[90vh] overflow-y-auto">
                
                <!-- Close Button -->
                <button onclick="window.closeModal()" class="absolute top-5 right-5 p-2 rounded-xl bg-blue-950/60 border border-blue-500/30 text-slate-300 hover:text-cyan-400 transition-colors">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>

                <!-- Header -->
                <div class="flex items-center gap-2 mb-2">
                    <span class="font-mono text-xs font-bold text-cyan-400 bg-blue-950/80 border border-blue-500/30 px-2.5 py-1 rounded">PROGRAM #${prog.num}</span>
                    <span class="badge-cyan text-xs">${prog.category}</span>
                </div>

                <h2 class="font-heading text-xl sm:text-2xl font-bold text-white mb-2">${prog.title}</h2>
                <p class="text-xs sm:text-sm text-slate-300 mb-6 bg-blue-950/30 p-3 rounded-xl border border-blue-500/15">${prog.description}</p>

                <!-- Verified Python Code Box -->
                <div class="mb-6">
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-xs font-bold text-cyan-400 uppercase tracking-wider font-mono">Python 3 Source Code</span>
                        <button onclick="window.copyToClipboard(decodeURIComponent('${encodeURIComponent(prog.code)}'), this)" class="text-xs font-mono text-cyan-400 hover:text-white px-3 py-1 rounded-lg bg-blue-950/60 border border-blue-500/30 flex items-center gap-1.5 transition-colors">
                            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                            <span>Copy Program</span>
                        </button>
                    </div>
                    <div class="code-container p-4 bg-[#050811] text-xs sm:text-sm text-slate-200 overflow-x-auto max-h-80">
                        <pre><code>${highlightPythonSyntax(prog.code)}</code></pre>
                    </div>
                </div>

                <!-- Sample Input / Output -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 font-mono text-xs">
                    <div class="bg-[#050811] p-3.5 rounded-xl border border-blue-500/20">
                        <div class="text-slate-400 font-bold mb-1">SAMPLE INPUT:</div>
                        <pre class="text-cyan-300 whitespace-pre-wrap">${prog.sampleInput || "N/A"}</pre>
                    </div>
                    <div class="bg-[#050811] p-3.5 rounded-xl border border-blue-500/20">
                        <div class="text-slate-400 font-bold mb-1">SAMPLE OUTPUT:</div>
                        <pre class="text-emerald-300 whitespace-pre-wrap">${prog.sampleOutput || "N/A"}</pre>
                    </div>
                </div>

                <div class="flex justify-end gap-3 pt-4 border-t border-blue-500/20">
                    <button onclick="window.closeModal()" class="btn-ghost text-xs py-2 px-4">Close</button>
                    <button onclick="window.openResource('practicalPrograms')" class="btn-electric text-xs py-2 px-4">Open Full Lab Journal (Drive) ↗</button>
                </div>

            </div>
        </div>
    `;
    document.body.classList.add('overflow-hidden');
};

// 10. Teacher Section
function renderTeacherSection() {
    const teacherContainer = document.getElementById('teacher-profile-container');
    if (!teacherContainer) return;

    teacherContainer.innerHTML = `
        <div class="glass-card p-8 sm:p-10 border-blue-500/30 relative overflow-hidden bg-[#070C1A]">
            <div class="absolute -right-16 -top-16 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <!-- Avatar Column -->
                <div class="lg:col-span-4 flex flex-col items-center text-center">
                    <div class="relative group mb-4">
                        <div class="absolute -inset-1.5 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-3xl blur opacity-40 group-hover:opacity-75 transition duration-300"></div>
                        <div class="relative w-40 h-40 sm:w-48 sm:h-48 rounded-2xl bg-[#090F24] border border-blue-400/40 p-2 flex items-center justify-center overflow-hidden">
                            ${teacherInfo.avatar ? `
                                <img src="${teacherInfo.avatar}" alt="${teacherInfo.name}" class="w-full h-full object-cover rounded-xl" />
                            ` : `
                                <div class="w-full h-full bg-gradient-to-br from-blue-900/60 to-[#070B16] rounded-xl flex flex-col items-center justify-center p-4 text-center">
                                    <svg class="w-16 h-16 text-cyan-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 14c4 0 7 2 7 5H5c0-3 3-5 7-5zm0-2a4 4 0 100-8 4 4 0 000 8z" />
                                    </svg>
                                    <span class="text-[11px] font-mono text-slate-400">Teacher Profile</span>
                                </div>
                            `}
                        </div>
                    </div>

                    <h3 class="font-heading text-2xl font-bold text-white mb-1">${teacherInfo.name}</h3>
                    <div class="text-xs font-semibold tracking-wider text-cyan-400 uppercase mb-2">${teacherInfo.designation}</div>
                    <div class="text-xs text-slate-400 font-mono">${teacherInfo.school}</div>
                </div>

                <!-- Content Column -->
                <div class="lg:col-span-8 space-y-6">
                    <div>
                        <span class="badge-blue text-xs mb-3">Teacher's Message to Class 11</span>
                        <blockquote class="text-sm sm:text-base text-slate-200 leading-relaxed italic border-l-2 border-cyan-400 pl-4 bg-blue-950/20 py-3 rounded-r-xl">
                            "${teacherInfo.welcomeMessage}"
                        </blockquote>
                    </div>

                    <!-- Focus Areas -->
                    <div>
                        <div class="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2.5">Academic Focus & Teaching Areas:</div>
                        <div class="flex flex-wrap gap-2">
                            ${teacherInfo.subjects.map(subj => `
                                <span class="text-xs font-medium text-slate-200 bg-[#050811] px-3 py-1.5 rounded-lg border border-blue-500/20">
                                    💻 ${subj}
                                </span>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Highlights Grid -->
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                        ${teacherInfo.highlights.map(h => `
                            <div class="bg-[#050811] p-3 rounded-xl border border-blue-500/15">
                                <div class="text-[10px] font-mono text-slate-400 uppercase">${h.label}</div>
                                <div class="text-xs font-bold text-white mt-0.5">${h.value}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
}

// 11. Footer
function renderFooter() {
    const footerContainer = document.getElementById('footer-container');
    if (!footerContainer) return;

    footerContainer.innerHTML = `
        <footer class="bg-[#03050B] border-t border-blue-500/20 text-slate-400 text-xs sm:text-sm py-12">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
                    <!-- Brand Column -->
                    <div class="md:col-span-2 space-y-4">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center">
                                <svg class="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                </svg>
                            </div>
                            <div>
                                <div class="font-heading text-lg font-bold text-white tracking-wider">KV REWARI</div>
                                <div class="text-xs font-semibold text-cyan-400">CLASS 11 PYTHON HUB</div>
                            </div>
                        </div>
                        <p class="text-xs text-slate-400 max-w-md leading-relaxed">
                            A dedicated learning portal for Class 11 Computer Science students of Kendriya Vidyalaya Rewari (Session 2026–27). Designed for comprehensive syllabus mastery, practical proficiency, and high CBSE achievement.
                        </p>
                        <div class="text-xs font-mono text-cyan-400">
                            Tagline: Learn • Practice • Revise • Master Python
                        </div>
                    </div>

                    <!-- Quick Navigation -->
                    <div>
                        <div class="font-heading text-sm font-bold text-white uppercase tracking-wider mb-3">Quick Navigation</div>
                        <ul class="space-y-2 text-xs">
                            <li><a href="#hero" class="hover:text-cyan-400 transition-colors">Home</a></li>
                            <li><a href="#syllabus" class="hover:text-cyan-400 transition-colors">CBSE Class 11 Syllabus (Unit 2)</a></li>
                            <li><a href="#resources" class="hover:text-cyan-400 transition-colors">Resource Hub (Lectures & Notes)</a></li>
                            <li><a href="#learning-path" class="hover:text-cyan-400 transition-colors">5-Step Learning Path</a></li>
                            <li><a href="#exam-mode" class="hover:text-cyan-400 transition-colors">Exam Mode ⚡ Quick Revision</a></li>
                            <li><a href="#quiz" class="hover:text-cyan-400 transition-colors">Interactive Quiz Preview</a></li>
                            <li><a href="#practicals" class="hover:text-cyan-400 transition-colors">Practical Lab & 20+ Programs</a></li>
                            <li><a href="#teacher" class="hover:text-cyan-400 transition-colors">Meet Neelima Ma'am</a></li>
                        </ul>
                    </div>

                    <!-- Academic Info & Teacher Details -->
                    <div>
                        <div class="font-heading text-sm font-bold text-white uppercase tracking-wider mb-3">Academic Reference</div>
                        <ul class="space-y-2 text-xs text-slate-400">
                            <li><strong class="text-slate-200">School:</strong> Kendriya Vidyalaya Rewari</li>
                            <li><strong class="text-slate-200">Teacher:</strong> Neelima Ma'am (PGT CS)</li>
                            <li><strong class="text-slate-200">Subject:</strong> Computer Science (Code 083)</li>
                            <li><strong class="text-slate-200">Unit 2 Marks:</strong> 45 Theory Marks</li>
                            <li><strong class="text-slate-200">Practical:</strong> 30 Marks Exam</li>
                            <li><strong class="text-slate-200">Session:</strong> 2026–27 (CBSE Class XI)</li>
                        </ul>
                    </div>
                </div>

                <!-- Student Developer Credits Strip -->
                <div class="mt-8 pt-6 border-t border-blue-500/25 flex flex-col md:flex-row items-center justify-between gap-4 bg-[#070C1B] p-4 rounded-xl border border-blue-500/20">
                    <div class="flex items-center gap-3">
                        <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-[1.5px] shadow-lg shadow-blue-500/20">
                            <div class="w-full h-full bg-[#050811] rounded-[10px] flex items-center justify-center">
                                <svg class="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                </svg>
                            </div>
                        </div>
                        <div>
                            <div class="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Project Developers & Student Architects:</div>
                            <div class="text-sm font-bold text-white flex flex-wrap items-center gap-1.5 font-heading">
                                <span>Created by</span>
                                <span class="text-cyan-400 font-mono bg-blue-950/70 border border-blue-500/30 px-2 py-0.5 rounded text-xs">Harsh Khola 11B</span>
                                <span>and</span>
                                <span class="text-cyan-400 font-mono bg-blue-950/70 border border-blue-500/30 px-2 py-0.5 rounded text-xs">Yash Vedi 11B</span>
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center gap-2">
                        <span class="badge-blue text-xs font-mono">KV Rewari • Class 11-B</span>
                        <span class="badge-cyan text-xs font-mono">Session 2026–27</span>
                    </div>
                </div>

                <!-- Bottom Copyright & Academic Note -->
                <div class="pt-6 mt-4 border-t border-blue-500/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                    <div>
                        Made for Class 11 Students of Kendriya Vidyalaya Rewari • CBSE Class XI 2026–27
                    </div>
                    <div class="flex items-center gap-3">
                        <span>Educational Resource Portal</span>
                        <span>•</span>
                        <a href="#hero" class="text-cyan-400 hover:text-white transition-colors flex items-center gap-1">
                            <span>Back to Top</span>
                            <span>↑</span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    `;
}

// 12. Centralized Google Drive Link Handler
window.openResource = (key) => {
    const url = resourceLinks[key];
    if (url && url.trim() !== "") {
        window.open(url, "_blank", "noopener,noreferrer");
    } else {
        window.openComingSoonModal(key);
    }
};

window.openComingSoonModal = (key) => {
    const resourceNames = {
        lectures: "Recorded Video Lectures",
        notes: "Class Notes & Revision PDFs",
        animatedNotes: "Animated Short Notes",
        mindMaps: "Visual Chapter Mind Maps",
        quizzes: "Full Online Quiz Bank",
        practice: "Python Practice Problem Sets",
        importantPrograms: "Top 20 Important Programs PDF",
        importantQuestions: "High Yield Questions Bank",
        syntaxSheet: "Python Syntax Quick Reference Cheat Sheet",
        definitions: "Standard NCERT Definitions & Glossary",
        oneDayRevision: "1-Day Before Exam Quick Revision Capsule",
        chapterRevision: "Comprehensive Chapter-wise Revision Notes",
        practicalPrograms: "Class 11 Practical Record File PDF",
        projectResources: "Python Project Blueprints & Resources"
    };

    const name = resourceNames[key] || "Study Resource";

    const modalContainer = document.getElementById('modal-root');
    if (!modalContainer) return;

    modalContainer.innerHTML = `
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay" onclick="window.handleModalBackdropClick(event)">
            <div class="relative w-full max-w-md glass-card bg-[#070B18]/95 border-blue-500/40 p-6 sm:p-8 rounded-2xl shadow-2xl animate-modal-pop text-center">
                
                <!-- Icon -->
                <div class="w-16 h-16 rounded-2xl bg-blue-950/80 border border-blue-500/40 flex items-center justify-center text-3xl mx-auto mb-4 text-cyan-400 shadow-lg shadow-blue-500/20">
                    📂
                </div>

                <span class="badge-blue text-xs font-mono mb-2">GOOGLE DRIVE LINK</span>

                <h3 class="font-heading text-xl font-bold text-white mb-2">${name}</h3>
                <p class="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
                    This resource will be added soon by your teacher. Once uploaded, the Google Drive link will open directly from this button.
                </p>

                <div class="bg-[#050811] p-3 rounded-xl border border-blue-500/20 text-left mb-6 font-mono text-[11px] text-slate-400">
                    <span class="text-cyan-400 font-bold">Teacher Note:</span> Paste the Google Drive link inside <code class="text-slate-200">src/data/config.js</code> under <code class="text-slate-200">resourceLinks.${key}</code>.
                </div>

                <button onclick="window.closeModal()" class="btn-electric w-full text-xs font-semibold py-2.5">
                    Got it! Close
                </button>
            </div>
        </div>
    `;
    document.body.classList.add('overflow-hidden');
};

// Generic Modal Helpers
window.closeModal = () => {
    const modalContainer = document.getElementById('modal-root');
    if (modalContainer) {
        modalContainer.innerHTML = "";
    }
    document.body.classList.remove('overflow-hidden');
};

window.handleModalBackdropClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        window.closeModal();
    }
};

window.copyToClipboard = (text, btnElement) => {
    navigator.clipboard.writeText(text).then(() => {
        if (btnElement) {
            const originalText = btnElement.innerHTML;
            btnElement.innerHTML = `<span class="text-emerald-400">✔ Copied!</span>`;
            setTimeout(() => {
                btnElement.innerHTML = originalText;
            }, 2000);
        }
    }).catch(err => {
        console.error("Copy failed", err);
    });
};

// Global Event Listeners & ESC Key to close modals
function setupGlobalEventListeners() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            window.closeModal();
        }
    });
}

// Scroll Spy for Navigation Active Glow
function setupScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${current}`) {
                link.classList.add('text-cyan-400', 'bg-blue-500/10', 'border-b-2', 'border-cyan-400');
            } else {
                link.classList.remove('text-cyan-400', 'bg-blue-500/10', 'border-b-2', 'border-cyan-400');
            }
        });
    });
}
