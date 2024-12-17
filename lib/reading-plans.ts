'use client';

import { ReadingPlan, ReadingProgress } from './types';

class ReadingPlanService {
  private static instance: ReadingPlanService;
  private storageKey = 'quran-reading-plans';
  private progressKey = 'quran-reading-progress';

  private constructor() {}

  public static getInstance(): ReadingPlanService {
    if (!ReadingPlanService.instance) {
      ReadingPlanService.instance = new ReadingPlanService();
    }
    return ReadingPlanService.instance;
  }

  public getPlans(): ReadingPlan[] {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [];
  }

  public getPlan(id: string): ReadingPlan | null {
    const plans = this.getPlans();
    return plans.find(plan => plan.id === id) || null;
  }

  public createPlan(plan: Omit<ReadingPlan, 'id'>): ReadingPlan {
    const newPlan: ReadingPlan = {
      ...plan,
      id: crypto.randomUUID(),
    };
    const plans = this.getPlans();
    plans.push(newPlan);
    localStorage.setItem(this.storageKey, JSON.stringify(plans));
    return newPlan;
  }

  public updatePlan(id: string, updates: Partial<ReadingPlan>): ReadingPlan | null {
    const plans = this.getPlans();
    const index = plans.findIndex(plan => plan.id === id);
    if (index === -1) return null;

    const updatedPlan = { ...plans[index], ...updates };
    plans[index] = updatedPlan;
    localStorage.setItem(this.storageKey, JSON.stringify(plans));
    return updatedPlan;
  }

  public deletePlan(id: string): boolean {
    const plans = this.getPlans();
    const filtered = plans.filter(plan => plan.id !== id);
    if (filtered.length === plans.length) return false;
    localStorage.setItem(this.storageKey, JSON.stringify(filtered));
    return true;
  }

  public getProgress(chapterId: number): ReadingProgress | null {
    if (typeof window === 'undefined') return null;
    const stored = localStorage.getItem(this.progressKey);
    const progress = stored ? JSON.parse(stored) : {};
    return progress[chapterId] || null;
  }

  public updateProgress(chapterId: number, progress: Partial<ReadingProgress>): void {
    const stored = localStorage.getItem(this.progressKey);
    const allProgress = stored ? JSON.parse(stored) : {};
    allProgress[chapterId] = { ...allProgress[chapterId], ...progress };
    localStorage.setItem(this.progressKey, JSON.stringify(allProgress));
  }

  public calculateStreak(): { current: number; longest: number } {
    const stored = localStorage.getItem(this.progressKey);
    if (!stored) return { current: 0, longest: 0 };

    const progress = JSON.parse(stored);
    const dates = Object.values(progress)
      .map((p: any) => new Date(p.lastReadDate))
      .sort((a, b) => b.getTime() - a.getTime());

    if (dates.length === 0) return { current: 0, longest: 0 };

    let currentStreak = 0;
    let longestStreak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    for (const date of dates) {
      date.setHours(0, 0, 0, 0);
      const diffDays = Math.floor((currentDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

      if (diffDays <= 1) {
        currentStreak++;
        longestStreak = Math.max(longestStreak, currentStreak);
        currentDate = date;
      } else {
        break;
      }
    }

    return { current: currentStreak, longest: longestStreak };
  }
}

export const readingPlanService = ReadingPlanService.getInstance();