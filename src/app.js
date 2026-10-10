/**
 * CS 11 — COMPUTER SCIENCE LEARNING HUB
 * PM SHRI Kendriya Vidyalaya, Rewari (CBSE 2026–27)
 * Master Application Controller & Interactive Logic
 */

import { googleDriveResources, resourceLinks, teacherInfo, schoolInfo } from './data/config.js';
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

const BASE_VIEWS = 250;

const defaultAlerts = [
    {
        id: 'alt-1',
        tag: 'NEW',
        tagType: 'tag-new',
        text: 'Python Chapter 3 notes uploaded',
        date: 'Oct 10, 2026',
        link: 'https://drive.google.com/drive/folders/15Ux9MYwerFRbc1iXsVsx6s2iWgiOUXwj?usp=sharing'
    },
    {
        id: 'alt-2',
        tag: 'REVISION',
        tagType: 'tag-revision',
        text: 'Mind map for Control Flow & Loops live',
        date: 'Oct 9, 2026',
        link: 'https://drive.google.com/drive/folders/113Mg-GfhnKs6YmFD2iYOAfttZr_1bkoO?usp=sharing'
    },
    {
        id: 'alt-3',
        tag: 'PRACTICE',
        tagType: 'tag-practice',
        text: 'Quiz 2.1 on Data Types is now open',
        date: 'Oct 8, 2026',
        link: 'https://drive.google.com/drive/folders/1Z-tWMvfyVBRNYTXz3jyaT238hkviQbwQ?usp=sharing'
    }
];

// ==========================================================================
// Initialization & Module Boot
// ==========================================================================
function boot() {
    initTheme();
    initRetroMode();
    loadCustomDriveUrls();
    initStudyLibrary();
    initVisitorCounter();
    renderAlertsList();
    setupGlobalSearch();
    setupKeyboardShortcuts();
    setupSmoothScroll();
    exposeGlobalFunctions();
    flushPendingActions();
}

// Expose all functions to window immediately upon module evaluation
exposeGlobalFunctions();

// Robust startup regardless of when module finishes loading
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
} else {
    boot();
}

// ==========================================================================
// Pending Actions Queue Flusher
// ==========================================================================
function flushPendingActions() {
    window._appModuleLoaded = true;
    if (Array.isArray(window._pendingActionQueue) && window._pendingActionQueue.length > 0) {
        const queue = window._pendingActionQueue.slice();
        window._pendingActionQueue = [];
        queue.forEach(item => {
            if (typeof window[item.name] === 'function') {
                try {
                    window[item.name].apply(window, item.args || []);
                } catch (e) {
                    console.error('Error executing queued action:', item.name, e);
                }
            }
        });
    }
}

// ==========================================================================
// Subtle Retro Mode CRT & Phosphor Glow Controls
// ==========================================================================
function initRetroMode() {
    const saved = localStorage.getItem('cs11_retro_mode');
    const isRetro = saved === null || saved === 'on';
    const appWindow = document.getElementById('app-window');
    const toggleBtn = document.getElementById('retro-toggle-button');
    const toggleText = document.getElementById('retro-toggle-text');

    if (isRetro) {
        document.documentElement.classList.add('retro-scanlines-active');
        if (appWindow) appWindow.classList.add('retro-scanlines-active');
        if (toggleBtn) toggleBtn.classList.add('active');
        if (toggleText) toggleText.textContent = 'CRT: ON';
    } else {
        document.documentElement.classList.remove('retro-scanlines-active');
        if (appWindow) appWindow.classList.remove('retro-scanlines-active');
        if (toggleBtn) toggleBtn.classList.remove('active');
        if (toggleText) toggleText.textContent = 'CRT: OFF';
    }
}

function toggleRetroMode() {
    const isCurrentlyActive = document.documentElement.classList.contains('retro-scanlines-active');
    const newMode = isCurrentlyActive ? 'off' : 'on';
    localStorage.setItem('cs11_retro_mode', newMode);
    initRetroMode();
}

// ==========================================================================
// Smooth Scrolling Controls & Floating "▲ TOP" Button
// ==========================================================================
function setupSmoothScroll() {
    const topBtn = document.getElementById('scroll-to-top-btn');
    const dockHomeBtn = document.getElementById('mobile-dock-home');

    window.addEventListener('scroll', () => {
        if (topBtn) {
            if (window.scrollY > 300) {
                topBtn.classList.add('visible');
            } else {
                topBtn.classList.remove('visible');
            }
        }
        if (dockHomeBtn) {
            if (window.scrollY < 240) {
                dockHomeBtn.classList.add('active');
            } else {
                dockHomeBtn.classList.remove('active');
            }
        }
    }, { passive: true });
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ==========================================================================
// Persistent Google Drive Link Manager (Synchronized with Admin Portal)
// ==========================================================================
function loadCustomDriveUrls() {
    try {
        const stored = localStorage.getItem('cs11_custom_drive_urls');
        if (stored) {
            const customMap = JSON.parse(stored);
            studyLibraryResources.forEach(res => {
                if (customMap[res.id]) {
                    res.driveUrl = customMap[res.id];
                    if (res.id === 'res-01') googleDriveResources.revision = res.driveUrl;
                    if (res.id === 'res-02') googleDriveResources.mindMaps = res.driveUrl;
                    if (res.id === 'res-03') googleDriveResources.questionBanks = res.driveUrl;
                    if (res.id === 'res-04') googleDriveResources.syntaxSheet = res.driveUrl;
                    if (res.id === 'res-05') googleDriveResources.dailyQuiz = res.driveUrl;
                    if (res.id === 'res-06') googleDriveResources.comics = res.driveUrl;
                    if (res.id === 'res-07') googleDriveResources.notes = res.driveUrl;
                }
            });
        }
    } catch(e) {
        console.warn('Could not parse custom drive URLs', e);
    }
}

function openDriveResourceByKey(key) {
    const keyMap = {
        'revision': googleDriveResources.revision,
        'mindMaps': googleDriveResources.mindMaps,
        'questionBanks': googleDriveResources.questionBanks,
        'syntaxSheet': googleDriveResources.syntaxSheet,
        'dailyQuiz': googleDriveResources.dailyQuiz,
        'comics': googleDriveResources.comics,
        'notes': googleDriveResources.notes,
        'res-01': studyLibraryResources[0]?.driveUrl,
        'res-02': studyLibraryResources[1]?.driveUrl,
        'res-03': studyLibraryResources[2]?.driveUrl,
        'res-04': studyLibraryResources[3]?.driveUrl,
        'res-05': studyLibraryResources[4]?.driveUrl,
        'res-06': studyLibraryResources[5]?.driveUrl,
        'res-07': studyLibraryResources[6]?.driveUrl
    };
    const url = keyMap[key] || googleDriveResources[key] || (studyLibraryResources.find(r => r.id === key)?.driveUrl);
    if (url) {
        window.open(url, '_blank', 'noopener,noreferrer');
    }
}

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

function toggleMobileDrawer() {
    const overlay = document.getElementById('mobile-drawer-overlay');
    if (!overlay) return;
    const isHidden = overlay.classList.contains('hidden');
    if (isHidden) {
        overlay.classList.remove('hidden');
        setTimeout(() => overlay.classList.add('active'), 10);
        document.body.style.overflow = 'hidden';
    } else {
        closeMobileDrawer();
    }
}

function closeMobileDrawer() {
    const overlay = document.getElementById('mobile-drawer-overlay');
    if (!overlay) return;
    overlay.classList.remove('active');
    setTimeout(() => {
        overlay.classList.add('hidden');
        document.body.style.overflow = '';
    }, 280);
}

function toggleMobileMenu() {
    toggleMobileDrawer();
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
    let cachedCount = parseInt(localStorage.getItem('cs11_last_known_count') || '0', 10);
    if (isNaN(cachedCount) || cachedCount < BASE_VIEWS) {
        cachedCount = BASE_VIEWS;
    }

    // If already counted in this session, show cached count without incrementing
    if (sessionCounted && cachedCount >= BASE_VIEWS) {
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
            if (data && data.count !== undefined) {
                let countVal = parseInt(data.count, 10);
                if (isNaN(countVal) || countVal < BASE_VIEWS) {
                    countVal = BASE_VIEWS;
                }
                const countStr = String(countVal);
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
                const rawHits = parseInt(match[1].replace(/,/g, ''), 10) || 0;
                const totalCount = BASE_VIEWS + rawHits;
                const countStr = String(totalCount);
                sessionStorage.setItem('cs11_session_hit', countStr);
                localStorage.setItem('cs11_last_known_count', countStr);
                counterEl.textContent = formatVisitorCount(countStr);
                return;
            }
        }
    } catch (err) {
        console.warn('Central visitor counter sync notice:', err);
    }

    // Fallback: If offline or API unavailable, increment local count from 250
    let fallbackCount = cachedCount;
    if (!sessionCounted) {
        fallbackCount += 1;
        sessionStorage.setItem('cs11_session_hit', String(fallbackCount));
        localStorage.setItem('cs11_last_known_count', String(fallbackCount));
    }
    counterEl.textContent = formatVisitorCount(fallbackCount);
}

function formatVisitorCount(val) {
    const num = parseInt(val, 10);
    if (isNaN(num)) return '250';
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
                    <a href="https://www.onlinegdb.com/online_python_compiler" target="_blank" rel="noopener noreferrer" class="hidden sm:inline-flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-medium transition-colors" title="Launch OnlineGDB Python Compiler in new tab">
                        <span>OnlineGDB</span>
                        <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                    </a>
                    <a href="https://www.python.org/downloads/" target="_blank" rel="noopener noreferrer" class="hidden sm:inline-flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-colors" title="Download Python IDLE from python.org">
                        <span>Download IDLE</span>
                        <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                    </a>
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
// 11. Alerts Management & Dynamic Store
// ==========================================================================
function getStoredAlerts() {
    try {
        const stored = localStorage.getItem('cs11_alerts');
        if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
    } catch (e) {}
    localStorage.setItem('cs11_alerts', JSON.stringify(defaultAlerts));
    return defaultAlerts;
}

function renderAlertsList() {
    const listContainer = document.getElementById('alerts-list-container');
    const badge = document.getElementById('alerts-count-badge');
    if (!listContainer) return;

    const alerts = getStoredAlerts();
    if (badge) {
        badge.textContent = `${alerts.length} Active`;
    }

    listContainer.innerHTML = alerts.map(a => {
        const tagClass = a.tagType || (
            a.tag === 'NEW' ? 'tag-new' :
            a.tag === 'REVISION' ? 'tag-revision' :
            a.tag === 'PRACTICE' ? 'tag-practice' :
            a.tag === 'EXAM' ? 'tag-exam' : 'tag-notice'
        );
        const clickAction = a.link ? `onclick="window.open('${a.link}', '_blank')"` : `onclick="alert('${escapeForAttribute(a.text)}')`;
        return `
            <div class="alert-item-row" ${clickAction}>
                <div class="alert-label-wrap">
                    <span class="alert-tag-badge ${tagClass}">${escapeHtml(a.tag || 'NOTICE')}</span>
                    <span class="alert-label">${escapeHtml(a.text)}</span>
                </div>
                <span class="alert-date-text">(${escapeHtml(a.date)})</span>
            </div>
        `;
    }).join('');
}

// ==========================================================================
// 12. Administrator & Faculty Portal
// ==========================================================================
function openAdminModal() {
    if (sessionStorage.getItem('cs11_admin_auth') === '1') {
        renderAdminControlPanel('alerts');
        return;
    }

    const modalHtml = `
        <div class="modal-container max-w-md">
            <div class="modal-header bg-[#0D2419] text-white">
                <div class="flex items-center gap-2.5">
                    <span class="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-xs">🛡️</span>
                    <h3 class="text-sm font-bold text-white">Faculty &amp; Admin Access</h3>
                </div>
                <button onclick="window.closeModal()" class="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-xs text-white">✕</button>
            </div>
            <div class="modal-body p-6 space-y-4">
                <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Reserved for KV Rewari CS faculty to manage site announcements, answer student doubts &amp; update Google Drive folder resources.
                </p>
                <div>
                    <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Enter Admin Password</label>
                    <div class="relative">
                        <input type="password" id="admin-pin-field" placeholder="Enter security password" onkeydown="if(event.key==='Enter') window.verifyAdminPin()" class="w-full p-2.5 pr-10 border rounded-xl text-sm bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500">
                        <button type="button" onclick="window.toggleAdminPasswordVisibility()" class="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer" title="Toggle password visibility">👁️</button>
                    </div>
                    <div id="admin-error-msg" class="hidden mt-2 p-2 rounded-lg bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 text-[11px] text-rose-700 dark:text-rose-300 font-medium">
                        ⚠️ Invalid Security Password. Access Denied.
                    </div>
                </div>
            </div>
            <div class="modal-footer p-4 border-t border-slate-200 dark:border-slate-800">
                <button onclick="window.verifyAdminPin()" class="btn-primary text-xs py-2.5 px-5 w-full font-bold">
                    Authenticate &amp; Enter Dashboard
                </button>
            </div>
        </div>
    `;
    openModal(modalHtml, 'admin-auth-modal');
    setTimeout(() => {
        const inp = document.getElementById('admin-pin-field');
        if (inp) inp.focus();
    }, 100);
}

function toggleAdminPasswordVisibility() {
    const inp = document.getElementById('admin-pin-field');
    if (!inp) return;
    inp.type = inp.type === 'password' ? 'text' : 'password';
}

function verifyAdminPin() {
    const pinField = document.getElementById('admin-pin-field');
    const errEl = document.getElementById('admin-error-msg');
    if (!pinField) return;

    const val = pinField.value.trim();
    const validPins = ['kv@2026', '1108', 'admin', '11science', 'kvrewari'];
    if (validPins.includes(val.toLowerCase()) || val === 'Kv@2026' || val === '1108') {
        sessionStorage.setItem('cs11_admin_auth', '1');
        renderAdminControlPanel('alerts');
    } else {
        if (errEl) {
            errEl.classList.remove('hidden');
            errEl.classList.add('retro-shake-element');
            setTimeout(() => errEl.classList.remove('retro-shake-element'), 500);
        } else {
            alert('Invalid Security Password. Access Denied.');
        }
    }
}

function adminLogout() {
    sessionStorage.removeItem('cs11_admin_auth');
    closeModal();
}

function renderAdminControlPanel(activeTab = 'alerts') {
    const alerts = getStoredAlerts();
    const doubts = getStoredDoubts();
    const pendingDoubtsCount = doubts.filter(d => !d.replies || !d.replies.some(r => r.isTeacher)).length;

    const modalHtml = `
        <div class="modal-container max-w-4xl h-[88vh] flex flex-col">
            <!-- Modal Header -->
            <div class="modal-header bg-[#0D2419] text-white border-b border-[#1A4530] flex items-center justify-between p-4">
                <div class="flex items-center gap-3">
                    <span class="w-8 h-8 rounded-xl bg-amber-500 text-slate-900 flex items-center justify-center font-bold text-sm">🛡️</span>
                    <div>
                        <h3 class="text-sm font-bold text-white flex items-center gap-2">
                            <span>Faculty &amp; Portal Administration</span>
                            <span class="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">Authenticated</span>
                        </h3>
                        <p class="text-xs text-slate-300">Manage announcements, answer student doubts &amp; update resources</p>
                    </div>
                </div>
                <div class="flex items-center gap-2">
                    <button onclick="window.adminLogout()" class="text-xs px-2.5 py-1 rounded-lg bg-white/10 hover:bg-rose-500/30 text-white border border-white/20 transition-all font-medium" title="End faculty admin session">Log Out</button>
                    <button onclick="window.closeModal()" class="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-xs text-white">✕</button>
                </div>
            </div>

            <!-- Tab Navigation Bar -->
            <div class="flex border-b border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 px-6 pt-3 gap-2">
                <button onclick="window.switchAdminTab('alerts')" class="px-4 py-2 text-xs font-bold rounded-t-xl transition-all ${activeTab === 'alerts' ? 'bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 border-t-2 border-emerald-600 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'}">
                    🚨 Alerts &amp; Announcements (${alerts.length})
                </button>
                <button onclick="window.switchAdminTab('doubts')" class="px-4 py-2 text-xs font-bold rounded-t-xl transition-all relative ${activeTab === 'doubts' ? 'bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 border-t-2 border-emerald-600 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'}">
                    💬 Student Doubts &amp; Discussions (${doubts.length})
                    ${pendingDoubtsCount > 0 ? `<span class="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-amber-500 text-white font-bold">${pendingDoubtsCount} awaiting teacher</span>` : ''}
                </button>
                <button onclick="window.switchAdminTab('links')" class="px-4 py-2 text-xs font-bold rounded-t-xl transition-all ${activeTab === 'links' ? 'bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 border-t-2 border-emerald-600 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'}">
                    📁 Google Drive Resource Links
                </button>
            </div>

            <!-- Modal Body by Tab -->
            <div class="modal-body p-6 flex-1 overflow-y-auto space-y-4 bg-[#F8FAF9] dark:bg-slate-950">
                ${activeTab === 'alerts' ? renderAdminAlertsTab(alerts) : ''}
                ${activeTab === 'doubts' ? renderAdminDoubtsTab(doubts) : ''}
                ${activeTab === 'links' ? renderAdminLinksTab() : ''}
            </div>

            <!-- Modal Footer -->
            <div class="modal-footer p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between">
                <span class="text-xs text-slate-500 font-medium">KV Rewari CS Faculty Administration</span>
                <button onclick="window.closeModal()" class="text-xs font-bold px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300">
                    Close Dashboard
                </button>
            </div>
        </div>
    `;
    openModal(modalHtml, 'admin-dashboard-modal');
}

function switchAdminTab(tab) {
    renderAdminControlPanel(tab);
}

function renderAdminAlertsTab(alerts) {
    return `
        <div class="space-y-4">
            <div class="flex items-center justify-between">
                <div>
                    <h4 class="font-bold text-sm text-slate-900 dark:text-white">Active Homepage Alerts</h4>
                    <p class="text-xs text-slate-500">Edit, add or remove notices displayed in the Alerts box.</p>
                </div>
                <button onclick="window.addNewAlertItem()" class="text-xs font-bold px-3.5 py-2 rounded-xl bg-emerald-700 text-white hover:bg-emerald-800 flex items-center gap-1.5 transition-colors">
                    <span>+ Add New Alert</span>
                </button>
            </div>

            <div class="space-y-3" id="admin-alerts-list">
                ${alerts.map((alt) => `
                    <div class="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
                        <div class="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
                            <div class="sm:col-span-2">
                                <label class="block text-[10px] font-semibold text-slate-500 uppercase">Tag</label>
                                <select id="alert-tag-${alt.id}" class="w-full text-xs p-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold">
                                    <option value="NEW" ${alt.tag === 'NEW' ? 'selected' : ''}>NEW</option>
                                    <option value="REVISION" ${alt.tag === 'REVISION' ? 'selected' : ''}>REVISION</option>
                                    <option value="PRACTICE" ${alt.tag === 'PRACTICE' ? 'selected' : ''}>PRACTICE</option>
                                    <option value="EXAM" ${alt.tag === 'EXAM' ? 'selected' : ''}>EXAM</option>
                                    <option value="NOTICE" ${alt.tag === 'NOTICE' ? 'selected' : ''}>NOTICE</option>
                                </select>
                            </div>
                            <div class="sm:col-span-6">
                                <label class="block text-[10px] font-semibold text-slate-500 uppercase">Alert Text / Announcement</label>
                                <input type="text" id="alert-text-${alt.id}" value="${escapeHtml(alt.text)}" class="w-full text-xs p-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium" placeholder="Alert text...">
                            </div>
                            <div class="sm:col-span-3">
                                <label class="block text-[10px] font-semibold text-slate-500 uppercase">Date</label>
                                <input type="text" id="alert-date-${alt.id}" value="${escapeHtml(alt.date)}" class="w-full text-xs p-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white" placeholder="Oct 10, 2026">
                            </div>
                            <div class="sm:col-span-1 flex justify-end items-end pt-3 sm:pt-0">
                                <button onclick="window.deleteAlertItem('${alt.id}')" class="text-xs p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40" title="Delete Alert">🗑️</button>
                            </div>
                        </div>
                        <div>
                            <label class="block text-[10px] font-semibold text-slate-500 uppercase">Destination Link (Optional Drive / Page URL)</label>
                            <input type="text" id="alert-link-${alt.id}" value="${escapeHtml(alt.link || '')}" class="w-full text-xs p-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-[11px]" placeholder="https://drive.google.com/...">
                        </div>
                    </div>
                `).join('')}
            </div>

            <div class="pt-2 flex justify-end">
                <button onclick="window.saveAllAlerts()" class="text-xs font-bold px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm flex items-center gap-1.5 transition-colors">
                    <span>💾 Save &amp; Update Alerts on Website</span>
                </button>
            </div>
        </div>
    `;
}

function addNewAlertItem() {
    const alerts = getStoredAlerts();
    alerts.unshift({
        id: 'alt_' + Date.now(),
        tag: 'NEW',
        tagType: 'tag-new',
        text: 'New CBSE Study Resource Available',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        link: ''
    });
    localStorage.setItem('cs11_alerts', JSON.stringify(alerts));
    renderAdminControlPanel('alerts');
    renderAlertsList();
}

function deleteAlertItem(id) {
    if (!confirm('Are you sure you want to delete this alert?')) return;
    let alerts = getStoredAlerts();
    alerts = alerts.filter(a => a.id !== id);
    localStorage.setItem('cs11_alerts', JSON.stringify(alerts));
    renderAdminControlPanel('alerts');
    renderAlertsList();
}

function saveAllAlerts() {
    const alerts = getStoredAlerts();
    alerts.forEach(alt => {
        const tagEl = document.getElementById(`alert-tag-${alt.id}`);
        const textEl = document.getElementById(`alert-text-${alt.id}`);
        const dateEl = document.getElementById(`alert-date-${alt.id}`);
        const linkEl = document.getElementById(`alert-link-${alt.id}`);
        if (tagEl) alt.tag = tagEl.value;
        if (textEl && textEl.value.trim()) alt.text = textEl.value.trim();
        if (dateEl && dateEl.value.trim()) alt.date = dateEl.value.trim();
        if (linkEl) alt.link = linkEl.value.trim();

        alt.tagType = (
            alt.tag === 'NEW' ? 'tag-new' :
            alt.tag === 'REVISION' ? 'tag-revision' :
            alt.tag === 'PRACTICE' ? 'tag-practice' :
            alt.tag === 'EXAM' ? 'tag-exam' : 'tag-notice'
        );
    });
    localStorage.setItem('cs11_alerts', JSON.stringify(alerts));
    alert('Alerts updated and published to the website!');
    renderAlertsList();
    renderAdminControlPanel('alerts');
}

function renderAdminDoubtsTab(doubts) {
    if (doubts.length === 0) {
        return `
            <div class="p-8 text-center text-slate-500 space-y-2">
                <span class="text-3xl">💬</span>
                <p class="font-bold text-sm">No Student Doubts Submitted Yet</p>
                <p class="text-xs">When students ask questions via the Doubt Forum or + icon, they will appear here.</p>
            </div>
        `;
    }

    return `
        <div class="space-y-4">
            <div>
                <h4 class="font-bold text-sm text-slate-900 dark:text-white">Student Questions &amp; Faculty Answers</h4>
                <p class="text-xs text-slate-500">Provide official teacher explanations. Answered questions update live in each question's discussion chat.</p>
            </div>

            <div class="space-y-4">
                ${doubts.map(d => {
                    const replies = Array.isArray(d.replies) ? d.replies : [];
                    const teacherReply = replies.find(r => r.isTeacher);
                    const hasTeacher = !!teacherReply;

                    return `
                        <div class="p-4 rounded-xl bg-white dark:bg-slate-900 border ${hasTeacher ? 'border-slate-200 dark:border-slate-800' : 'border-amber-300 dark:border-amber-700/60 shadow-xs'} space-y-3">
                            <div class="flex items-center justify-between text-xs flex-wrap gap-2">
                                <div class="flex items-center gap-2">
                                    <span class="student-token-chip font-bold">👤 ${escapeHtml(d.author)}</span>
                                    <span class="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-600 dark:text-slate-300 font-semibold">${escapeHtml(d.topic)}</span>
                                    ${hasTeacher ? `
                                        <span class="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-[10px] text-emerald-700 dark:text-emerald-300 font-bold">✓ Teacher Answered</span>
                                    ` : `
                                        <span class="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-[10px] text-amber-700 dark:text-amber-300 font-bold animate-pulse">⏳ Awaiting Teacher</span>
                                    `}
                                    <span class="text-[11px] text-slate-500 font-medium">💬 ${replies.length} replies</span>
                                </div>
                                <div class="flex items-center gap-2">
                                    <button onclick="window.openQuestionDiscussionModal('${d.id}')" class="text-xs px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 font-bold flex items-center gap-1 transition-colors">
                                        <span>💬 Open Chat (${replies.length})</span>
                                    </button>
                                    <button onclick="window.deleteStudentDoubt('${d.id}')" class="text-rose-600 hover:text-rose-700 text-xs px-2 py-1 rounded" title="Delete question">🗑️</button>
                                </div>
                            </div>

                            <!-- Question Text -->
                            <div class="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-100">
                                <span class="font-bold text-slate-500 uppercase text-[10px] block mb-1">Student Question:</span>
                                <p class="font-medium text-slate-900 dark:text-slate-100">${escapeHtml(d.question)}</p>
                            </div>

                            <!-- Teacher Answer Input -->
                            <div class="space-y-1.5">
                                <label class="block text-[11px] font-bold text-emerald-800 dark:text-emerald-400 flex items-center gap-1">
                                    <span>🛡️</span>
                                    <span>Official Faculty Verified Solution:</span>
                                </label>
                                <textarea id="admin-answer-${d.id}" rows="3" class="w-full text-xs p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Type verified solution / explanation for this question...">${escapeHtml(teacherReply ? teacherReply.text : (d.answer || ''))}</textarea>
                                <div class="flex justify-end gap-2">
                                    <button onclick="window.saveTeacherDoubtAnswer('${d.id}')" class="text-xs font-bold px-4 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white transition-colors flex items-center gap-1">
                                        <span>✓ Post / Update Official Solution</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
}

function saveTeacherDoubtAnswer(doubtId) {
    const textarea = document.getElementById(`admin-answer-${doubtId}`);
    if (!textarea || !textarea.value.trim()) {
        alert('Please write a solution before saving.');
        return;
    }
    const solutionText = textarea.value.trim();
    const doubts = getStoredDoubts();
    const d = doubts.find(item => item.id === doubtId);
    if (d) {
        if (!Array.isArray(d.replies)) d.replies = [];
        const existingTeacherIndex = d.replies.findIndex(r => r.isTeacher);
        if (existingTeacherIndex >= 0) {
            d.replies[existingTeacherIndex].text = solutionText;
            d.replies[existingTeacherIndex].time = 'Updated just now';
        } else {
            d.replies.push({
                id: 'r_teach_' + Date.now(),
                author: 'KV Rewari CS Faculty',
                text: solutionText,
                time: 'Just now',
                isTeacher: true,
                upvotes: 5
            });
        }
        d.answer = solutionText; // legacy sync
        localStorage.setItem('cs11_doubts', JSON.stringify(doubts));
        alert('Verified teacher solution posted to the discussion chat!');
        renderAdminControlPanel('doubts');
    }
}

function deleteStudentDoubt(doubtId) {
    if (!confirm('Delete this doubt question and its discussion thread?')) return;
    let doubts = getStoredDoubts();
    doubts = doubts.filter(item => item.id !== doubtId);
    localStorage.setItem('cs11_doubts', JSON.stringify(doubts));
    renderAdminControlPanel('doubts');
}

function renderAdminLinksTab() {
    return `
        <div class="space-y-3">
            <div>
                <h4 class="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs">Configure Google Drive Resource Links</h4>
                <p class="text-xs text-slate-500">Update Google Drive folder links for the core learning modules.</p>
            </div>
            ${studyLibraryResources.map(res => `
                <div class="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                    <label class="block text-[11px] font-bold text-slate-700 dark:text-slate-300 capitalize">${res.order}. ${res.title}</label>
                    <input type="text" id="admin-drive-${res.id}" value="${res.driveUrl || ''}" placeholder="https://drive.google.com/..." class="w-full p-2 border rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-mono">
                </div>
            `).join('')}
            <div class="pt-2 flex justify-end">
                <button onclick="window.saveAdminSettings()" class="text-xs font-bold px-4 py-2 rounded-xl bg-emerald-700 text-white hover:bg-emerald-800">Save Drive URLs</button>
            </div>
        </div>
    `;
}

function saveAdminSettings() {
    const customMap = {};
    studyLibraryResources.forEach(res => {
        const input = document.getElementById(`admin-drive-${res.id}`);
        if (input && input.value) {
            const val = input.value.trim();
            res.driveUrl = val;
            customMap[res.id] = val;
            if (res.id === 'res-01') googleDriveResources.revision = val;
            if (res.id === 'res-02') googleDriveResources.mindMaps = val;
            if (res.id === 'res-03') googleDriveResources.questionBanks = val;
            if (res.id === 'res-04') googleDriveResources.syntaxSheet = val;
            if (res.id === 'res-05') googleDriveResources.dailyQuiz = val;
            if (res.id === 'res-06') googleDriveResources.comics = val;
            if (res.id === 'res-07') googleDriveResources.notes = val;
        }
    });
    localStorage.setItem('cs11_custom_drive_urls', JSON.stringify(customMap));
    alert('Google Drive URLs saved and published to the website!');
    renderStudyLibraryCards();
    renderAdminControlPanel('links');
}

// ==========================================================================
// 12. Botanical Dashboard Interactive Modules (Mind Maps, Forum, Tracker, Lofi)
// ==========================================================================

// Mind Maps Module
function openMindMapsModal(activeTab = 'python-basics') {
    const mindMapData = [
        {
            id: 'python-basics',
            title: 'Python Fundamentals',
            unit: 'Unit 2 (45M)',
            nodes: [
                { title: 'Variables & Identifiers', desc: 'Rules: Must begin with letter or _, case-sensitive, no keywords, alphanumeric.' },
                { title: 'Basic Data Types', desc: 'Immutable: Numbers (int, float, complex), Strings, Tuples. Mutable: Lists, Dictionaries, Sets.' },
                { title: 'Operators Hierarchy', desc: 'Arithmetic (**, *, /, //, %, +, -) -> Relational (==, !=, <, >) -> Logical (not, and, or).' },
                { title: 'Type Casting', desc: 'Explicit: int("25"), float(10), str(42). Implicit: Python automatically widens int to float.' }
            ]
        },
        {
            id: 'control-flow',
            title: 'Control Flow & Loops',
            unit: 'Unit 2 (45M)',
            nodes: [
                { title: 'Conditional Statements', desc: 'if, if-elif, if-elif-else blocks with strict 4-space indentation.' },
                { title: 'For Loop & range()', desc: 'range(start, stop, step) generates sequences up to stop-1. Supports negative steps.' },
                { title: 'While Loop (Indefinite)', desc: 'Executes while boolean expression evaluates to True. Guard against infinite loops.' },
                { title: 'Loop Control Statements', desc: 'break: exits loop immediately. continue: skips current iteration to next cycle.' }
            ]
        },
        {
            id: 'data-structures',
            title: 'Strings, Lists & Dicts',
            unit: 'Unit 2 (45M)',
            nodes: [
                { title: 'Strings (Immutable)', desc: 'Indexing [i], Slicing [start:end:step], upper(), lower(), isdigit(), split(), join().' },
                { title: 'Lists (Mutable)', desc: 'Dynamic arrays: append(x), extend(L), insert(i, x), pop(), sort(), reverse().' },
                { title: 'Tuples (Immutable)', desc: 'Protected ordered records: packing, unpacking, len(), min(), max(), count(), index().' },
                { title: 'Dictionaries (Key-Value)', desc: 'Unique immutable keys: d[key], d.get(key), keys(), values(), items(), update().' }
            ]
        },
        {
            id: 'computer-systems',
            title: 'Computer Systems & Logic',
            unit: 'Unit 1 (10M)',
            nodes: [
                { title: 'Hardware Architecture', desc: 'Von Neumann: Input -> CPU (ALU + CU + Registers) -> Primary/Secondary Memory -> Output.' },
                { title: 'Memory Hierarchy', desc: 'Registers (fastest) -> Cache -> RAM/ROM -> SSD/HDD (Secondary Storage).' },
                { title: 'Number Systems', desc: 'Binary (Base 2), Octal (Base 8), Decimal (Base 10), Hexadecimal (Base 16). Conversions.' },
                { title: 'Boolean Logic & Gates', desc: 'Truth tables: AND (.), OR (+), NOT (¬), NAND, NOR, XOR. De Morgan\'s Theorems.' }
            ]
        },
        {
            id: 'society-ethics',
            title: 'Society, Law & Ethics',
            unit: 'Unit 3 (15M)',
            nodes: [
                { title: 'Digital Footprint', desc: 'Active (posts, emails) vs Passive (cookies, IP logs, search history) trails.' },
                { title: 'Cyber Safety & Security', desc: 'Phishing, Ransomware, Identity Theft, Trojan Horses, Two-factor authentication.' },
                { title: 'Cyber Law (IT Act 2000)', desc: 'Indian Information Technology Act 2000, Section 66 (Hacking/Data Theft).' },
                { title: 'IPR & Open Source', desc: 'Copyright, Patents, Trademarks, GPL, Creative Commons, FOSS philosophy.' }
            ]
        }
    ];

    const currentMap = mindMapData.find(m => m.id === activeTab) || mindMapData[0];

    const modalHtml = `
        <div class="modal-container max-w-4xl h-[88vh]">
            <div class="modal-header">
                <div class="flex items-center gap-3">
                    <span class="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center text-sm font-bold">🧠</span>
                    <div>
                        <h3 class="text-base font-bold text-white flex items-center gap-2">
                            <span>Visual Mind Maps</span>
                            <span class="text-[11px] px-2 py-0.5 rounded-full bg-emerald-800 text-emerald-200">CBSE Class 11 CS</span>
                        </h3>
                        <p class="text-xs text-emerald-200/80">Structured concept breakdown for fast revision and mental recall</p>
                    </div>
                </div>
                <div class="flex items-center gap-2">
                    <a href="${googleDriveResources.mindMaps}" target="_blank" rel="noopener" class="text-xs px-3 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-emerald-100 flex items-center gap-1.5 transition-colors">
                        <span>Drive Folder</span>
                        <span>↗</span>
                    </a>
                    <button onclick="window.closeModal()" class="w-8 h-8 rounded-full bg-emerald-800 hover:bg-emerald-700 flex items-center justify-center text-emerald-100 text-sm font-bold">✕</button>
                </div>
            </div>

            <!-- Tabs row -->
            <div class="p-3 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2 overflow-x-auto">
                ${mindMapData.map(m => `
                    <button onclick="window.openMindMapsModal('${m.id}')" class="filter-pill whitespace-nowrap ${m.id === currentMap.id ? 'active' : ''}">
                        ${m.title}
                    </button>
                `).join('')}
            </div>

            <div class="modal-body p-6 overflow-y-auto space-y-5 bg-[#F9FAF8] dark:bg-slate-950">
                <div class="flex items-center justify-between">
                    <div>
                        <h4 class="text-lg font-bold text-slate-900 dark:text-white">${currentMap.title}</h4>
                        <span class="text-xs font-semibold text-emerald-700 dark:text-emerald-400">${currentMap.unit}</span>
                    </div>
                    <span class="text-xs text-slate-500">${currentMap.nodes.length} Key Concept Clusters</span>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    ${currentMap.nodes.map((node, i) => `
                        <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-emerald-600 transition-all flex flex-col justify-between">
                            <div>
                                <div class="flex items-center gap-2 mb-2">
                                    <span class="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center justify-center">${i + 1}</span>
                                    <h5 class="font-bold text-sm text-slate-800 dark:text-slate-100">${node.title}</h5>
                                </div>
                                <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">${node.desc}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div class="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between gap-4">
                    <div class="text-xs text-emerald-900 dark:text-emerald-200">
                        <strong class="font-semibold">Need High-Res PDF Flowcharts?</strong> Download KV Rewari hand-drawn concept maps directly from Google Drive.
                    </div>
                    <a href="${googleDriveResources.mindMaps}" target="_blank" rel="noopener" class="text-xs font-bold px-3 py-1.5 rounded-lg bg-emerald-700 text-white hover:bg-emerald-800 transition-colors whitespace-nowrap">
                        Download PDFs ↗
                    </a>
                </div>
            </div>
        </div>
    `;
    openModal(modalHtml, 'mindmaps-modal');
}

// ==========================================================================
// 13. Student Identity & Doubt Forum with Per-Question Discussion Rooms
// ==========================================================================

function getStudentToken() {
    let token = localStorage.getItem('cs11_student_token');
    if (!token) {
        const hex = Math.floor(0x100 + Math.random() * 0xeff).toString(16).toUpperCase();
        token = `Student #${hex}`;
        localStorage.setItem('cs11_student_token', token);
    }
    return token;
}

function setStudentToken(customName) {
    if (customName && customName.trim()) {
        localStorage.setItem('cs11_student_token', customName.trim());
    }
}

function promptChangeStudentToken(questionId = null) {
    const current = getStudentToken();
    const entered = prompt('Enter your name or custom alias (leave empty to keep anonymous token):', current);
    if (entered !== null) {
        if (entered.trim()) {
            setStudentToken(entered.trim());
        } else {
            localStorage.removeItem('cs11_student_token');
        }
        if (questionId) {
            openQuestionDiscussionModal(questionId);
        } else {
            openDoubtForumModal();
        }
    }
}

function getStoredDoubts() {
    let doubts = [];
    try {
        const stored = localStorage.getItem('cs11_doubts');
        if (stored) {
            doubts = JSON.parse(stored);
        }
    } catch (e) {}

    if (!Array.isArray(doubts) || doubts.length === 0) {
        doubts = [
            {
                id: 'd1',
                author: 'Student #4E1',
                topic: 'Python Basics',
                time: 'Yesterday at 3:30 PM',
                question: 'Why does range(1, 10, 2) stop at 9 and not include 10 in Python?',
                replies: [
                    {
                        id: 'r_101',
                        author: 'Student #8A2',
                        text: 'In Python, range(start, stop, step) is exclusive of the stop value [start, stop). It always halts before reaching 10.',
                        time: 'Yesterday at 4:05 PM',
                        isTeacher: false,
                        upvotes: 4
                    },
                    {
                        id: 'r_102',
                        author: 'KV Rewari CS Faculty',
                        text: 'Correct! range(start, stop, step) generates a half-open mathematical interval. The loop terminates strictly before reaching or exceeding the upper stop bound, so values generated are 1, 3, 5, 7, 9.',
                        time: 'Yesterday at 4:45 PM',
                        isTeacher: true,
                        upvotes: 9
                    }
                ]
            },
            {
                id: 'd2',
                author: 'Student #9B3',
                topic: 'Strings & Lists',
                time: '2 days ago',
                question: 'Can we modify an element inside a tuple if that element is a mutable list?',
                replies: [
                    {
                        id: 'r_201',
                        author: 'Student #1C7',
                        text: 'Yes! The tuple cannot hold a new reference, but the nested list inside can still have .append() or item assignment.',
                        time: '2 days ago',
                        isTeacher: false,
                        upvotes: 3
                    },
                    {
                        id: 'r_202',
                        author: 'KV Rewari CS Faculty',
                        text: 'Spot on. While the tuple container itself is immutable (references cannot be reassigned), any mutable object inside (like a list) can still be modified in-place.',
                        time: '2 days ago',
                        isTeacher: true,
                        upvotes: 7
                    }
                ]
            },
            {
                id: 'd3',
                author: 'Student #7F2',
                topic: 'Computer Systems',
                time: '3 days ago',
                question: 'How do we quickly verify De Morgan\'s Law (A + B)\' = A\' . B\' in exam truth tables?',
                replies: [
                    {
                        id: 'r_301',
                        author: 'KV Rewari CS Faculty',
                        text: 'Draw a 4-row truth table for inputs A and B (00, 01, 10, 11). Compute column (A + B) then invert it to get [1, 0, 0, 0]. Separately calculate A\' and B\', then compute A\' . B\' which yields [1, 0, 0, 0]. Both resultant columns match identically.',
                        time: '3 days ago',
                        isTeacher: true,
                        upvotes: 8
                    }
                ]
            }
        ];
        localStorage.setItem('cs11_doubts', JSON.stringify(doubts));
    } else {
        // Ensure every doubt has a valid replies array (backward compatibility)
        let changed = false;
        doubts.forEach(d => {
            if (!Array.isArray(d.replies)) {
                d.replies = [];
                if (d.answer) {
                    d.replies.push({
                        id: 'r_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
                        author: 'KV Rewari CS Faculty',
                        text: d.answer,
                        time: d.time || 'Recently',
                        isTeacher: true,
                        upvotes: 1
                    });
                }
                changed = true;
            }
        });
        if (changed) {
            localStorage.setItem('cs11_doubts', JSON.stringify(doubts));
        }
    }
    return doubts;
}

// Doubt Forum Main Feed Modal
function openDoubtForumModal(selectedTopic = 'all', searchQuery = '') {
    const doubts = getStoredDoubts();
    const myToken = getStudentToken();

    const filteredDoubts = doubts.filter(d => {
        const matchesTopic = (selectedTopic === 'all') || (d.topic.toLowerCase() === selectedTopic.toLowerCase());
        const matchesSearch = !searchQuery || 
            d.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
            (d.author && d.author.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (d.topic && d.topic.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesTopic && matchesSearch;
    });

    const modalHtml = `
        <div class="modal-container max-w-4xl h-[90vh] flex flex-col">
            <!-- Modal Header -->
            <div class="modal-header bg-[#0D2419] text-white border-b border-[#1A4530] flex items-center justify-between p-4">
                <div class="flex items-center gap-3">
                    <span class="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center text-sm font-bold">💬</span>
                    <div>
                        <h3 class="text-base font-bold text-white flex items-center gap-2">
                            <span>Student Doubt &amp; Discussion Forum</span>
                            <span class="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Live Peer Chat</span>
                        </h3>
                        <p class="text-xs text-emerald-200/80">Separate chat threads per question &bull; Any student can answer &bull; Anonymous tokens</p>
                    </div>
                </div>
                <div class="flex items-center gap-2">
                    <button onclick="window.showAskDoubtModal()" class="text-xs font-bold px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 shadow-sm transition-all" title="Ask a new question (+)">
                        <span class="text-sm font-extrabold">+</span>
                        <span>Ask Doubt</span>
                    </button>
                    <button onclick="window.closeModal()" class="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-sm font-bold">✕</button>
                </div>
            </div>

            <!-- Identity Banner & Filters -->
            <div class="bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-3.5 px-6 flex flex-wrap items-center justify-between gap-3">
                <div class="flex items-center gap-2 text-xs">
                    <span class="text-slate-500 dark:text-slate-400">Your Identity:</span>
                    <span class="student-token-chip font-bold cursor-pointer" onclick="window.promptChangeStudentToken()" title="Click to customize nickname or regenerate token">👤 ${escapeHtml(myToken)} ✎</span>
                    <span class="text-[11px] text-slate-400 hidden sm:inline">(Anonymous identity token)</span>
                </div>
                <div class="flex items-center gap-2 flex-1 max-w-md justify-end">
                    <select id="forum-topic-filter" onchange="window.filterDoubtForum()" class="text-xs p-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white">
                        <option value="all" ${selectedTopic === 'all' ? 'selected' : ''}>All Topics</option>
                        <option value="Python Basics" ${selectedTopic === 'Python Basics' ? 'selected' : ''}>Python Basics</option>
                        <option value="Control Flow" ${selectedTopic === 'Control Flow' ? 'selected' : ''}>Control Flow & Loops</option>
                        <option value="Strings & Lists" ${selectedTopic === 'Strings & Lists' ? 'selected' : ''}>Strings & Lists</option>
                        <option value="Computer Systems" ${selectedTopic === 'Computer Systems' ? 'selected' : ''}>Computer Systems</option>
                        <option value="Practical Exam" ${selectedTopic === 'Practical Exam' ? 'selected' : ''}>Practical Exam</option>
                    </select>
                    <input type="text" id="forum-search-box" value="${escapeHtml(searchQuery)}" oninput="window.filterDoubtForum()" placeholder="Search doubts..." class="text-xs p-1.5 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white w-36 sm:w-48">
                </div>
            </div>

            <!-- Modal Body: Questions List -->
            <div class="modal-body p-6 flex-1 overflow-y-auto space-y-4 bg-[#F8FAF9] dark:bg-slate-950">
                ${filteredDoubts.length === 0 ? `
                    <div class="p-10 text-center text-slate-500 space-y-3">
                        <span class="text-4xl block">🔍</span>
                        <p class="font-bold text-sm">No doubts found matching your search</p>
                        <p class="text-xs">Have a coding doubt or syllabus question? Click below to post!</p>
                        <button onclick="window.showAskDoubtModal()" class="text-xs font-bold px-4 py-2 rounded-xl bg-emerald-700 text-white hover:bg-emerald-800 transition-colors">
                            + Ask Question Now
                        </button>
                    </div>
                ` : `
                    <div class="space-y-3.5">
                        <div class="flex items-center justify-between text-xs text-slate-500 font-semibold px-1">
                            <span>Showing ${filteredDoubts.length} Question Discussion Threads</span>
                            <span>Click any card to open discussion &amp; answer</span>
                        </div>
                        ${filteredDoubts.map(d => {
                            const replies = Array.isArray(d.replies) ? d.replies : [];
                            const hasTeacher = replies.some(r => r.isTeacher);

                            return `
                                <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 hover:shadow-md transition-all cursor-pointer space-y-2.5" onclick="window.openQuestionDiscussionModal('${d.id}')">
                                    <div class="flex items-center justify-between text-xs flex-wrap gap-2">
                                        <div class="flex items-center gap-2">
                                            <span class="student-token-chip font-bold">👤 ${escapeHtml(d.author)}</span>
                                            <span class="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-600 dark:text-slate-400 font-medium">${escapeHtml(d.topic)}</span>
                                            ${hasTeacher ? `
                                                <span class="teacher-verified-badge">✓ Faculty Verified</span>
                                            ` : ''}
                                        </div>
                                        <span class="text-slate-400 text-[11px]">${escapeHtml(d.time || 'Recently')}</span>
                                    </div>

                                    <h4 class="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-snug">
                                        ${escapeHtml(d.question)}
                                    </h4>

                                    <div class="pt-1 flex items-center justify-between text-xs border-t border-slate-100 dark:border-slate-800/80">
                                        <div class="flex items-center gap-2 text-slate-500 text-[11px]">
                                            <span class="font-semibold text-emerald-700 dark:text-emerald-400">💬 ${replies.length} ${replies.length === 1 ? 'Reply' : 'Replies'}</span>
                                            <span>&bull;</span>
                                            <span>Any student can answer</span>
                                        </div>
                                        <span class="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                                            <span>Open Discussion</span>
                                            <span>&rarr;</span>
                                        </span>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                `}
            </div>

            <!-- Modal Footer -->
            <div class="modal-footer p-3.5 px-6 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between text-xs">
                <span class="text-slate-500">Need teacher help? Faculty monitors and answers all threads.</span>
                <button onclick="window.showAskDoubtModal()" class="text-xs font-bold px-4 py-2 rounded-xl bg-emerald-700 text-white hover:bg-emerald-800 transition-colors flex items-center gap-1.5">
                    <span>+ Ask a Doubt</span>
                </button>
            </div>
        </div>
    `;
    openModal(modalHtml, 'doubt-forum-modal');
}

function filterDoubtForum() {
    const topicSelect = document.getElementById('forum-topic-filter');
    const searchBox = document.getElementById('forum-search-box');
    const selectedTopic = topicSelect ? topicSelect.value : 'all';
    const searchQuery = searchBox ? searchBox.value.trim() : '';
    openDoubtForumModal(selectedTopic, searchQuery);
}

// Dedicated Per-Question Chat / Discussion Room
function openQuestionDiscussionModal(questionId) {
    const doubts = getStoredDoubts();
    const d = doubts.find(item => item.id === questionId);
    if (!d) {
        alert('Question not found.');
        openDoubtForumModal();
        return;
    }

    if (!Array.isArray(d.replies)) d.replies = [];
    const myToken = getStudentToken();
    const hasTeacher = d.replies.some(r => r.isTeacher);

    const modalHtml = `
        <div class="modal-container max-w-3xl h-[90vh] flex flex-col">
            <!-- Modal Header -->
            <div class="modal-header bg-[#0D2419] text-white border-b border-[#1A4530] flex items-center justify-between p-4">
                <div class="flex items-center gap-3">
                    <button onclick="window.openDoubtForumModal()" class="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-xs font-bold text-white transition-colors" title="Back to All Doubts">
                        ←
                    </button>
                    <div>
                        <div class="flex items-center gap-2">
                            <span class="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-medium">${escapeHtml(d.topic)}</span>
                            ${hasTeacher ? '<span class="teacher-verified-badge text-[10px]">✓ Faculty Answered</span>' : ''}
                        </div>
                        <h3 class="text-sm font-bold text-white mt-0.5 line-clamp-1">Question Discussion Chat</h3>
                    </div>
                </div>
                <button onclick="window.closeModal()" class="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-xs font-bold">✕</button>
            </div>

            <!-- Modal Body: Thread -->
            <div class="modal-body p-5 flex-1 overflow-y-auto space-y-4 bg-[#F8FAF9] dark:bg-slate-950" id="discussion-chat-scroll">
                
                <!-- Pinned Original Question Banner -->
                <div class="discussion-pinned-q space-y-2">
                    <div class="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                        <div class="flex items-center gap-2">
                            <span>Asked by:</span>
                            <span class="student-token-chip font-bold">👤 ${escapeHtml(d.author)}</span>
                        </div>
                        <span>${escapeHtml(d.time || 'Recently')}</span>
                    </div>
                    <div class="text-sm font-bold text-slate-900 dark:text-white leading-relaxed">
                        ${escapeHtml(d.question)}
                    </div>
                    <div class="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold pt-1">
                        💬 Discussion thread open to all students &amp; teachers
                    </div>
                </div>

                <!-- Messages Feed -->
                <div class="space-y-3 doubt-thread-feed" id="discussion-messages-container">
                    <div class="flex items-center justify-between text-xs text-slate-400 px-1 pt-1">
                        <span>${d.replies.length} ${d.replies.length === 1 ? 'Answer / Comment' : 'Answers & Comments'}</span>
                        <span>Post your answer below</span>
                    </div>

                    ${d.replies.length === 0 ? `
                        <div class="p-8 text-center text-slate-400 dark:text-slate-500 space-y-2 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
                            <span class="text-3xl block">💡</span>
                            <p class="font-bold text-xs text-slate-700 dark:text-slate-300">No student answers yet!</p>
                            <p class="text-[11px]">Be the first classmate to post a solution or hint below.</p>
                        </div>
                    ` : d.replies.map(reply => {
                        return `
                            <div class="chat-bubble-card ${reply.isTeacher ? 'chat-bubble-teacher' : ''} space-y-1.5" id="reply-${reply.id}">
                                <div class="flex items-center justify-between text-xs flex-wrap gap-2">
                                    <div class="flex items-center gap-2">
                                        ${reply.isTeacher ? `
                                            <span class="teacher-verified-badge">🛡️ KV Faculty Solution</span>
                                            <span class="font-bold text-emerald-950 dark:text-emerald-200 text-xs">${escapeHtml(reply.author)}</span>
                                        ` : `
                                            <span class="student-token-chip font-bold">👤 ${escapeHtml(reply.author)}</span>
                                            <span class="text-[10px] text-slate-400 uppercase font-semibold">Student</span>
                                        `}
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <span class="text-[11px] text-slate-400">${escapeHtml(reply.time || 'Recently')}</span>
                                        <button onclick="window.upvoteDiscussionReply('${d.id}', '${reply.id}')" class="text-[11px] px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 text-slate-700 dark:text-slate-300 font-bold flex items-center gap-1 transition-colors" title="Mark helpful">
                                            <span>👍</span>
                                            <span>${reply.upvotes || 0}</span>
                                        </button>
                                    </div>
                                </div>
                                <div class="text-xs text-slate-800 dark:text-slate-100 leading-relaxed whitespace-pre-wrap font-normal">
                                    ${escapeHtml(reply.text)}
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>

            </div>

            <!-- Sticky Chat Input Bar -->
            <div class="chat-input-sticky space-y-2">
                <div class="flex items-center justify-between text-[11.5px]">
                    <div class="flex items-center gap-1.5">
                        <span class="text-slate-500 dark:text-slate-400">Answering as:</span>
                        <span class="student-token-chip font-bold cursor-pointer" onclick="window.promptChangeStudentToken('${d.id}')" title="Click to change your alias">👤 ${escapeHtml(myToken)} ✎</span>
                    </div>
                    <span class="text-[11px] text-slate-400 hidden sm:inline">Press Ctrl+Enter to send</span>
                </div>

                <div class="flex gap-2">
                    <textarea id="discussion-reply-input" rows="2" placeholder="Write your explanation or code solution... (Any student can answer)" onkeydown="if((event.ctrlKey || event.metaKey) && event.key==='Enter') window.submitDiscussionReply('${d.id}')" class="flex-1 text-xs p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"></textarea>
                    <button onclick="window.submitDiscussionReply('${d.id}')" class="text-xs font-bold px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white flex flex-col items-center justify-center gap-0.5 transition-colors whitespace-nowrap shadow-xs">
                        <span>Send</span>
                        <span class="text-base leading-none">↗</span>
                    </button>
                </div>
            </div>
        </div>
    `;
    openModal(modalHtml, 'question-discussion-modal');

    setTimeout(() => {
        const scrollEl = document.getElementById('discussion-chat-scroll');
        if (scrollEl) scrollEl.scrollTop = scrollEl.scrollHeight;
        const input = document.getElementById('discussion-reply-input');
        if (input) input.focus();
    }, 150);
}

// Submit a reply in a question's discussion chat
function submitDiscussionReply(questionId, customText = null, isTeacher = false) {
    const input = document.getElementById('discussion-reply-input');
    const text = customText || (input ? input.value.trim() : '');

    if (!text) {
        alert('Please type your answer or explanation before sending.');
        return;
    }

    const doubts = getStoredDoubts();
    const d = doubts.find(item => item.id === questionId);
    if (!d) return;

    if (!Array.isArray(d.replies)) d.replies = [];

    const nowTime = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    const replyAuthor = isTeacher ? 'KV Rewari CS Faculty' : getStudentToken();

    d.replies.push({
        id: 'r_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
        author: replyAuthor,
        text: text,
        time: `Today at ${nowTime}`,
        isTeacher: isTeacher,
        upvotes: 0
    });

    localStorage.setItem('cs11_doubts', JSON.stringify(doubts));
    openQuestionDiscussionModal(questionId);
}

function upvoteDiscussionReply(questionId, replyId) {
    const doubts = getStoredDoubts();
    const d = doubts.find(item => item.id === questionId);
    if (!d || !Array.isArray(d.replies)) return;

    const r = d.replies.find(item => item.id === replyId);
    if (r) {
        r.upvotes = (r.upvotes || 0) + 1;
        localStorage.setItem('cs11_doubts', JSON.stringify(doubts));
        openQuestionDiscussionModal(questionId);
    }
}

// Ask Doubt Modal (Triggered by + icon on topbar or button in Doubt Forum)
function showAskDoubtModal() {
    const myToken = getStudentToken();

    const modalHtml = `
        <div class="modal-container max-w-lg">
            <div class="modal-header bg-[#0D2419] text-white">
                <div class="flex items-center gap-2.5">
                    <span class="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-extrabold text-sm">+</span>
                    <div>
                        <h3 class="text-sm font-bold text-white">Ask a Doubt / Post Question</h3>
                        <p class="text-[11px] text-emerald-200/80">Opens a separate discussion chat for your question</p>
                    </div>
                </div>
                <button onclick="window.closeModal()" class="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-xs text-white">✕</button>
            </div>

            <div class="modal-body p-6 space-y-4">
                <!-- Identity Box -->
                <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
                    <div>
                        <span class="text-slate-500 dark:text-slate-400 block text-[11px]">Your Identity Token:</span>
                        <span class="student-token-chip font-bold mt-1">👤 ${escapeHtml(myToken)}</span>
                    </div>
                    <span class="text-[11px] text-slate-400">Anonymous student token</span>
                </div>

                <div>
                    <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Optional Custom Nickname</label>
                    <input id="ask-doubt-name-input" type="text" placeholder="Leave blank to use ${myToken}" class="w-full text-xs p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white">
                </div>

                <div>
                    <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Topic / Chapter</label>
                    <select id="ask-doubt-topic-select" class="w-full text-xs p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium">
                        <option value="Python Basics">Python Basics (Variables, Operators, I/O)</option>
                        <option value="Control Flow">Control Flow (if-else, while, for loops)</option>
                        <option value="Strings & Lists">Strings, Lists &amp; Tuples</option>
                        <option value="Computer Systems">Computer Systems, OS &amp; Logic Gates</option>
                        <option value="Practical Exam">Practical Exam Prep &amp; Lab Code</option>
                    </select>
                </div>

                <div>
                    <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Your Question / Doubt / Error Code</label>
                    <textarea id="ask-doubt-question-input" rows="3" placeholder="Describe your doubt, paste the error, or explain where you are stuck..." class="w-full text-xs p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"></textarea>
                </div>
            </div>

            <div class="modal-footer p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <button onclick="window.closeModal()" class="text-xs font-semibold px-4 py-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">
                    Cancel
                </button>
                <button onclick="window.submitStudentDoubt()" class="text-xs font-bold px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white flex items-center gap-1.5 shadow-sm transition-all">
                    <span>Post Question &amp; Open Chat</span>
                    <span>&rarr;</span>
                </button>
            </div>
        </div>
    `;
    openModal(modalHtml, 'ask-doubt-modal');
    setTimeout(() => {
        const q = document.getElementById('ask-doubt-question-input');
        if (q) q.focus();
    }, 150);
}

function submitStudentDoubt() {
    const nameInput = document.getElementById('ask-doubt-name-input');
    const topicSelect = document.getElementById('ask-doubt-topic-select');
    const questionInput = document.getElementById('ask-doubt-question-input');

    if (!questionInput || !questionInput.value.trim()) {
        alert('Please describe your doubt before submitting.');
        return;
    }

    if (nameInput && nameInput.value.trim()) {
        setStudentToken(nameInput.value.trim());
    }

    const doubts = getStoredDoubts();
    const newId = 'd_' + Date.now();
    const authorName = (nameInput && nameInput.value.trim()) || getStudentToken();
    const topicVal = (topicSelect && topicSelect.value) || 'Python Basics';

    const newDoubt = {
        id: newId,
        author: authorName,
        topic: topicVal,
        time: 'Just now',
        question: questionInput.value.trim(),
        replies: []
    };

    doubts.unshift(newDoubt);
    localStorage.setItem('cs11_doubts', JSON.stringify(doubts));

    // Open this question's dedicated chat discussion immediately
    openQuestionDiscussionModal(newId);
}

// Study Tracker Module
function openStudyTrackerModal() {
    let completedTopics = JSON.parse(localStorage.getItem('cs11_completed_topics') || '["cs-01", "cs-02"]');
    const totalTopics = syllabusTopics.length || 8;
    const progressPct = Math.round((completedTopics.length / totalTopics) * 100);

    const modalHtml = `
        <div class="modal-container max-w-3xl h-[86vh]">
            <div class="modal-header">
                <div class="flex items-center gap-3">
                    <span class="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center text-sm font-bold">⭐</span>
                    <div>
                        <h3 class="text-base font-bold text-white">Class 11 CS Study Tracker</h3>
                        <p class="text-xs text-emerald-200/80">Track chapter mastery, study streak & session focus</p>
                    </div>
                </div>
                <button onclick="window.closeModal()" class="w-8 h-8 rounded-full bg-emerald-800 hover:bg-emerald-700 flex items-center justify-center text-emerald-100 text-sm font-bold">✕</button>
            </div>

            <div class="modal-body p-6 overflow-y-auto space-y-6 bg-[#F9FAF8] dark:bg-slate-950">
                <!-- Progress Header -->
                <div class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                    <div class="flex items-center justify-between">
                        <div>
                            <span class="text-xs text-slate-500 uppercase tracking-wider font-semibold">Overall CBSE Syllabus Completion</span>
                            <div class="text-2xl font-bold text-slate-900 dark:text-white">${progressPct}% Completed</div>
                        </div>
                        <div class="text-right">
                            <span class="text-xs px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 font-bold">
                                🔥 5-Day Study Streak
                            </span>
                        </div>
                    </div>
                    <div class="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div class="h-full bg-emerald-600 rounded-full transition-all duration-300" style="width: ${progressPct}%"></div>
                    </div>
                    <div class="flex items-center justify-between text-xs text-slate-500">
                        <span>${completedTopics.length} of ${totalTopics} Syllabus Chapters Completed</span>
                        <span>Session 2026–27</span>
                    </div>
                </div>

                <!-- Chapter Checklist -->
                <div class="space-y-3">
                    <h4 class="font-bold text-sm text-slate-800 dark:text-slate-200">Syllabus Chapters Checklist</h4>
                    <div class="space-y-2">
                        ${syllabusTopics.map((topic, i) => {
                            const isDone = completedTopics.includes(topic.id);
                            return `
                                <div class="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
                                    <label class="flex items-center gap-3 cursor-pointer flex-1">
                                        <input type="checkbox" onchange="window.toggleTopicCompletion('${topic.id}')" ${isDone ? 'checked' : ''} class="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500">
                                        <div>
                                            <span class="text-xs font-bold text-slate-800 dark:text-slate-100 ${isDone ? 'line-through opacity-70' : ''}">${topic.title}</span>
                                            <span class="text-[10px] text-slate-500 ml-2">(${topic.category})</span>
                                        </div>
                                    </label>
                                    <button onclick="window.openChapterReader('${topic.id}')" class="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 hover:underline">
                                        Read Notes →
                                    </button>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
    openModal(modalHtml, 'study-tracker-modal');
}

function toggleTopicCompletion(topicId) {
    let completedTopics = JSON.parse(localStorage.getItem('cs11_completed_topics') || '["cs-01", "cs-02"]');
    if (completedTopics.includes(topicId)) {
        completedTopics = completedTopics.filter(id => id !== topicId);
    } else {
        completedTopics.push(topicId);
    }
    localStorage.setItem('cs11_completed_topics', JSON.stringify(completedTopics));
    openStudyTrackerModal();
}

// Chapter List Modal
function openChapterListModal() {
    const modalHtml = `
        <div class="modal-container max-w-4xl h-[88vh]">
            <div class="modal-header">
                <div class="flex items-center gap-3">
                    <span class="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center text-sm font-bold">📑</span>
                    <div>
                        <h3 class="text-base font-bold text-white">CBSE Class 11 CS Chapter Directory</h3>
                        <p class="text-xs text-emerald-200/80">Complete syllabus overview with marks weightage & periods</p>
                    </div>
                </div>
                <button onclick="window.closeModal()" class="w-8 h-8 rounded-full bg-emerald-800 hover:bg-emerald-700 flex items-center justify-center text-emerald-100 text-sm font-bold">✕</button>
            </div>

            <div class="modal-body p-6 overflow-y-auto space-y-6 bg-[#F9FAF8] dark:bg-slate-950">
                <!-- 3 Units Breakdown -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    ${syllabusOverview.units.map(unit => `
                        <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
                            <div>
                                <span class="text-[11px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 font-bold">Unit ${unit.unitNumber}</span>
                                <h4 class="font-bold text-sm text-slate-900 dark:text-white mt-2">${unit.title}</h4>
                                <p class="text-xs text-slate-600 dark:text-slate-400 mt-1">${unit.shortDesc}</p>
                            </div>
                            <div class="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                                <span class="font-bold text-emerald-700 dark:text-emerald-400">${unit.marks} Marks</span>
                                <span class="text-slate-500">${unit.periods.theory} Th + ${unit.periods.practical} Pr</span>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <!-- Individual Chapters -->
                <div class="space-y-3">
                    <h4 class="font-bold text-sm text-slate-800 dark:text-slate-200">Detailed Topics & Practice Programs</h4>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                        ${syllabusTopics.map(t => `
                            <div class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
                                <div>
                                    <div class="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold uppercase">${t.category}</div>
                                    <div class="text-xs font-bold text-slate-900 dark:text-white">${t.title}</div>
                                </div>
                                <button onclick="window.openChapterReader('${t.id}')" class="text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 transition-colors whitespace-nowrap">
                                    Explore →
                                </button>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
    openModal(modalHtml, 'chapter-list-modal');
}

// Study Library / Drive Resources Modal
function openStudyLibraryModal() {
    const modalHtml = `
        <div class="modal-container max-w-4xl h-[88vh]">
            <div class="modal-header">
                <div class="flex items-center gap-3">
                    <span class="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center text-sm font-bold">📁</span>
                    <div>
                        <h3 class="text-base font-bold text-white">7 Official Google Drive Study Resources</h3>
                        <p class="text-xs text-emerald-200/80">Curated by Neelima Ma'am (PGT CS) • PM SHRI KV Rewari</p>
                    </div>
                </div>
                <button onclick="window.closeModal()" class="w-8 h-8 rounded-full bg-emerald-800 hover:bg-emerald-700 flex items-center justify-center text-emerald-100 text-sm font-bold">✕</button>
            </div>

            <div class="modal-body p-6 overflow-y-auto space-y-4 bg-[#F9FAF8] dark:bg-slate-950">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    ${studyLibraryResources.map(res => `
                        <div class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
                            <div>
                                <div class="flex items-center justify-between mb-2">
                                    <span class="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200 font-bold">${res.order}</span>
                                    <span class="text-[10px] text-slate-500 capitalize">${res.category}</span>
                                </div>
                                <h4 class="font-bold text-sm text-slate-900 dark:text-white">${res.title}</h4>
                                <p class="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">${res.desc}</p>
                            </div>
                            <div class="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                <span class="text-[11px] text-slate-500">${res.fileCount || 'Multi-chapter'} files</span>
                                <a href="${res.driveUrl}" target="_blank" rel="noopener" class="text-xs font-bold px-3 py-1.5 rounded-lg bg-emerald-700 text-white hover:bg-emerald-800 transition-colors flex items-center gap-1">
                                    <span>Open in Drive</span>
                                    <span>↗</span>
                                </a>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    openModal(modalHtml, 'resources-modal');
}

// --------------------------------------------------------------------------
// Web Audio Lo-Fi Synth & Ambient Sound Player
// --------------------------------------------------------------------------
let lofiAudioCtx = null;
let isLofiPlaying = false;
let lofiGainNode = null;
let lofiTimerInterval = null;
let lofiSeconds = 42;
let lofiTrackIdx = 0;

const lofiPlaylist = [
    { title: "lofi study beats", subtitle: "Chill Vibes", chord: [174.61, 220.00, 261.63, 329.63] }, // Fmaj7
    { title: "midnight coding", subtitle: "Soft Rain", chord: [196.00, 233.08, 293.66, 349.23] }, // Gm7
    { title: "forest ambient", subtitle: "Focus Mode", chord: [164.81, 196.00, 246.94, 293.66] }, // Em7
    { title: "coffee shop lofi", subtitle: "Warm Chords", chord: [220.00, 261.63, 329.63, 392.00] } // Am7
];

function toggleLofiPlay() {
    if (!lofiAudioCtx) {
        lofiAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (lofiAudioCtx.state === 'suspended') {
        lofiAudioCtx.resume();
    }

    if (!isLofiPlaying) {
        startLofiAudio();
    } else {
        stopLofiAudio();
    }
}

function startLofiAudio() {
    isLofiPlaying = true;
    const playerCard = document.getElementById('lofi-player-card');
    const playBtn = document.getElementById('lofi-play-btn');
    if (playerCard) playerCard.classList.add('lofi-playing');
    if (playBtn) playBtn.innerHTML = '❚❚';

    try {
        lofiGainNode = lofiAudioCtx.createGain();
        lofiGainNode.gain.setValueAtTime(0.08, lofiAudioCtx.currentTime);

        const filter = lofiAudioCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(650, lofiAudioCtx.currentTime);

        const currentTrack = lofiPlaylist[lofiTrackIdx];
        currentTrack.chord.forEach((freq) => {
            const osc = lofiAudioCtx.createOscillator();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, lofiAudioCtx.currentTime);
            osc.connect(filter);
            osc.start();
        });

        filter.connect(lofiGainNode);
        lofiGainNode.connect(lofiAudioCtx.destination);
    } catch (e) {
        console.warn('Audio synthesis note:', e);
    }

    clearInterval(lofiTimerInterval);
    lofiTimerInterval = setInterval(() => {
        lofiSeconds = (lofiSeconds + 1) % 180;
        const fill = document.getElementById('lofi-progress-fill');
        if (fill) {
            fill.style.width = ((lofiSeconds / 180) * 100) + '%';
        }
    }, 1000);
}

function stopLofiAudio() {
    isLofiPlaying = false;
    const playerCard = document.getElementById('lofi-player-card');
    const playBtn = document.getElementById('lofi-play-btn');
    if (playerCard) playerCard.classList.remove('lofi-playing');
    if (playBtn) playBtn.innerHTML = '▶';

    if (lofiGainNode) {
        try {
            lofiGainNode.gain.setTargetAtTime(0, lofiAudioCtx.currentTime, 0.05);
        } catch (e) {}
    }
    clearInterval(lofiTimerInterval);
}

function nextLofiTrack() {
    lofiTrackIdx = (lofiTrackIdx + 1) % lofiPlaylist.length;
    updateLofiTrackUI();
    if (isLofiPlaying) {
        stopLofiAudio();
        startLofiAudio();
    }
}

function prevLofiTrack() {
    lofiTrackIdx = (lofiTrackIdx - 1 + lofiPlaylist.length) % lofiPlaylist.length;
    updateLofiTrackUI();
    if (isLofiPlaying) {
        stopLofiAudio();
        startLofiAudio();
    }
}

function updateLofiTrackUI() {
    const track = lofiPlaylist[lofiTrackIdx];
    const titleEl = document.getElementById('lofi-track-title');
    const subEl = document.getElementById('lofi-track-sub');
    if (titleEl) titleEl.textContent = track.title;
    if (subEl) subEl.textContent = `— ${track.subtitle}`;
}

// --------------------------------------------------------------------------
// Quote Rotator & Heart Encouragement
// --------------------------------------------------------------------------
const studyQuotes = [
    { text: "Knowing yourself is the beginning of all wisdom.", author: "Aristotle" },
    { text: "Small steps every day lead to big results.", author: "Unknown" },
    { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
    { text: "Simplicity is prerequisite for reliability.", author: "Edsger W. Dijkstra" },
    { text: "Code is like humor. When you have to explain it, it’s bad.", author: "Cory House" },
    { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
    { text: "Consistency is what transforms average into excellence.", author: "Anonymous" }
];
let quoteIdx = 0;

function rotateDailyQuote() {
    quoteIdx = (quoteIdx + 1) % studyQuotes.length;
    const q = studyQuotes[quoteIdx];
    const textEl = document.getElementById('quote-text');
    const authorEl = document.getElementById('quote-author');
    if (textEl && authorEl) {
        textEl.style.opacity = '0';
        authorEl.style.opacity = '0';
        setTimeout(() => {
            textEl.textContent = `"${q.text}"`;
            authorEl.textContent = `— ${q.author}`;
            textEl.style.opacity = '1';
            authorEl.style.opacity = '1';
        }, 150);
    }
}

function cheerKeepGoing(e) {
    let count = parseInt(localStorage.getItem('cs11_cheers') || '42') + 1;
    localStorage.setItem('cs11_cheers', count.toString());

    // Spawn floating heart
    const heart = document.createElement('div');
    heart.className = 'heart-float';
    heart.textContent = '❤️';
    const rect = e.currentTarget.getBoundingClientRect();
    heart.style.left = (rect.left + rect.width / 2) + 'px';
    heart.style.top = (rect.top - 10) + 'px';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 800);

    const subEl = document.getElementById('cheer-sub-text');
    if (subEl) {
        subEl.textContent = `You're doing great! (${count} cheers)`;
    }
}

// ==========================================================================
// Utilities & Global Exports
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
    window._appModuleLoaded = true;

    // Theme & Retro Mode & Smooth Scroll & Mobile Navigation
    window.toggleTheme = toggleTheme;
    window.toggleMobileMenu = toggleMobileMenu;
    window.toggleMobileDrawer = toggleMobileDrawer;
    window.closeMobileDrawer = closeMobileDrawer;
    window.toggleRetroMode = toggleRetroMode;
    window.scrollToTop = scrollToTop;
    window.openDriveResourceByKey = openDriveResourceByKey;

    // Modals & Navigation
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
    window.copyToClipboard = copyToClipboard;

    // Admin & Faculty Portal Handlers
    window.openAdminModal = openAdminModal;
    window.verifyAdminPin = verifyAdminPin;
    window.toggleAdminPasswordVisibility = toggleAdminPasswordVisibility;
    window.adminLogout = adminLogout;
    window.renderAdminControlPanel = renderAdminControlPanel;
    window.switchAdminTab = switchAdminTab;
    window.addNewAlertItem = addNewAlertItem;
    window.deleteAlertItem = deleteAlertItem;
    window.saveAllAlerts = saveAllAlerts;
    window.saveTeacherDoubtAnswer = saveTeacherDoubtAnswer;
    window.deleteStudentDoubt = deleteStudentDoubt;
    window.saveAdminSettings = saveAdminSettings;
    window.renderAlertsList = renderAlertsList;

    // Student Doubt Forum & Per-Question Discussion Handlers
    window.showAskDoubtModal = showAskDoubtModal;
    window.submitStudentDoubt = submitStudentDoubt;
    window.openDoubtForumModal = openDoubtForumModal;
    window.filterDoubtForum = filterDoubtForum;
    window.openQuestionDiscussionModal = openQuestionDiscussionModal;
    window.submitDiscussionReply = submitDiscussionReply;
    window.upvoteDiscussionReply = upvoteDiscussionReply;
    window.promptChangeStudentToken = promptChangeStudentToken;

    // Dashboard Interactive Modules
    window.openMindMapsModal = openMindMapsModal;
    window.openStudyTrackerModal = openStudyTrackerModal;
    window.toggleTopicCompletion = toggleTopicCompletion;
    window.openChapterListModal = openChapterListModal;
    window.openStudyLibraryModal = openStudyLibraryModal;
    window.toggleLofiPlay = toggleLofiPlay;
    window.nextLofiTrack = nextLofiTrack;
    window.prevLofiTrack = prevLofiTrack;
    window.rotateDailyQuote = rotateDailyQuote;
    window.cheerKeepGoing = cheerKeepGoing;
}
