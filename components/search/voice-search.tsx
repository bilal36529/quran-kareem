'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface VoiceSearchProps {
  onResult: (transcript: string) => void;
}

export default function VoiceSearch({ onResult }: VoiceSearchProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let recognition: any = null;

    if ('webkitSpeechRecognition' in window) {
      recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsListening(true);
        setError(null);
      };

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result) => result.transcript)
          .join('');
        setTranscript(transcript);
      };

      recognition.onerror = (event: any) => {
        setError('Voice recognition failed. Please try again.');
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
        if (transcript) {
          onResult(transcript);
          setShowDialog(false);
        }
      };
    }

    return () => {
      if (recognition) recognition.abort();
    };
  }, [onResult, transcript]);

  const startListening = () => {
    setTranscript('');
    setError(null);
    setShowDialog(true);
    
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.start();
    } else {
      setError('Voice recognition is not supported in your browser.');
    }
  };

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        onClick={startListening}
        title="Voice Search"
      >
        <Mic className="h-4 w-4" />
      </Button>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Voice Search</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-8">
            {error ? (
              <div className="text-destructive text-center mb-4">{error}</div>
            ) : isListening ? (
              <>
                <div className="animate-pulse mb-4">
                  <Mic className="h-12 w-12 text-primary" />
                </div>
                <p className="text-center text-muted-foreground">
                  Listening... Speak now
                </p>
                {transcript && (
                  <p className="mt-4 text-center font-medium">{transcript}</p>
                )}
              </>
            ) : (
              <Button onClick={startListening}>
                Start Speaking
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}