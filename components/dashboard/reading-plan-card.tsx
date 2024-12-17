'use client';

import { ReadingPlan } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ScrollText, Calendar, Target, Edit, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

interface ReadingPlanCardProps {
  plan: ReadingPlan;
  onEdit: (plan: ReadingPlan) => void;
  onDelete: (id: string) => void;
}

export default function ReadingPlanCard({ plan, onEdit, onDelete }: ReadingPlanCardProps) {
  const completionPercentage = (plan.progress.completed.length / plan.chapters.length) * 100;
  const daysUntilTarget = Math.ceil(
    (new Date(plan.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold">{plan.name}</CardTitle>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(plan)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(plan.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              <span className="capitalize">{plan.goal}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{format(new Date(plan.targetDate), 'MMM d, yyyy')}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{Math.round(completionPercentage)}%</span>
            </div>
            <Progress value={completionPercentage} className="h-2" />
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <ScrollText className="h-4 w-4 text-muted-foreground" />
              <span>{plan.chapters.length} chapters planned</span>
            </div>
            <span className="text-muted-foreground">
              {daysUntilTarget} days remaining
            </span>
          </div>

          {plan.lastRead && (
            <p className="text-xs text-muted-foreground">
              Last read: {format(new Date(plan.progress.lastRead), 'MMM d, yyyy')}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}