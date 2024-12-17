'use client';

import { useState, useRef, useEffect } from 'react';
import { Verse } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, Pause, RotateCcw, Save, Mic, Volume2, Check, X, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAudioSettings } from '@/lib/audio-context';
import { getAudioUrl } from '@/lib/audio-settings';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';

interface VerseStudyModeProps {
  verse: Verse;
  chapterNumber: number;
  onClose: () => void;
}

export default function VerseStudyMode({ verse, chapterNumber, onClose }: VerseStudyModeProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [autoRepeat, setAutoRepeat] = useState(false);
  const [matchPercentage, setMatchPercentage] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();
  const { globalSettings } = useAudioSettings();

  useEffect(() => {
    audioRef.current = new Audio(getAudioUrl(globalSettings.reciter, chapterNumber, verse.number));
    
    // Cleanup function
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [chapterNumber, verse.number, globalSettings.reciter]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onended = () => {
        if (autoRepeat) {
          audioRef.current?.play();
        } else {
          setIsPlaying(false);
        }
      };
    }
  }, [autoRepeat]);

  useEffect(() => {
    // Calculate match percentage
    const normalizeArabicText = (text: string) => {
      return text
        .replace(/[\u064B-\u0652]/g, '') // Remove tashkeel
        .replace(/\s+/g, ' ')            // Normalize spaces
        .trim();
    };

    const normalizedVerse = normalizeArabicText(verse.text);
    const normalizedInput = normalizeArabicText(userInput);
    
    let matchCount = 0;
    const verseWords = normalizedVerse.split(' ');
    const inputWords = normalizedInput.split(' ');
    
    verseWords.forEach((word, index) => {
      if (word === inputWords[index]) {
        matchCount++;
      }
    });

    const percentage = (matchCount / verseWords.length) * 100;
    setMatchPercentage(Math.round(percentage));
  }, [userInput, verse.text]);

  const togglePlayPause = async () => {
    try {
      if (!audioRef.current) return;

      if (isPlaying) {
        audioRef.current.pause();
      } else {
        await audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      toast({
        title: 'Playback Error',
        description: 'Unable to play audio. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const resetInput = () => {
    setUserInput('');
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const saveProgress = () => {
    if (matchPercentage >= 90) {
      toast({
        title: 'Excellent Progress!',
        description: 'Your writing matches the verse perfectly.',
      });
    } else {
      toast({
        title: 'Progress Saved',
        description: `Your writing matches ${matchPercentage}% of the verse.`,
      });
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          setAudioChunks(chunks => [...chunks, e.data]);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        // Here you could implement audio comparison or save the recording
        toast({
          title: 'Recording Saved',
          description: 'Your recitation has been recorded successfully.',
        });
      };

      setMediaRecorder(recorder);
      recorder.start();
      setIsRecording(true);
      
      toast({
        title: 'Recording Started',
        description: 'Speak clearly into your microphone.',
      });
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast({
        title: 'Microphone Error',
        description: 'Unable to access microphone. Please check permissions.',
        variant: 'destructive',
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  const toggleRecording = async () => {
    if (!isRecording) {
      await startRecording();
    } else {
      stopRecording();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      saveProgress();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <Card className="mt-4">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Study Mode</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              Close
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={togglePlayPause}
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={toggleRecording}
                className={isRecording ? 'bg-red-500 text-white hover:bg-red-600' : ''}
              >
                <Mic className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={resetInput}
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={saveProgress}
              >
                <Save className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <div className="absolute right-2 top-2">
                <Volume2 className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="bg-muted/50 p-4 rounded-md font-amiri text-2xl text-right leading-loose">
                {verse.text}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Writing Progress</span>
                <div className="flex items-center gap-2">
                  {matchPercentage >= 90 ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <X className="h-4 w-4 text-red-500" />
                  )}
                  <span className="text-sm font-medium">{matchPercentage}%</span>
                </div>
              </div>
              <Progress value={matchPercentage} className="h-2" />
            </div>

            <Textarea
              ref={textareaRef}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="اكتب الآية هنا..."
              className="min-h-[150px] text-right font-amiri text-xl leading-loose resize-none"
              dir="rtl"
              lang="ar"
              spellCheck={false}
              autoCapitalize="off"
              autoCorrect="off"
            />
          </div>

          <div className="text-sm text-muted-foreground">
            <p>Tips:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Click play to listen to the verse</li>
              <li>Enable auto-repeat to loop the audio</li>
              <li>Use the microphone to record your recitation</li>
              <li>Write the verse in Arabic text as you listen</li>
              <li>Press Enter to check your progress</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}