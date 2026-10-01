/**
 * CS 11 — COMPUTER SCIENCE LEARNING HUB
 * PM SHRI Kendriya Vidyalaya, Rewari (CBSE 2026–27)
 * Master Application Controller & Interactive Logic
 */

import { resourceLinks, teacherInfo, schoolInfo } from './data/config.js';
import { syllabusOverview, syllabusTopics, syllabusCategories } from './data/syllabus.js';
import { practicalStructure, practicalCategories, practicalPrograms } from './data/practicalPrograms.js';
import { studyLibraryResources, resourceCategories } from './data/resources.js';
import { quickAccessItems, highYieldTopics, syntaxCheatSheet, oneDayRevisionGuide, officialMockExams } from './data/examModeData.js';
import { practiceCategories, quizQuestions } from './data/quizData.js';

// ==========================================================================
// Global Application State
// ==========================================================================
const state = {
    theme: localStorage.getItem('cs11_theme') || 'light',
    activeModal: null,
    libraryCategory: 'all',
    librarySearch: '',
    chapterReaderTopicId: 'cs-01',
    chapterFilter: 'all',
    chapterSearch: '',
    practicalCategory: 'All',
    practicalSearch: '',
    practiceCategory: 'all',
    practiceFilter: 'all',
    practiceAnswers: {},
    practiceScore: 0,
    examState: {
        activeExam: null,
        currentIndex: 0,
        answers: {},
        markedForReview: new Set(),
        timeRemaining: 0,
        timerInterval: null,
        isSubmitted: false
    },
    pyodideInstance: null,
    pyodideLoading: false,
    pyodideError: null
};

// ==========================================================================
// Initialization
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initStudyLibrary();
    initVisitorCounter();
    setupGlobalSearch();
    setupKeyboardShortcuts();
    exposeGlobalFunctions();
});

// ==========================================================================
// Theme Management (Light Theme Default)
// ==========================================================================
function initTheme() {
    if (state.theme === 'dark') {
        document.body.classList.add('dark-mode');
        document.documentElement.classList.add('dark');
        toggleThemeIcons(true);
    } else {
        document.body.classList.remove('dark-mode');
        document.documentElement.classList.remove('dark');
        toggleThemeIcons(false);
    }
}

function toggleTheme() {
    const isDark = document.body.classList.toggle('dark-mode');
    document.documentElement.classList.toggle('dark', isDark);
    state.theme = isDark ? 'dark' : 'light';
    localStorage.setItem('cs11_theme', state.theme);
    toggleThemeIcons(isDark);
}

function toggleThemeIcons(isDark) {
    const sunIcon = document.getElementById('theme-sun-icon');
    const moonIcon = document.getElementById('theme-moon-icon');
    if (sunIcon && moonIcon) {
        if (isDark) {
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
        } else {
            sunIcon.classList.remove('hidden');
            moonIcon.classList.add('hidden');
        }
    }
}

function toggleMobileMenu() {
    const drawer = document.getElementById('mobile-drawer');
    if (drawer) {
        drawer.classList.toggle('hidden');
    }
}

// ==========================================================================
// 1. Study Library Engine (7 Google Drive Resources in Exact Order)
// ==========================================================================
function initStudyLibrary() {
    renderStudyLibraryFilters();
    renderStudyLibraryCards();

    const searchInput = document.getElementById('library-search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            state.librarySearch = e.target.value;
            renderStudyLibraryCards();
        });
    }
}

function renderStudyLibraryFilters() {
    const container = document.getElementById('library-filter-container');
    if (!container) return;

    container.innerHTML = resourceCategories.map(cat => `
        <button onclick="window.setLibraryCategory('${cat.id}')" class="filter-pill ${state.libraryCategory === cat.id ? 'active' : ''}">
            ${cat.name}
        </button>
    `).join('');
}

function setLibraryCategory(categoryId) {
    state.libraryCategory = categoryId;
    renderStudyLibraryFilters();
    renderStudyLibraryCards();
}

function renderStudyLibraryCards() {
    const container = document.getElementById('drive-resources-grid');
    if (!container) return;

    // Filter resources while strictly preserving 01-07 order
    const filtered = studyLibraryResources.filter(res => {
        const matchesCategory = state.libraryCategory === 'all' || res.category === state.libraryCategory;
        const query = state.librarySearch.toLowerCase().trim();
        const matchesSearch = !query || 
            res.title.toLowerCase().includes(query) || 
            res.description.toLowerCase().includes(query) ||
            res.categoryName.toLowerCase().includes(query);
        return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="col-span-full p-8 text-center bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
                <span class="text-2xl mb-2 block">🔍</span>
                <p class="text-sm font-semibold text-slate-700 dark:text-slate-300">No resources found matching "${escapeHtml(state.librarySearch)}"</p>
                <button onclick="window.resetLibraryFilters()" class="mt-3 text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
                    Reset search and filters
                </button>
            </div>
        `;
        return;
    }

    container.innerHTML = filtered.map(res => {
        const accentBg = {
            amber: 'bg-amber-50 dark:bg-amber-950/50 border-amber-200/80 dark:border-amber-900/60',
            purple: 'bg-purple-50 dark:bg-purple-950/50 border-purple-200/80 dark:border-purple-900/60',
            blue: 'bg-blue-50 dark:bg-blue-950/50 border-blue-200/80 dark:border-blue-900/60',
            indigo: 'bg-indigo-50 dark:bg-indigo-950/50 border-indigo-200/80 dark:border-indigo-900/60',
            orange: 'bg-orange-50 dark:bg-orange-950/50 border-orange-200/80 dark:border-orange-900/60',
            rose: 'bg-rose-50 dark:bg-rose-950/50 border-rose-200/80 dark:border-rose-900/60',
            emerald: 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200/80 dark:border-emerald-900/60'
        }[res.accent] || 'bg-slate-50 border-slate-200';

        return `
            <div onclick="window.openDriveResource('${res.driveUrl}')" class="drive-resource-card group">
                <div>
                    <!-- Card Top Row: Order Badge & Category -->
                    <div class="flex items-center justify-between gap-2 mb-3">
                        <span class="card-order-badge">0${parseInt(res.order, 10)}</span>
                        <span class="text-[11px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            <span>Google Drive</span>
                        </span>
                    </div>

                    <!-- Icon & Title -->
                    <div class="flex items-start gap-3.5 mb-2.5">
                        <div class="card-icon-wrapper ${accentBg} border">
                            ${res.iconSvg}
                        </div>
                        <div class="flex-1 min-w-0">
                            <h3 class="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-tight">
                                ${res.title}
                            </h3>
                            <span class="text-[11px] font-medium text-indigo-600 dark:text-indigo-400 mt-0.5 block">
                                ${res.categoryName}
                            </span>
                        </div>
                    </div>

                    <!-- Description -->
                    <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                        ${res.description}
                    </p>
                </div>

                <!-- Card Bottom Row: Action Button with External Link Icon -->
                <div class="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                    <span class="text-[11px] text-slate-400 font-medium">Public Access</span>
                    <a href="${res.driveUrl}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()" class="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 group-hover:underline">
                        <span>Open Folder</span>
                        <svg class="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>
                </div>
            </div>
        `;
    }).join('');
}

function openDriveResource(url) {
    if (url) {
        window.open(url, '_blank', 'noopener,noreferrer');
    }
}

function resetLibraryFilters() {
    state.libraryCategory = 'all';
    state.librarySearch = '';
    const searchInput = document.getElementById('library-search-input');
    if (searchInput) searchInput.value = '';
    renderStudyLibraryFilters();
    renderStudyLibraryCards();
}

// ==========================================================================
// 2. Persistent Central Website Visitor Counter
// ==========================================================================
async function initVisitorCounter() {
    const counterEl = document.getElementById('visitor-count');
    if (!counterEl) return;

    const sessionCounted = sessionStorage.getItem('cs11_session_hit');
    const cachedCount = localStorage.getItem('cs11_last_known_count');

    // If already counted in this session, show cached count without incrementing
    if (sessionCounted && cachedCount) {
        counterEl.textContent = formatVisitorCount(cachedCount);
        return;
    }

    // Try 1: Call internal /api/visitor-count
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);
        const apiUrl = `/api/visitor-count${sessionCounted ? '' : '?hit=1'}`;
        const res = await fetch(apiUrl, { signal: controller.signal });
        clearTimeout(timeoutId);
        if (res.ok) {
            const data = await res.json();
            if (data && data.count) {
                const countStr = String(data.count);
                sessionStorage.setItem('cs11_session_hit', countStr);
                localStorage.setItem('cs11_last_known_count', countStr);
                counterEl.textContent = formatVisitorCount(countStr);
                return;
            }
        }
    } catch (e) {
        // Continue to direct hits.sh fallback
    }

    // Try 2: Central persistent hits counter fallback
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 4000);

        // Fetch hits.sh endpoint for persistent shared counter across all users
        const response = await fetch('https://hits.sh/11science.vercel.app.svg', {
            signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (response.ok) {
            const svgText = await response.text();
            const match = svgText.match(/hits:\s*([\d,]+)/i) || svgText.match(/<title>hits:\s*([\d,]+)<\/title>/i);
            if (match && match[1]) {
                const countStr = match[1].replace(/,/g, '');
                sessionStorage.setItem('cs11_session_hit', countStr);
                localStorage.setItem('cs11_last_known_count', countStr);
                counterEl.textContent = formatVisitorCount(countStr);
                return;
            }
        }
    } catch (err) {
        console.warn('Central visitor counter sync notice:', err);
    }

    // Fallback: If network failed or offline, show last known count or clean status
    if (cachedCount) {
        counterEl.textContent = formatVisitorCount(cachedCount);
    } else {
        counterEl.textContent = 'Active';
    }
}

function formatVisitorCount(val) {
    const num = parseInt(val, 10);
    if (isNaN(num)) return 'Active';
    return Number(num).toLocaleString('en-IN');
}

// ==========================================================================
// 3. Modal Overlay Management
// ==========================================================================
function openModal(modalHtml, modalId = 'generic-modal') {
    closeModal();
    const modalRoot = document.getElementById('modal-root');
    if (!modalRoot) return;

    modalRoot.innerHTML = `
        <div id="${modalId}" class="modal-overlay active">
            ${modalHtml}
        </div>
    `;

    state.activeModal = modalId;
    document.body.style.overflow = 'hidden';

    const overlay = document.getElementById(modalId);
    if (overlay) {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeModal();
            }
        });
    }
}

function closeModal() {
    const modalRoot = document.getElementById('modal-root');
    if (modalRoot) {
        modalRoot.innerHTML = '';
    }
    state.activeModal = null;
    document.body.style.overflow = 'auto';

    if (state.examState.timerInterval) {
        clearInterval(state.examState.timerInterval);
        state.examState.timerInterval = null;
    }
}

// ==========================================================================
// 4. Chapter Reader / Learning Experience (CBSE Units 1, 2, 3)
// ==========================================================================
function openChapterReader(topicId = 'cs-01') {
    state.chapterReaderTopicId = topicId;
    renderChapterReaderModal();
}

function filterAndOpenCategory(categoryId) {
    state.chapterFilter = categoryId;
    const match = syllabusTopics.find(t => t.category === categoryId) || syllabusTopics[0];
    state.chapterReaderTopicId = match.id;
    renderChapterReaderModal();
}

function renderChapterReaderModal() {
    const currentTopic = syllabusTopics.find(t => t.id === state.chapterReaderTopicId) || syllabusTopics[0];
    const currentIndex = syllabusTopics.findIndex(t => t.id === currentTopic.id);
    const prevTopic = currentIndex > 0 ? syllabusTopics[currentIndex - 1] : null;
    const nextTopic = currentIndex < syllabusTopics.length - 1 ? syllabusTopics[currentIndex + 1] : null;

    const filteredTopics = syllabusTopics.filter(t => {
        const matchesCategory = state.chapterFilter === 'all' || t.category === state.chapterFilter;
        const matchesSearch = !state.chapterSearch || 
            t.title.toLowerCase().includes(state.chapterSearch.toLowerCase()) ||
            t.shortDesc.toLowerCase().includes(state.chapterSearch.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const modalHtml = `
        <div class="modal-container max-w-6xl h-[92vh]">
            <div class="modal-header bg-slate-50 dark:bg-slate-800/80">
                <div class="flex items-center gap-3">
                    <span class="px-2.5 py-1 rounded-md bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider">
                        ${currentTopic.unitTitle.split(':')[0]}
                    </span>
                    <h3 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white truncate max-w-md">
                        ${currentTopic.number}: ${currentTopic.title}
                    </h3>
                </div>
                <button onclick="window.closeModal()" class="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 flex items-center justify-center text-slate-600 dark:text-slate-300 text-sm font-bold">
                    ✕
                </button>
            </div>

            <div class="modal-body p-0 flex flex-col md:flex-row overflow-hidden flex-1">
                <!-- Left Sidebar -->
                <div class="w-full md:w-80 bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col h-auto md:h-full">
                    <div class="p-3 border-b border-slate-200 dark:border-slate-800 space-y-2">
                        <input type="text" id="reader-search-input" value="${state.chapterSearch}" placeholder="Filter topics..." class="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500">
                        <select id="reader-category-select" class="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                            ${syllabusCategories.map(c => `
                                <option value="${c.id}" ${state.chapterFilter === c.id ? 'selected' : ''}>${c.label}</option>
                            `).join('')}
                        </select>
                    </div>

                    <div class="overflow-y-auto flex-1 p-2 space-y-1">
                        ${filteredTopics.map(t => `
                            <button onclick="window.selectReaderTopic('${t.id}')" class="w-full text-left p-2.5 rounded-lg text-xs transition-colors flex items-start justify-between gap-2 ${t.id === currentTopic.id ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800'}">
                                <div>
                                    <div class="font-medium truncate">${t.number}. ${t.title}</div>
                                    <div class="text-[10px] opacity-75 truncate">${t.tag}</div>
                                </div>
                                <span class="text-[10px] px-1.5 py-0.5 rounded ${t.id === currentTopic.id ? 'bg-indigo-700 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}">
                                    ${t.unitNumber === 1 ? '10M' : (t.unitNumber === 2 ? '45M' : '15M')}
                                </span>
                            </button>
                        `).join('')}
                    </div>
                </div>

                <!-- Right Main Content Panel -->
                <div class="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 bg-white dark:bg-slate-900">
                    <div class="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100 dark:border-slate-800">
                        <div class="flex items-center gap-1.5">
                            <span>CBSE Class 11</span>
                            <span>/</span>
                            <span>${currentTopic.unitTitle}</span>
                            <span>/</span>
                            <span class="text-indigo-600 font-semibold">${currentTopic.title}</span>
                        </div>
                        <span class="font-semibold text-indigo-600 bg-indigo-50 dark:bg-indigo-900/40 px-2 py-0.5 rounded">
                            CBSE Weightage: ${currentTopic.cbseMarks}
                        </span>
                    </div>

                    <div class="space-y-3">
                        <h2 class="text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                            ${currentTopic.number}: ${currentTopic.title}
                        </h2>
                        <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                            <span class="font-semibold text-slate-900 dark:text-white">Concept Overview:</span> ${currentTopic.overview}
                        </div>
                    </div>

                    <div class="space-y-3">
                        <h4 class="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide">
                            Official CBSE Curriculum Subtopics
                        </h4>
                        <ul class="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                            ${currentTopic.subtopics.map(st => `
                                <li class="flex items-start gap-2.5">
                                    <span class="text-indigo-500 font-bold mt-0.5">•</span>
                                    <span>${st}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>

                    ${currentTopic.builtInMethods ? `
                        <div class="space-y-2">
                            <h4 class="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide">
                                Key Methods & Functions Covered
                            </h4>
                            <div class="flex flex-wrap gap-1.5">
                                ${currentTopic.builtInMethods.map(m => `
                                    <span class="font-mono text-xs px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60">
                                        ${m}
                                    </span>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}

                    <div class="space-y-3 pt-2">
                        <div class="flex items-center justify-between">
                            <h4 class="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide">
                                Practical Python Implementation
                            </h4>
                            <div class="flex items-center gap-2">
                                <button onclick="window.copyToClipboard(\`${escapeForAttribute(currentTopic.sampleCode)}\`)" class="text-xs px-2.5 py-1 rounded border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-1">
                                    <span>📋 Copy</span>
                                </button>
                                <button onclick="window.openPythonLabWithCode(\`${escapeForAttribute(currentTopic.sampleCode)}\`)" class="text-xs px-3 py-1 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-700 flex items-center gap-1">
                                    <span>▶ Run in Python Lab</span>
                                </button>
                            </div>
                        </div>

                        <div class="terminal-window">
                            <div class="terminal-header">
                                <span class="text-[11px] text-slate-400 font-mono">${currentTopic.number}_demo.py</span>
                                <span class="text-[10px] text-slate-500">Python 3</span>
                            </div>
                            <pre class="terminal-body font-mono text-xs sm:text-sm text-cyan-300">${escapeHtml(currentTopic.sampleCode)}</pre>
                        </div>

                        ${currentTopic.sampleOutput ? `
                            <div class="p-3.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-400">
                                <span class="text-slate-500 block mb-1 font-sans text-[11px] font-bold uppercase">Expected Console Output:</span>
                                <pre class="whitespace-pre-wrap">${escapeHtml(currentTopic.sampleOutput)}</pre>
                            </div>
                        ` : ''}
                    </div>

                    ${currentTopic.suggestedPrograms ? `
                        <div class="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                            <h4 class="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide">
                                Suggested Practice Questions
                            </h4>
                            <div class="space-y-2">
                                ${currentTopic.suggestedPrograms.map((prog, idx) => `
                                    <div class="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70 text-xs text-slate-800 dark:text-slate-200 flex items-start gap-2.5">
                                        <span class="font-bold text-indigo-600">Q${idx + 1}.</span>
                                        <span>${prog}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                </div>
            </div>

            <div class="modal-footer">
                ${prevTopic ? `
                    <button onclick="window.selectReaderTopic('${prevTopic.id}')" class="btn-secondary text-xs py-2 px-3">
                        ← Previous: ${prevTopic.title}
                    </button>
                ` : '<div></div>'}
                ${nextTopic ? `
                    <button onclick="window.selectReaderTopic('${nextTopic.id}')" class="btn-primary text-xs py-2 px-3">
                        Next: ${nextTopic.title} →
                    </button>
                ` : '<div></div>'}
            </div>
        </div>
    `;

    openModal(modalHtml, 'chapter-reader-modal');

    const searchInput = document.getElementById('reader-search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            state.chapterSearch = e.target.value;
            renderChapterReaderModal();
        });
    }

    const categorySelect = document.getElementById('reader-category-select');
    if (categorySelect) {
        categorySelect.addEventListener('change', (e) => {
            state.chapterFilter = e.target.value;
            renderChapterReaderModal();
        });
    }
}

function selectReaderTopic(topicId) {
    state.chapterReaderTopicId = topicId;
    renderChapterReaderModal();
}

// ==========================================================================
// 5. Python Practical Lab (Real Pyodide WebAssembly)
// ==========================================================================
function openPythonLab(initialCode = null) {
    const defaultCode = initialCode || `# Python 3 Interactive Coding Lab
# PM SHRI Kendriya Vidyalaya, Rewari (CBSE 2026-27)

def greet(name):
    return f"Hello, {name}! Welcome to Python Lab."

print(greet("Class 11 Student"))

for i in range(1, 6):
    print(f"Counting: {i} * 2 = {i * 2}")
`;

    const modalHtml = `
        <div class="modal-container max-w-5xl h-[92vh]">
            <div class="modal-header bg-slate-900 text-white border-slate-800">
                <div class="flex items-center gap-3">
                    <span class="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-mono font-bold text-sm">&lt;/&gt;</span>
                    <div>
                        <h3 class="text-base font-bold text-white flex items-center gap-2">
                            <span>Python Practical Lab</span>
                            <span id="pyodide-status-badge" class="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono">
                                Initializing Engine...
                            </span>
                        </h3>
                        <p class="text-xs text-slate-400">Genuine in-browser Python 3 execution sandbox</p>
                    </div>
                </div>
                <div class="flex items-center gap-2">
                    <select id="lab-program-loader" class="text-xs bg-slate-800 border border-slate-700 text-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none">
                        <option value="">Load CBSE Practical Program...</option>
                        ${practicalPrograms.map(p => `
                            <option value="${p.id}">Prog ${p.num}: ${p.title}</option>
                        `).join('')}
                    </select>
                    <button onclick="window.closeModal()" class="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 text-sm font-bold">
                        ✕
                    </button>
                </div>
            </div>

            <div class="modal-body p-4 grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 overflow-hidden bg-slate-950">
                <!-- Editor -->
                <div class="lg:col-span-7 flex flex-col h-full space-y-2">
                    <div class="flex items-center justify-between text-xs text-slate-400">
                        <span class="font-mono text-cyan-400">main.py</span>
                        <div class="flex items-center gap-2">
                            <button onclick="window.copyLabCode()" class="hover:text-white px-2 py-0.5 rounded bg-slate-800">Copy Code</button>
                            <button onclick="window.resetLabCode()" class="hover:text-white px-2 py-0.5 rounded bg-slate-800">Reset</button>
                        </div>
                    </div>
                    <textarea id="lab-code-editor" class="flex-1 w-full p-4 font-mono text-xs sm:text-sm bg-slate-900 border border-slate-800 text-slate-100 rounded-xl focus:outline-none focus:border-indigo-500 resize-none leading-relaxed" spellcheck="false">${escapeHtml(defaultCode)}</textarea>
                </div>

                <!-- Console -->
                <div class="lg:col-span-5 flex flex-col h-full space-y-2">
                    <div class="flex items-center justify-between text-xs text-slate-400">
                        <span class="font-mono">Output Console</span>
                        <button onclick="window.clearLabConsole()" class="hover:text-white px-2 py-0.5 rounded bg-slate-800">Clear</button>
                    </div>
                    <div id="lab-output-console" class="flex-1 w-full p-4 font-mono text-xs bg-slate-900 border border-slate-800 text-emerald-400 rounded-xl overflow-y-auto whitespace-pre-wrap leading-relaxed select-text">
Click "Run Code" to execute Python script.
                    </div>
                </div>
            </div>

            <div class="modal-footer bg-slate-900 border-slate-800">
                <span class="text-xs text-slate-400 mr-auto hidden sm:inline">
                    Runs client-side in WebAssembly sandbox. Safe & isolated.
                </span>
                <button onclick="window.runPythonCode()" id="lab-run-btn" class="btn-primary text-xs py-2.5 px-6">
                    <span>▶ Run Code</span>
                </button>
            </div>
        </div>
    `;

    openModal(modalHtml, 'python-lab-modal');

    const loader = document.getElementById('lab-program-loader');
    if (loader) {
        loader.addEventListener('change', (e) => {
            const prog = practicalPrograms.find(p => p.id === e.target.value);
            if (prog) {
                const editor = document.getElementById('lab-code-editor');
                if (editor) editor.value = prog.code;
            }
        });
    }

    ensurePyodideLoaded();
}

function openPythonLabWithCode(code) {
    openPythonLab(code);
}

async function ensurePyodideLoaded() {
    const badge = document.getElementById('pyodide-status-badge');
    if (state.pyodideInstance) {
        if (badge) {
            badge.textContent = 'Engine Ready (Python 3.12)';
            badge.className = 'text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono';
        }
        return state.pyodideInstance;
    }

    if (state.pyodideLoading) return;
    state.pyodideLoading = true;

    try {
        if (badge) badge.textContent = 'Loading WebAssembly...';
        if (typeof window.loadPyodide === 'function') {
            state.pyodideInstance = await window.loadPyodide();
            if (badge) {
                badge.textContent = 'Engine Ready (Python 3.12)';
                badge.className = 'text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono';
            }
        }
    } catch (err) {
        console.warn('Pyodide CDN initialization notice:', err);
        if (badge) {
            badge.textContent = 'Standard Mode';
            badge.className = 'text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-mono';
        }
    } finally {
        state.pyodideLoading = false;
    }
}

async function runPythonCode() {
    const editor = document.getElementById('lab-code-editor');
    const consoleEl = document.getElementById('lab-output-console');
    const runBtn = document.getElementById('lab-run-btn');
    if (!editor || !consoleEl) return;

    const code = editor.value;
    consoleEl.textContent = 'Executing Python code...\n';
    if (runBtn) runBtn.disabled = true;

    const startTime = performance.now();

    try {
        if (state.pyodideInstance) {
            let outputBuffer = '';
            state.pyodideInstance.setStdout({
                batched: (str) => { outputBuffer += str + '\n'; }
            });
            state.pyodideInstance.setStderr({
                batched: (str) => { outputBuffer += '[Error] ' + str + '\n'; }
            });

            await state.pyodideInstance.runPythonAsync(code);
            const duration = ((performance.now() - startTime) / 1000).toFixed(3);
            consoleEl.textContent = outputBuffer || '(Program completed with no output)';
            consoleEl.textContent += `\n\n-----------------------------\n[Process completed in ${duration}s]`;
        } else {
            const result = simulatePythonExecution(code);
            consoleEl.textContent = result;
        }
    } catch (err) {
        consoleEl.textContent = `Traceback (most recent call last):\n${err.message || err}`;
    } finally {
        if (runBtn) runBtn.disabled = false;
    }
}

function simulatePythonExecution(code) {
    let output = '';
    const lines = code.split('\n');
    lines.forEach(line => {
        const trimmed = line.trim();
        if (trimmed.startsWith('print(') && trimmed.endsWith(')')) {
            const inner = trimmed.slice(6, -1);
            if ((inner.startsWith('"') && inner.endsWith('"')) || (inner.startsWith("'") && inner.endsWith("'"))) {
                output += inner.slice(1, -1) + '\n';
            } else {
                output += inner + '\n';
            }
        }
    });
    return output || 'Loading Python runtime... Please wait a few moments and click Run Code again!';
}

function copyLabCode() {
    const editor = document.getElementById('lab-code-editor');
    if (editor) copyToClipboard(editor.value);
}

function resetLabCode() {
    openPythonLab();
}

function clearLabConsole() {
    const consoleEl = document.getElementById('lab-output-console');
    if (consoleEl) consoleEl.textContent = '';
}

// ==========================================================================
// 6. CBSE Practical Programs Hub (21+ Programs)
// ==========================================================================
function openPracticalsHub() {
    renderPracticalsHubModal();
}

function renderPracticalsHubModal() {
    const filtered = practicalPrograms.filter(p => {
        const matchesCategory = state.practicalCategory === 'All' || p.category === state.practicalCategory;
        const matchesSearch = !state.practicalSearch || 
            p.title.toLowerCase().includes(state.practicalSearch.toLowerCase()) ||
            p.description.toLowerCase().includes(state.practicalSearch.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const modalHtml = `
        <div class="modal-container max-w-5xl h-[92vh]">
            <div class="modal-header bg-slate-50 dark:bg-slate-800">
                <div class="flex items-center gap-3">
                    <span class="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center font-bold text-sm">🧪</span>
                    <div>
                        <h3 class="text-base font-bold text-slate-900 dark:text-white">CBSE Practical Programs Hub (30 Marks)</h3>
                        <p class="text-xs text-slate-500 dark:text-slate-400">21+ Verified Class 11 Computer Science (083) Programs with Source Code</p>
                    </div>
                </div>
                <button onclick="window.closeModal()" class="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 flex items-center justify-center text-slate-600 dark:text-slate-300 text-sm font-bold">
                    ✕
                </button>
            </div>

            <div class="p-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col sm:flex-row gap-3 items-center justify-between">
                <div class="flex flex-wrap gap-1.5 w-full sm:w-auto">
                    ${practicalCategories.map(cat => `
                        <button onclick="window.setPracticalCategory('${cat}')" class="px-3 py-1 text-xs rounded-full border transition-all ${state.practicalCategory === cat ? 'bg-indigo-600 text-white border-indigo-600 font-semibold' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-400'}">
                            ${cat}
                        </button>
                    `).join('')}
                </div>
                <div class="w-full sm:w-64">
                    <input type="text" id="practical-search-input" value="${state.practicalSearch}" placeholder="Search programs..." class="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none">
                </div>
            </div>

            <div class="modal-body p-6 space-y-6 overflow-y-auto bg-slate-50/50 dark:bg-slate-950 flex-1">
                ${filtered.map(p => `
                    <div class="academic-card p-5 flex flex-col space-y-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                            <div class="flex items-center gap-2.5">
                                <span class="px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-mono font-bold text-xs">
                                    Prog ${p.num}
                                </span>
                                <h4 class="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                                    ${p.title}
                                </h4>
                            </div>
                            <div class="flex items-center gap-2">
                                <button onclick="window.copyToClipboard(\`${escapeForAttribute(p.code)}\`)" class="text-xs px-2.5 py-1 rounded border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300">
                                    📋 Copy
                                </button>
                                <button onclick="window.openPythonLabWithCode(\`${escapeForAttribute(p.code)}\`)" class="btn-primary text-xs py-1 px-3">
                                    ▶ Run in Lab
                                </button>
                            </div>
                        </div>

                        <div class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                            <span class="font-semibold text-slate-900 dark:text-white">Problem Statement:</span> ${p.description}
                        </div>

                        <div class="terminal-window">
                            <div class="terminal-header">
                                <span class="text-[11px] text-slate-400 font-mono">program_${p.num}.py</span>
                                <div class="flex gap-1">
                                    ${p.tags.map(t => `<span class="text-[10px] bg-slate-800 text-cyan-300 px-1.5 py-0.5 rounded">${t}</span>`).join('')}
                                </div>
                            </div>
                            <pre class="terminal-body font-mono text-xs text-cyan-300">${escapeHtml(p.code)}</pre>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                            <div class="p-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-200">
                                <span class="text-slate-500 font-sans text-[10px] uppercase font-bold block mb-1">Sample Input:</span>
                                <pre class="whitespace-pre-wrap">${escapeHtml(p.sampleInput)}</pre>
                            </div>
                            <div class="p-3 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400">
                                <span class="text-slate-500 font-sans text-[10px] uppercase font-bold block mb-1">Verified Sample Output:</span>
                                <pre class="whitespace-pre-wrap">${escapeHtml(p.sampleOutput)}</pre>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    openModal(modalHtml, 'practicals-modal');

    const searchInput = document.getElementById('practical-search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            state.practicalSearch = e.target.value;
            renderPracticalsHubModal();
        });
    }
}

function setPracticalCategory(cat) {
    state.practicalCategory = cat;
    renderPracticalsHubModal();
}

function openPracticalRubric() {
    const modalHtml = `
        <div class="modal-container max-w-2xl">
            <div class="modal-header bg-slate-50 dark:bg-slate-800">
                <h3 class="text-base font-bold text-slate-900 dark:text-white">CBSE Class 11 Practical Exam Rubric (30 Marks)</h3>
                <button onclick="window.closeModal()" class="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold">✕</button>
            </div>
            <div class="modal-body p-6 space-y-4 text-sm">
                ${practicalStructure.components.map(c => `
                    <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
                        <div class="flex items-center justify-between">
                            <h4 class="font-bold text-slate-900 dark:text-white">${c.title}</h4>
                            <span class="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold">${c.badge}</span>
                        </div>
                        <p class="text-xs text-slate-600 dark:text-slate-400">${c.description}</p>
                        <ul class="text-xs space-y-1 text-slate-500 pt-1">
                            ${c.breakdown.map(b => `<li>• <strong>${b.item}:</strong> ${b.weight}</li>`).join('')}
                        </ul>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    openModal(modalHtml, 'rubric-modal');
}

// ==========================================================================
// 7. Practice Centre
// ==========================================================================
function openPracticeCentre(category = 'all') {
    state.practiceCategory = category;
    renderPracticeCentreModal();
}

function renderPracticeCentreModal() {
    const filtered = quizQuestions.filter(q => {
        return state.practiceCategory === 'all' || q.category === state.practiceCategory;
    });

    const modalHtml = `
        <div class="modal-container max-w-4xl h-[90vh]">
            <div class="modal-header bg-slate-50 dark:bg-slate-800">
                <div class="flex items-center gap-3">
                    <span class="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center font-bold text-sm">🎯</span>
                    <div>
                        <h3 class="text-base font-bold text-slate-900 dark:text-white">Practice Corner</h3>
                        <p class="text-xs text-slate-500 dark:text-slate-400">MCQs, Output Prediction, Find the Error & Conceptual Questions</p>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <span class="text-xs font-semibold px-2.5 py-1 rounded bg-indigo-50 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300">
                        Score: ${state.practiceScore} / ${filtered.length}
                    </span>
                    <button onclick="window.closeModal()" class="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold">✕</button>
                </div>
            </div>

            <div class="p-3 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-wrap gap-1.5 overflow-x-auto">
                ${practiceCategories.map(cat => `
                    <button onclick="window.setPracticeCategory('${cat.id}')" class="px-3 py-1 text-xs rounded-full border transition-all ${state.practiceCategory === cat.id ? 'bg-indigo-600 text-white border-indigo-600 font-semibold' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'}">
                        ${cat.name}
                    </button>
                `).join('')}
            </div>

            <div class="modal-body p-6 space-y-6 overflow-y-auto bg-slate-50/50 dark:bg-slate-950 flex-1">
                ${filtered.map((q, idx) => {
                    const answered = state.practiceAnswers[q.id];
                    return `
                        <div class="academic-card p-5 flex flex-col space-y-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                            <div class="flex items-center justify-between text-xs text-slate-500">
                                <span class="font-semibold text-indigo-600">Question ${idx + 1} of ${filtered.length}</span>
                                <div class="flex gap-1.5">
                                    <span class="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">${q.type}</span>
                                    <span class="px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400">${q.difficulty}</span>
                                </div>
                            </div>

                            <p class="text-sm font-semibold text-slate-900 dark:text-white">${q.question}</p>

                            ${q.codeSnippet ? `
                                <div class="terminal-window my-2">
                                    <pre class="terminal-body font-mono text-xs text-cyan-300">${escapeHtml(q.codeSnippet)}</pre>
                                </div>
                            ` : ''}

                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                                ${q.options.map(opt => {
                                    let btnClass = 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-indigo-400';
                                    if (answered) {
                                        if (opt.id === q.correctOption) {
                                            btnClass = 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-semibold';
                                        } else if (answered === opt.id) {
                                            btnClass = 'bg-red-50 dark:bg-red-950/60 border-red-500 text-red-700 dark:text-red-300';
                                        }
                                    }
                                    return `
                                        <button onclick="window.answerPracticeQuestion('${q.id}', '${opt.id}')" ${answered ? 'disabled' : ''} class="w-full text-left p-3 rounded-lg border text-xs flex items-center gap-2.5 transition-all ${btnClass}">
                                            <span class="w-5 h-5 rounded-full border border-current flex items-center justify-center font-bold text-[10px] flex-shrink-0">
                                                ${opt.id}
                                            </span>
                                            <span class="truncate">${opt.text}</span>
                                        </button>
                                    `;
                                }).join('')}
                            </div>

                            ${answered ? `
                                <div class="p-3.5 rounded-lg ${answered === q.correctOption ? 'bg-emerald-50/80 border border-emerald-200 text-emerald-800 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-300' : 'bg-red-50/80 border border-red-200 text-red-800 dark:bg-red-950/40 dark:border-red-800 dark:text-red-300'} text-xs leading-relaxed">
                                    <div class="font-bold mb-1">${answered === q.correctOption ? '✓ Correct Answer!' : '✗ Incorrect!'}</div>
                                    <div><strong>Explanation:</strong> ${q.explanation}</div>
                                </div>
                            ` : ''}
                        </div>
                    `;
                }).join('')}
            </div>

            <div class="modal-footer">
                <button onclick="window.resetPracticeAnswers()" class="btn-secondary text-xs py-2 px-4">
                    Reset & Try Again
                </button>
            </div>
        </div>
    `;

    openModal(modalHtml, 'practice-centre-modal');
}

function setPracticeCategory(cat) {
    state.practiceCategory = cat;
    renderPracticeCentreModal();
}

function answerPracticeQuestion(questionId, selectedOption) {
    if (state.practiceAnswers[questionId]) return;
    state.practiceAnswers[questionId] = selectedOption;

    const q = quizQuestions.find(item => item.id === questionId);
    if (q && q.correctOption === selectedOption) {
        state.practiceScore += 1;
    }

    renderPracticeCentreModal();
}

function resetPracticeAnswers() {
    state.practiceAnswers = {};
    state.practiceScore = 0;
    renderPracticeCentreModal();
}

// ==========================================================================
// 8. Timed CBSE Mock Exam Mode
// ==========================================================================
function openMockExam(examId = 'mock-01') {
    const exam = officialMockExams.find(e => e.id === examId) || officialMockExams[0];
    state.examState = {
        activeExam: exam,
        currentIndex: 0,
        answers: {},
        markedForReview: new Set(),
        timeRemaining: exam.durationMinutes * 60,
        timerInterval: null,
        isSubmitted: false
    };

    renderMockExamInstructions();
}

function renderMockExamInstructions() {
    const exam = state.examState.activeExam;
    const modalHtml = `
        <div class="modal-container max-w-2xl">
            <div class="modal-header bg-slate-50 dark:bg-slate-800">
                <div class="flex items-center gap-3">
                    <span class="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center font-bold text-sm">⏱️</span>
                    <div>
                        <h3 class="text-base font-bold text-slate-900 dark:text-white">${exam.title}</h3>
                        <p class="text-xs text-slate-500">Official CBSE Class 11 CS Pattern</p>
                    </div>
                </div>
                <button onclick="window.closeModal()" class="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold">✕</button>
            </div>
            <div class="modal-body p-6 space-y-4 text-sm text-slate-700 dark:text-slate-300">
                <div class="grid grid-cols-3 gap-3 p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl border border-indigo-100 dark:border-indigo-900/50 text-center">
                    <div>
                        <div class="text-[11px] text-slate-500">Duration</div>
                        <div class="font-bold text-indigo-600">${exam.durationMinutes} Minutes</div>
                    </div>
                    <div>
                        <div class="text-[11px] text-slate-500">Total Marks</div>
                        <div class="font-bold text-indigo-600">${exam.totalMarks} Marks</div>
                    </div>
                    <div>
                        <div class="text-[11px] text-slate-500">Questions</div>
                        <div class="font-bold text-indigo-600">${exam.questions.length} Questions</div>
                    </div>
                </div>

                <div class="space-y-2">
                    <h4 class="font-bold text-slate-900 dark:text-white">Exam Guidelines:</h4>
                    <ul class="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                        ${exam.instructions.map(inst => `<li>• ${inst}</li>`).join('')}
                    </ul>
                </div>
            </div>
            <div class="modal-footer">
                <button onclick="window.closeModal()" class="btn-secondary text-xs py-2 px-4">Cancel</button>
                <button onclick="window.startMockExamTimer()" class="btn-primary text-xs py-2 px-6">
                    Start Test Now →
                </button>
            </div>
        </div>
    `;
    openModal(modalHtml, 'exam-instructions-modal');
}

function startMockExamTimer() {
    renderActiveExamInterface();

    state.examState.timerInterval = setInterval(() => {
        if (state.examState.timeRemaining > 0) {
            state.examState.timeRemaining--;
            updateTimerDisplay();
        } else {
            clearInterval(state.examState.timerInterval);
            submitMockExam();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const timerEl = document.getElementById('exam-timer-display');
    if (!timerEl) return;
    const mins = Math.floor(state.examState.timeRemaining / 60);
    const secs = state.examState.timeRemaining % 60;
    timerEl.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function renderActiveExamInterface() {
    const exam = state.examState.activeExam;
    const q = exam.questions[state.examState.currentIndex];
    const totalQ = exam.questions.length;
    const selectedAns = state.examState.answers[q.id];

    const modalHtml = `
        <div class="modal-container max-w-5xl h-[92vh]">
            <div class="modal-header bg-slate-900 text-white border-slate-800">
                <div>
                    <h3 class="text-sm font-bold text-white">${exam.title}</h3>
                    <p class="text-[11px] text-slate-400">Question ${state.examState.currentIndex + 1} of ${totalQ}</p>
                </div>
                <div class="flex items-center gap-4">
                    <div class="flex items-center gap-2 px-3 py-1 rounded bg-slate-800 border border-slate-700 font-mono text-sm text-cyan-300">
                        <span>⏱️</span>
                        <span id="exam-timer-display">--:--</span>
                    </div>
                    <button onclick="window.confirmSubmitExam()" class="text-xs px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold">
                        Submit Exam
                    </button>
                </div>
            </div>

            <div class="modal-body p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 overflow-y-auto">
                <div class="lg:col-span-8 space-y-4">
                    <div class="flex items-center justify-between text-xs text-slate-500">
                        <span class="font-semibold text-indigo-600">${q.unit}</span>
                        <span>+1.0 Mark | 0.0 Negative</span>
                    </div>

                    <h3 class="text-base font-bold text-slate-900 dark:text-white leading-relaxed">
                        Q${state.examState.currentIndex + 1}. ${q.question}
                    </h3>

                    ${q.codeSnippet ? `
                        <div class="terminal-window my-3">
                            <pre class="terminal-body font-mono text-xs text-cyan-300">${escapeHtml(q.codeSnippet)}</pre>
                        </div>
                    ` : ''}

                    <div class="space-y-2 pt-2">
                        ${q.options.map(opt => `
                            <button onclick="window.selectExamOption('${q.id}', '${opt.id}')" class="w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm flex items-center gap-3 transition-all ${selectedAns === opt.id ? 'bg-indigo-50 border-indigo-600 text-indigo-900 dark:bg-indigo-950/60 dark:text-indigo-200 font-semibold' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-50'}">
                                <span class="w-6 h-6 rounded-full border border-current flex items-center justify-center font-bold text-xs flex-shrink-0">
                                    ${opt.id}
                                </span>
                                <span>${opt.text}</span>
                            </button>
                        `).join('')}
                    </div>
                </div>

                <div class="lg:col-span-4 bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
                    <h4 class="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Question Palette</h4>
                    
                    <div class="grid grid-cols-5 gap-2">
                        ${exam.questions.map((ques, idx) => {
                            let badgeStyle = 'bg-slate-200 text-slate-700';
                            if (state.examState.markedForReview.has(ques.id)) {
                                badgeStyle = 'bg-purple-600 text-white font-bold';
                            } else if (state.examState.answers[ques.id]) {
                                badgeStyle = 'bg-emerald-600 text-white font-bold';
                            }
                            return `
                                <button onclick="window.jumpToExamQuestion(${idx})" class="w-9 h-9 rounded-lg flex items-center justify-center text-xs transition-transform ${badgeStyle} ${idx === state.examState.currentIndex ? 'ring-2 ring-indigo-500 scale-105' : ''}">
                                    ${idx + 1}
                                </button>
                            `;
                        }).join('')}
                    </div>

                    <div class="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-1.5 text-[11px] text-slate-500">
                        <div class="flex items-center gap-2"><span class="w-3 h-3 rounded bg-emerald-600"></span> Answered</div>
                        <div class="flex items-center gap-2"><span class="w-3 h-3 rounded bg-purple-600"></span> Marked for Review</div>
                        <div class="flex items-center gap-2"><span class="w-3 h-3 rounded bg-slate-200"></span> Unattempted</div>
                    </div>
                </div>
            </div>

            <div class="modal-footer">
                <button onclick="window.toggleExamMarkForReview('${q.id}')" class="btn-secondary text-xs py-2 px-3 mr-auto">
                    ${state.examState.markedForReview.has(q.id) ? 'Unmark Review' : 'Mark for Review'}
                </button>
                <button onclick="window.clearExamAnswer('${q.id}')" class="btn-secondary text-xs py-2 px-3">
                    Clear Answer
                </button>
                <button onclick="window.navExamQuestion(-1)" ${state.examState.currentIndex === 0 ? 'disabled' : ''} class="btn-secondary text-xs py-2 px-3">
                    Previous
                </button>
                <button onclick="window.navExamQuestion(1)" class="btn-primary text-xs py-2 px-4">
                    ${state.examState.currentIndex === totalQ - 1 ? 'Save & Review' : 'Next Question →'}
                </button>
            </div>
        </div>
    `;

    openModal(modalHtml, 'active-exam-modal');
    updateTimerDisplay();
}

function selectExamOption(qId, optId) {
    state.examState.answers[qId] = optId;
    renderActiveExamInterface();
}

function clearExamAnswer(qId) {
    delete state.examState.answers[qId];
    renderActiveExamInterface();
}

function toggleExamMarkForReview(qId) {
    if (state.examState.markedForReview.has(qId)) {
        state.examState.markedForReview.delete(qId);
    } else {
        state.examState.markedForReview.add(qId);
    }
    renderActiveExamInterface();
}

function navExamQuestion(direction) {
    const newIdx = state.examState.currentIndex + direction;
    if (newIdx >= 0 && newIdx < state.examState.activeExam.questions.length) {
        state.examState.currentIndex = newIdx;
        renderActiveExamInterface();
    } else if (newIdx >= state.examState.activeExam.questions.length) {
        confirmSubmitExam();
    }
}

function jumpToExamQuestion(idx) {
    state.examState.currentIndex = idx;
    renderActiveExamInterface();
}

function confirmSubmitExam() {
    const totalQ = state.examState.activeExam.questions.length;
    const answeredCount = Object.keys(state.examState.answers).length;
    const reviewCount = state.examState.markedForReview.size;

    const modalHtml = `
        <div class="modal-container max-w-md">
            <div class="modal-header bg-slate-50 dark:bg-slate-800">
                <h3 class="text-sm font-bold text-slate-900 dark:text-white">Submit Examination?</h3>
                <button onclick="window.renderActiveExamInterface()" class="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs">✕</button>
            </div>
            <div class="modal-body p-6 space-y-3 text-xs text-slate-700 dark:text-slate-300">
                <p>Are you sure you want to finalize and submit your test? Here is your summary:</p>
                <div class="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg space-y-1">
                    <div>• <strong>Answered:</strong> ${answeredCount} / ${totalQ}</div>
                    <div>• <strong>Marked for Review:</strong> ${reviewCount}</div>
                    <div>• <strong>Unanswered:</strong> ${totalQ - answeredCount}</div>
                </div>
            </div>
            <div class="modal-footer">
                <button onclick="window.renderActiveExamInterface()" class="btn-secondary text-xs py-2 px-3">Resume Test</button>
                <button onclick="window.submitMockExam()" class="btn-primary text-xs py-2 px-5 bg-emerald-600 hover:bg-emerald-700">Submit Final</button>
            </div>
        </div>
    `;
    openModal(modalHtml, 'confirm-submit-modal');
}

function submitMockExam() {
    if (state.examState.timerInterval) {
        clearInterval(state.examState.timerInterval);
        state.examState.timerInterval = null;
    }

    const exam = state.examState.activeExam;
    let score = 0;
    const total = exam.questions.length;

    exam.questions.forEach(q => {
        if (state.examState.answers[q.id] === q.correctOption) {
            score++;
        }
    });

    const percentage = ((score / total) * 100).toFixed(1);

    const modalHtml = `
        <div class="modal-container max-w-4xl h-[90vh]">
            <div class="modal-header bg-slate-50 dark:bg-slate-800">
                <h3 class="text-base font-bold text-slate-900 dark:text-white">Exam Result & Scorecard</h3>
                <button onclick="window.closeModal()" class="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold">✕</button>
            </div>
            <div class="modal-body p-6 space-y-6 overflow-y-auto">
                <div class="p-6 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                        <span class="text-xs uppercase font-bold tracking-wider text-indigo-100">Performance Summary</span>
                        <h2 class="text-3xl font-extrabold mt-1">Score: ${score} / ${total} (${percentage}%)</h2>
                        <p class="text-xs text-indigo-100 mt-1">
                            ${percentage >= 80 ? '🌟 Outstanding! Excellent mastery of Class 11 CS concepts.' : (percentage >= 50 ? '👍 Good Effort! Revise key error patterns & loop traces.' : '📖 Needs Improvement. Re-read Unit 1 & Unit 2 notes.')}
                        </p>
                    </div>
                    <button onclick="window.openMockExam('${exam.id}')" class="bg-white text-indigo-600 font-bold px-4 py-2 rounded-xl text-xs hover:bg-indigo-50">
                        Retake Test
                    </button>
                </div>

                <div class="space-y-4">
                    <h4 class="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">Detailed Answers Review</h4>
                    ${exam.questions.map((q, idx) => {
                        const studentAns = state.examState.answers[q.id];
                        const isCorrect = studentAns === q.correctOption;
                        return `
                            <div class="p-4 rounded-xl border ${isCorrect ? 'border-emerald-200 bg-emerald-50/40 dark:border-emerald-900 dark:bg-emerald-950/20' : 'border-red-200 bg-red-50/40 dark:border-red-900 dark:bg-red-950/20'} space-y-2 text-xs">
                                <div class="flex items-center justify-between font-semibold">
                                    <span>Q${idx + 1}. ${q.question}</span>
                                    <span class="${isCorrect ? 'text-emerald-600 font-bold' : 'text-red-500 font-bold'}">
                                        ${isCorrect ? '✓ Correct (+1)' : '✗ Incorrect (0)'}
                                    </span>
                                </div>
                                ${q.codeSnippet ? `<pre class="p-2 rounded bg-slate-900 text-cyan-300 font-mono text-[11px]">${escapeHtml(q.codeSnippet)}</pre>` : ''}
                                <div class="text-slate-600 dark:text-slate-400">
                                    Your Answer: <strong>${studentAns || 'Unattempted'}</strong> | Correct: <strong class="text-emerald-600">${q.correctOption}</strong>
                                </div>
                                <div class="text-slate-500 pt-1 border-t border-slate-200/50">
                                    <strong>Explanation:</strong> ${q.explanation}
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
            <div class="modal-footer">
                <button onclick="window.closeModal()" class="btn-primary text-xs py-2 px-5">Close Scorecard</button>
            </div>
        </div>
    `;

    openModal(modalHtml, 'exam-results-modal');
}

// ==========================================================================
// 9. Quick Access Modals
// ==========================================================================
function openQuickAccessModal(typeKey) {
    if (typeKey === 'complete-syllabus') {
        const modalHtml = `
            <div class="modal-container max-w-4xl h-[88vh]">
                <div class="modal-header bg-slate-50 dark:bg-slate-800">
                    <h3 class="text-base font-bold text-slate-900 dark:text-white">Official CBSE Class 11 CS Syllabus (Code 083)</h3>
                    <button onclick="window.closeModal()" class="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold">✕</button>
                </div>
                <div class="modal-body p-6 space-y-6 overflow-y-auto">
                    <div class="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                        <table class="w-full text-xs text-left">
                            <thead class="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold uppercase">
                                <tr>
                                    <th class="p-3">Unit No.</th>
                                    <th class="p-3">Unit Title</th>
                                    <th class="p-3">Marks</th>
                                    <th class="p-3">Periods (Theory + Lab)</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
                                ${syllabusOverview.units.map(u => `
                                    <tr>
                                        <td class="p-3 font-bold text-indigo-600">Unit ${u.unitNumber}</td>
                                        <td class="p-3 font-semibold text-slate-800 dark:text-slate-200">${u.title}</td>
                                        <td class="p-3 font-bold">${u.marks} Marks</td>
                                        <td class="p-3 text-slate-500">${u.periods.theory} + ${u.periods.practical} Periods</td>
                                    </tr>
                                `).join('')}
                                <tr class="bg-slate-50 dark:bg-slate-800/50 font-bold">
                                    <td class="p-3" colspan="2">Total Theory Marks</td>
                                    <td class="p-3 text-indigo-600" colspan="2">70 Marks</td>
                                </tr>
                                <tr class="bg-slate-50 dark:bg-slate-800/50 font-bold">
                                    <td class="p-3" colspan="2">Practical Examination</td>
                                    <td class="p-3 text-indigo-600" colspan="2">30 Marks</td>
                                </tr>
                                <tr class="bg-indigo-50 dark:bg-indigo-950 font-bold text-indigo-900 dark:text-indigo-200">
                                    <td class="p-3" colspan="2">Grand Total (Theory + Practical)</td>
                                    <td class="p-3" colspan="2">100 Marks</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
        openModal(modalHtml, 'syllabus-modal');
    } else if (typeKey === 'important-topics') {
        const modalHtml = `
            <div class="modal-container max-w-4xl h-[88vh]">
                <div class="modal-header bg-slate-50 dark:bg-slate-800">
                    <h3 class="text-base font-bold text-slate-900 dark:text-white">Important Topics & High-Yield Summary</h3>
                    <button onclick="window.closeModal()" class="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold">✕</button>
                </div>
                <div class="modal-body p-6 space-y-6 overflow-y-auto">
                    ${highYieldTopics.map(unit => `
                        <div class="space-y-3">
                            <h4 class="text-sm font-bold text-indigo-600 uppercase tracking-wide">${unit.unit}</h4>
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                ${unit.topics.map(t => `
                                    <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1 text-xs">
                                        <div class="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                                            <span>${t.name}</span>
                                            <span class="text-indigo-600 bg-indigo-50 dark:bg-indigo-900/50 px-2 py-0.5 rounded">${t.marks}</span>
                                        </div>
                                        <p class="text-slate-600 dark:text-slate-400 pt-1 leading-relaxed">${t.summary}</p>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        openModal(modalHtml, 'topics-modal');
    } else if (typeKey === 'syntax-sheet') {
        const modalHtml = `
            <div class="modal-container max-w-4xl h-[88vh]">
                <div class="modal-header bg-slate-50 dark:bg-slate-800">
                    <h3 class="text-base font-bold text-slate-900 dark:text-white">Python Quick Syntax Cheat Sheet</h3>
                    <button onclick="window.closeModal()" class="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold">✕</button>
                </div>
                <div class="modal-body p-6 space-y-6 overflow-y-auto text-xs">
                    <div class="space-y-2">
                        <h4 class="font-bold text-sm text-indigo-600 uppercase">Core Python Operators & Precedence</h4>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            ${syntaxCheatSheet.operators.map(op => `
                                <div class="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 font-mono">
                                    <span class="font-bold text-indigo-600">${op.symbol}</span> (${op.name}): <code class="text-cyan-500">${op.example}</code>
                                    <span class="block text-[11px] font-sans text-slate-500">${op.notes}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div class="space-y-2">
                        <h4 class="font-bold text-sm text-indigo-600 uppercase">String Methods</h4>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            ${syntaxCheatSheet.stringMethods.map(m => `
                                <div class="p-2 rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                                    <code class="font-mono font-bold text-indigo-600">${m.method}</code>
                                    <span class="block text-[11px] text-slate-500">${m.desc}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div class="space-y-2">
                        <h4 class="font-bold text-sm text-indigo-600 uppercase">List Methods</h4>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            ${syntaxCheatSheet.listMethods.map(m => `
                                <div class="p-2 rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                                    <code class="font-mono font-bold text-emerald-600">${m.method}</code>
                                    <span class="block text-[11px] text-slate-500">${m.desc}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div class="space-y-2">
                        <h4 class="font-bold text-sm text-indigo-600 uppercase">Dictionary Methods</h4>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            ${syntaxCheatSheet.dictMethods.map(m => `
                                <div class="p-2 rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                                    <code class="font-mono font-bold text-amber-600">${m.method}</code>
                                    <span class="block text-[11px] text-slate-500">${m.desc}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
        openModal(modalHtml, 'syntax-modal');
    } else if (typeKey === 'one-day-revision') {
        const modalHtml = `
            <div class="modal-container max-w-3xl h-[88vh]">
                <div class="modal-header bg-slate-50 dark:bg-slate-800">
                    <h3 class="text-base font-bold text-slate-900 dark:text-white">One Day Before Exam Revision Guide</h3>
                    <button onclick="window.closeModal()" class="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold">✕</button>
                </div>
                <div class="modal-body p-6 space-y-6 overflow-y-auto">
                    ${oneDayRevisionGuide.map(sec => `
                        <div class="space-y-2">
                            <h4 class="font-bold text-sm text-slate-900 dark:text-white">${sec.title}</h4>
                            <ul class="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                                ${sec.points.map(pt => `
                                    <li class="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 leading-relaxed">
                                        ${pt}
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        openModal(modalHtml, 'revision-modal');
    }
}

// ==========================================================================
// 10. Global Search (`Ctrl+K`)
// ==========================================================================
function setupGlobalSearch() {
    const input = document.getElementById('global-search-input');
    if (input) {
        input.addEventListener('focus', () => openSearchModal());
    }
}

function openSearchModal() {
    const modalHtml = `
        <div class="modal-container max-w-2xl">
            <div class="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
                <span class="text-slate-400">🔍</span>
                <input type="text" id="modal-search-field" placeholder="Search chapters, practical programs, Drive resources..." class="w-full text-sm bg-transparent border-0 focus:outline-none text-slate-800 dark:text-slate-100 placeholder-slate-400" autofocus>
                <button onclick="window.closeModal()" class="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">ESC</button>
            </div>
            <div id="modal-search-results" class="p-4 max-h-96 overflow-y-auto space-y-2 text-xs">
                <div class="text-slate-400 text-center py-6">Type anything to search the CS 11 learning platform...</div>
            </div>
        </div>
    `;

    openModal(modalHtml, 'search-modal');

    const field = document.getElementById('modal-search-field');
    const resultsContainer = document.getElementById('modal-search-results');
    if (field && resultsContainer) {
        field.focus();
        field.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            if (!query) {
                resultsContainer.innerHTML = '<div class="text-slate-400 text-center py-6">Type anything to search the CS 11 learning platform...</div>';
                return;
            }

            const results = [];

            // Search 7 Drive Resources
            studyLibraryResources.forEach(res => {
                if (res.title.toLowerCase().includes(query) || res.description.toLowerCase().includes(query)) {
                    results.push({
                        type: 'Drive Resource',
                        title: `${res.order}. ${res.title}`,
                        desc: res.description,
                        action: `window.openDriveResource('${res.driveUrl}')`
                    });
                }
            });

            // Search Syllabus Topics
            syllabusTopics.forEach(t => {
                if (t.title.toLowerCase().includes(query) || t.shortDesc.toLowerCase().includes(query)) {
                    results.push({
                        type: 'Chapter',
                        title: `${t.number}: ${t.title}`,
                        desc: t.shortDesc,
                        action: `window.openChapterReader('${t.id}')`
                    });
                }
            });

            // Search Practicals
            practicalPrograms.forEach(p => {
                if (p.title.toLowerCase().includes(query) || p.description.toLowerCase().includes(query)) {
                    results.push({
                        type: 'Practical Program',
                        title: `Prog ${p.num}: ${p.title}`,
                        desc: p.description,
                        action: `window.openPythonLabWithCode(\`${escapeForAttribute(p.code)}\`)`
                    });
                }
            });

            if (results.length === 0) {
                resultsContainer.innerHTML = `<div class="text-slate-400 text-center py-6">No matching results found for "${escapeHtml(query)}"</div>`;
            } else {
                resultsContainer.innerHTML = results.slice(0, 10).map(r => `
                    <div onclick="${r.action}" class="p-3 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 cursor-pointer flex items-center justify-between">
                        <div>
                            <span class="text-[10px] font-bold text-indigo-600 uppercase">${r.type}</span>
                            <div class="font-bold text-slate-800 dark:text-slate-200">${r.title}</div>
                            <div class="text-[11px] text-slate-500 truncate max-w-md">${r.desc}</div>
                        </div>
                        <span class="text-slate-400 font-bold">›</span>
                    </div>
                `).join('');
            }
        });
    }
}

// ==========================================================================
// 11. Administrator Panel
// ==========================================================================
function openAdminModal() {
    const modalHtml = `
        <div class="modal-container max-w-md">
            <div class="modal-header bg-slate-50 dark:bg-slate-800">
                <h3 class="text-sm font-bold text-slate-900 dark:text-white">Admin Security Access</h3>
                <button onclick="window.closeModal()" class="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs">✕</button>
            </div>
            <div class="modal-body p-6 space-y-4">
                <p class="text-xs text-slate-500">
                    Administrator portal is strictly reserved for authorized KV Rewari faculty to update shared resource links.
                </p>
                <div>
                    <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Enter Master Admin PIN</label>
                    <input type="password" id="admin-pin-field" placeholder="••••" class="w-full p-2.5 border rounded-lg text-sm bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                </div>
            </div>
            <div class="modal-footer">
                <button onclick="window.verifyAdminPin()" class="btn-primary text-xs py-2 px-5 w-full">
                    Authenticate
                </button>
            </div>
        </div>
    `;
    openModal(modalHtml, 'admin-auth-modal');
}

function verifyAdminPin() {
    const pinField = document.getElementById('admin-pin-field');
    if (!pinField) return;

    if (pinField.value === '1108' || pinField.value === 'admin') {
        renderAdminControlPanel();
    } else {
        alert('Invalid Security PIN. Access Denied.');
    }
}

function renderAdminControlPanel() {
    const modalHtml = `
        <div class="modal-container max-w-2xl h-[85vh]">
            <div class="modal-header bg-slate-900 text-white border-slate-800">
                <h3 class="text-sm font-bold">Portal Administration Dashboard</h3>
                <button onclick="window.closeModal()" class="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs">✕</button>
            </div>
            <div class="modal-body p-6 space-y-4 overflow-y-auto text-xs text-slate-700 dark:text-slate-300">
                <div class="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg text-emerald-800 dark:text-emerald-300 font-semibold">
                    ✓ Authenticated as KV Rewari Administrator
                </div>

                <div class="space-y-3">
                    <h4 class="font-bold text-slate-900 dark:text-white uppercase tracking-wider">Configure Google Drive Resource Links</h4>
                    ${studyLibraryResources.map(res => `
                        <div>
                            <label class="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 capitalize">${res.order}. ${res.title}</label>
                            <input type="text" id="admin-drive-${res.id}" value="${res.driveUrl || ''}" placeholder="https://drive.google.com/..." class="w-full p-2 border rounded text-xs bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700">
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="modal-footer">
                <button onclick="window.saveAdminSettings()" class="btn-primary text-xs py-2 px-5">Save Configuration</button>
            </div>
        </div>
    `;
    openModal(modalHtml, 'admin-dashboard-modal');
}

function saveAdminSettings() {
    studyLibraryResources.forEach(res => {
        const input = document.getElementById(`admin-drive-${res.id}`);
        if (input && input.value) {
            res.driveUrl = input.value;
        }
    });
    alert('Google Drive URLs updated successfully in session!');
    renderStudyLibraryCards();
    closeModal();
}

// ==========================================================================
// Utilities
// ==========================================================================
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Copied to clipboard successfully!');
    }).catch(() => {
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        alert('Copied to clipboard!');
    });
}

function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function escapeForAttribute(str) {
    if (!str) return '';
    return str
        .replace(/\\/g, '\\\\')
        .replace(/`/g, '\\`')
        .replace(/\$/g, '\\$')
        .replace(/"/g, '&quot;');
}

function setupKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            openSearchModal();
        } else if (e.key === 'Escape' && state.activeModal) {
            closeModal();
        }
    });
}

// Expose functions to window scope for onclick handlers
function exposeGlobalFunctions() {
    window.toggleTheme = toggleTheme;
    window.toggleMobileMenu = toggleMobileMenu;
    window.openModal = openModal;
    window.closeModal = closeModal;
    window.setLibraryCategory = setLibraryCategory;
    window.openDriveResource = openDriveResource;
    window.resetLibraryFilters = resetLibraryFilters;
    window.openChapterReader = openChapterReader;
    window.filterAndOpenCategory = filterAndOpenCategory;
    window.selectReaderTopic = selectReaderTopic;
    window.openPythonLab = openPythonLab;
    window.openPythonLabWithCode = openPythonLabWithCode;
    window.runPythonCode = runPythonCode;
    window.copyLabCode = copyLabCode;
    window.resetLabCode = resetLabCode;
    window.clearLabConsole = clearLabConsole;
    window.openPracticalsHub = openPracticalsHub;
    window.setPracticalCategory = setPracticalCategory;
    window.openPracticalRubric = openPracticalRubric;
    window.openPracticeCentre = openPracticeCentre;
    window.setPracticeCategory = setPracticeCategory;
    window.answerPracticeQuestion = answerPracticeQuestion;
    window.resetPracticeAnswers = resetPracticeAnswers;
    window.openMockExam = openMockExam;
    window.startMockExamTimer = startMockExamTimer;
    window.selectExamOption = selectExamOption;
    window.clearExamAnswer = clearExamAnswer;
    window.toggleExamMarkForReview = toggleExamMarkForReview;
    window.navExamQuestion = navExamQuestion;
    window.jumpToExamQuestion = jumpToExamQuestion;
    window.confirmSubmitExam = confirmSubmitExam;
    window.renderActiveExamInterface = renderActiveExamInterface;
    window.submitMockExam = submitMockExam;
    window.openQuickAccessModal = openQuickAccessModal;
    window.openSearchModal = openSearchModal;
    window.openAdminModal = openAdminModal;
    window.verifyAdminPin = verifyAdminPin;
    window.saveAdminSettings = saveAdminSettings;
    window.copyToClipboard = copyToClipboard;
}
