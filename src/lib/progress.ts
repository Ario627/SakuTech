export type UserProgresss = {
    xp: number;
    completedChapters: string[];
    currentStreaks: number;
    lastActiveDate: string;
}

const STORAGE_KEY = "sakutech-progress";

const DEFAULT_PROGRESS: UserProgresss = {
    xp: 0,
    completedChapters: [],
    currentStreaks: 0,
    lastActiveDate: new Date().toISOString().split("T")[0], 
}

function isValidProgress(data: unknown): data is UserProgresss{
    if (typeof data !== "object" || data === null) return false;
    const d = data as Record<string, unknown>;
    return (
        typeof d.xp === "number" &&
        Array.isArray(d.completedChapters) &&
        d.completedChapters.every((c): c is string => typeof c === "string") &&
        typeof d.currentStreak === "number" &&
        typeof d.lastActiveDate === "string"
    );
}

export function getProgress(): UserProgresss {
    if(typeof window === "undefined") return {...DEFAULT_PROGRESS};

    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if(!raw) return {...DEFAULT_PROGRESS}

        const parsed: unknown = JSON.parse(raw);

        return isValidProgress(parsed) ? parsed : {...DEFAULT_PROGRESS};
    } catch{
        return {...DEFAULT_PROGRESS}
    }
}

export function saveProgress(progress: UserProgresss): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function addXp(amount: number): UserProgresss {
    const progress = getProgress();
    progress.xp += amount;
    saveProgress(progress);
    return progress;
}

export function completeChapter(chapterId: string, xpReward = 15): UserProgresss {
    const progress = getProgress();
    if(progress.completedChapters.includes(chapterId)) return progress;

    progress.completedChapters.push(chapterId);
    progress.xp += xpReward;

    saveProgress(progress);
    return progress;
}

export function updateStreak(): UserProgresss {
    const progress = getProgress();
    const today = new Date().toISOString().split("T")[0];
    const lastDate = progress.lastActiveDate;

    if(lastDate === today) return progress;

    const lastTime = new Date(lastDate).getTime();
    const todayTime = new Date(today).getTime();
    const diffDays = Math.round((todayTime - lastTime) / (1000 * 60 * 60 * 24));


    progress.currentStreaks = diffDays <= 1 ? progress.currentStreaks + 1 : 1;
    progress.lastActiveDate = today;
    saveProgress(progress);
    return progress;
}


export function isChapterCompleted(chapterId: string): boolean {
  return getProgress().completedChapters.includes(chapterId);
}

export function getArcProgress(arcId: string, totalChapters: number): number {
  const progress = getProgress();
  return progress.completedChapters.filter((id) => id.startsWith(arcId)).length;
}

export function resetProgress(): void {
  saveProgress({ ...DEFAULT_PROGRESS });
}