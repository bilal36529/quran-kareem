'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppearanceSettings from './appearance-settings';
import AudioSettings from './audio-settings';
import StorageSettings from './storage-settings';

export default function SettingsInterface() {
  const [activeTab, setActiveTab] = useState('appearance');

  return (
    <Card className="max-w-4xl mx-auto">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="audio">Audio</TabsTrigger>
          <TabsTrigger value="storage">Offline</TabsTrigger>
        </TabsList>

        <TabsContent value="appearance">
          <AppearanceSettings />
        </TabsContent>

        <TabsContent value="audio">
          <AudioSettings />
        </TabsContent>

        <TabsContent value="storage">
          <StorageSettings />
        </TabsContent>
      </Tabs>
    </Card>
  );
}