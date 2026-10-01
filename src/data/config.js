/**
 * CS 11 — COMPUTER SCIENCE LEARNING HUB
 * PM SHRI Kendriya Vidyalaya, Rewari (CBSE 2026–27)
 * Central Configuration File
 * 
 * All 7 Google Drive Resource links are centrally managed here.
 * You can easily update any link below without modifying UI code.
 */

export const googleDriveResources = {
    // 01. Revision & Important Topics
    revision: "https://drive.google.com/drive/folders/1oe7AQFV4nwjeGI4hvKzvQgQLTszxYFSd?usp=sharing",

    // 02. Mind Maps
    mindMaps: "https://drive.google.com/drive/folders/113Mg-GfhnKs6YmFD2iYOAfttZr_1bkoO?usp=sharing",

    // 03. Important Questions & Question Banks
    questionBanks: "https://drive.google.com/drive/folders/1aIJBU5Yj-G-GcmRKYfk5d3EUVak7Z4wz?usp=sharing",

    // 04. Formula, Syntax & Definitions
    syntaxSheet: "https://drive.google.com/drive/folders/1Za5mPzf3rV6SkvZfJ3n_7OZzpFjyHlvw?usp=sharing",

    // 05. Daily Quiz
    dailyQuiz: "https://drive.google.com/drive/folders/1Z-tWMvfyVBRNYTXz3jyaT238hkviQbwQ?usp=sharing",

    // 06. Comics
    comics: "https://drive.google.com/drive/folders/1AT-FTi7FTUK6RpMHSPXDBjaUK1KC1XUW?usp=sharing",

    // 07. Chapter Notes & PDFs
    notes: "https://drive.google.com/drive/folders/15Ux9MYwerFRbc1iXsVsx6s2iWgiOUXwj?usp=sharing"
};

// Aliased for legacy references
export const resourceLinks = {
    ...googleDriveResources,
    lectures: "https://www.youtube.com/results?search_query=cbse+class+11+computer+science+python",
    ncertTextbook: "https://ncert.nic.in/textbook.php?kecs1=1-8",
    syllabusPdf: "https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/Computer_Science_SecP2_2026-27.pdf"
};

export const teacherInfo = {
    name: "Neelima Ma'am",
    designation: "PGT Computer Science",
    school: "PM SHRI Kendriya Vidyalaya, Rewari",
    welcomeMessage: "Welcome to CS 11! Computer Science (Code 083) is about computational thinking, algorithmic logic, and practical problem-solving. Make the most of these curated Google Drive resources, practice each practical program, and prepare with confidence.",
    subjects: [
        "Computer Science (Code 083)",
        "Python Programming & Problem Solving",
        "Computer Systems & Boolean Logic"
    ]
};

export const schoolInfo = {
    name: "PM SHRI Kendriya Vidyalaya, Rewari",
    region: "Gurugram Region",
    board: "CBSE (Central Board of Secondary Education)",
    session: "2026–27",
    subjectCode: "083 — Computer Science",
    class: "XI"
};
