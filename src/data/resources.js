/**
 * CS 11 — STUDY LIBRARY RESOURCE DATA
 * PM SHRI Kendriya Vidyalaya, Rewari (CBSE 2026–27)
 * 
 * EXACT ORDER AS SPECIFIED BY USER & REFERENCE SCREENSHOT:
 * 01. Revision & Important Topics
 * 02. Mind Maps
 * 03. Important Questions & Question Banks
 * 04. Formula, Syntax & Definitions
 * 05. Daily Quiz
 * 06. Comics
 * 07. Chapter Notes & PDFs
 */

import { googleDriveResources } from './config.js';

export const studyLibraryResources = [
    {
        id: "res-01",
        order: "01",
        title: "Revision & Important Topics",
        description: "Important chapter-wise topics, revision notes and exam preparation material.",
        driveUrl: googleDriveResources.revision,
        category: "revision",
        categoryName: "Revision & Topics",
        badge: "Exam Revision",
        accent: "amber",
        iconSvg: `<svg class="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>`
    },
    {
        id: "res-02",
        order: "02",
        title: "Mind Maps",
        description: "Visual chapter summaries and concept maps for easier revision.",
        driveUrl: googleDriveResources.mindMaps,
        category: "mindmaps",
        categoryName: "Mind Maps",
        badge: "Visual Learning",
        accent: "purple",
        iconSvg: `<svg class="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
        </svg>`
    },
    {
        id: "res-03",
        order: "03",
        title: "Important Questions & Question Banks",
        description: "Important questions, MCQs, practice worksheets and question collections.",
        driveUrl: googleDriveResources.questionBanks,
        category: "questions",
        categoryName: "Question Banks",
        badge: "CBSE Bank",
        accent: "blue",
        iconSvg: `<svg class="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>`
    },
    {
        id: "res-04",
        order: "04",
        title: "Formula, Syntax & Definitions",
        description: "Quick-reference Python syntax, definitions, commands and important concepts.",
        driveUrl: googleDriveResources.syntaxSheet,
        category: "syntax",
        categoryName: "Formula & Syntax",
        badge: "Quick Reference",
        accent: "indigo",
        iconSvg: `<svg class="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>`
    },
    {
        id: "res-05",
        order: "05",
        title: "Daily Quiz",
        description: "Daily Computer Science quizzes and question practice.",
        driveUrl: googleDriveResources.dailyQuiz,
        category: "quiz",
        categoryName: "Daily Quiz",
        badge: "Daily Practice",
        accent: "orange",
        iconSvg: `<svg class="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>`
    },
    {
        id: "res-06",
        order: "06",
        title: "Comics",
        description: "Educational comics and illustrated explanations for learning Computer Science concepts.",
        driveUrl: googleDriveResources.comics,
        category: "comics",
        categoryName: "Comics",
        badge: "Illustrated",
        accent: "rose",
        iconSvg: `<svg class="w-6 h-6 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>`
    },
    {
        id: "res-07",
        order: "07",
        title: "Chapter Notes & PDFs",
        description: "Chapter-wise study notes, downloadable PDFs and learning material.",
        driveUrl: googleDriveResources.notes,
        category: "notes",
        categoryName: "Chapter Notes & PDFs",
        badge: "Full Notes",
        accent: "emerald",
        iconSvg: `<svg class="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>`
    }
];

export const resourceCategories = [
    { id: "all", name: "All Resources" },
    { id: "revision", name: "Revision & Topics" },
    { id: "mindmaps", name: "Mind Maps" },
    { id: "questions", name: "Question Banks" },
    { id: "syntax", name: "Formula & Syntax" },
    { id: "quiz", name: "Daily Quiz" },
    { id: "comics", name: "Comics" },
    { id: "notes", name: "Chapter Notes & PDFs" }
];
