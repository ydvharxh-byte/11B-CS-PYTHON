/**
 * KV REWARI - CLASS 11 PYTHON HUB
 * Daily Quiz Leaderboard State & Default Configuration
 */

export const leaderboardConfig = {
    // Secret Admin Passcode for opening the upload panel
    adminPin: "1108",
    
    // Default or Fallback Leaderboard State
    defaultLeaderboard: {
        id: "daily-quiz-current",
        title: "Daily Python Quiz — Championship Leaderboard",
        date: "Today",
        quizNumber: "Daily Quiz Series",
        topic: "CBSE Unit 2 Python Programming",
        imageUrl: "", // Base64 data URL or path to uploaded PNG
        teacherNote: "Great performance by all participants! Practice daily to master Python logic and secure 45/45 theory + 30/30 practical marks.",
        topRankers: [
            { rank: 1, name: "Student 1", badge: "🥇 Rank 1", score: "10/10", time: "1m 45s" },
            { rank: 2, name: "Student 2", badge: "🥈 Rank 2", score: "10/10", time: "2m 10s" },
            { rank: 3, name: "Student 3", badge: "🥉 Rank 3", score: "9/10", time: "1m 58s" }
        ],
        totalParticipants: "Class 11-B",
        lastUpdated: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    }
};

const STORAGE_KEY = "kv_rewari_daily_leaderboard_v1";

/**
 * Get the current leaderboard from LocalStorage or Fallback
 */
export function getStoredLeaderboard() {
    try {
        const localData = localStorage.getItem(STORAGE_KEY);
        if (localData) {
            const parsed = JSON.parse(localData);
            return { ...leaderboardConfig.defaultLeaderboard, ...parsed };
        }
    } catch (e) {
        console.warn("Could not read leaderboard from storage", e);
    }
    return leaderboardConfig.defaultLeaderboard;
}

/**
 * Save updated leaderboard to LocalStorage
 */
export function saveStoredLeaderboard(data) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        return true;
    } catch (e) {
        console.error("Failed to save leaderboard", e);
        return false;
    }
}

/**
 * Reset leaderboard to default state
 */
export function resetStoredLeaderboard() {
    try {
        localStorage.removeItem(STORAGE_KEY);
        return true;
    } catch (e) {
        return false;
    }
}
