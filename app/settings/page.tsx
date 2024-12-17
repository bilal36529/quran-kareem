import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import SettingsInterface from '@/components/settings/settings-interface';

export default function SettingsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <Suspense fallback={<Skeleton className="h-[600px]" />}>
        <SettingsInterface />
      </Suspense>
    </div>
  );
}