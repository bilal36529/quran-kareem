'use client';

import { useState, useEffect } from 'react';
import { ReadingPlan, ReadingProgress } from '@/lib/types';
import { readingPlanService } from '@/lib/reading-plans';

export function useReadingPlans() {
  const [plans, setPlans] = useState<ReadingPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPlans = () => {
      const storedPlans = readingPlanService.getPlans();
      setPlans(storedPlans);
      setLoading(false);
    };

    loadPlans();
  }, []);

  const createPlan = (plan: Omit<ReadingPlan, 'id'>) => {
    const newPlan = readingPlanService.createPlan(plan);
    setPlans(prev => [...prev, newPlan]);
    return newPlan;
  };

  const updatePlan = (id: string, updates: Partial<ReadingPlan>) => {
    const updatedPlan = readingPlanService.updatePlan(id, updates);
    if (updatedPlan) {
      setPlans(prev => prev.map(p => p.id === id ? updatedPlan : p));
    }
    return updatedPlan;
  };

  const deletePlan = (id: string) => {
    const success = readingPlanService.deletePlan(id);
    if (success) {
      setPlans(prev => prev.filter(p => p.id !== id));
    }
    return success;
  };

  const getProgress = (chapterId: number): ReadingProgress | null => {
    return readingPlanService.getProgress(chapterId);
  };

  const updateProgress = (chapterId: number, progress: Partial<ReadingProgress>) => {
    readingPlanService.updateProgress(chapterId, progress);
  };

  return {
    plans,
    loading,
    createPlan,
    updatePlan,
    deletePlan,
    getProgress,
    updateProgress,
  };
}