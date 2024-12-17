import { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/constants';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Users, Target, Mail, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

export const metadata: Metadata = {
  title: `About - ${SITE_CONFIG.name}`,
  description: SITE_CONFIG.description,
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">About Quran Kareem</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A modern digital platform dedicated to making the Holy Quran accessible and interactive for everyone.
          </p>
        </div>

        <div className="space-y-8">
          {/* Personal Introduction */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Heart className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h2 className="text-xl font-semibold mb-3">Our Mission</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    As-salaam-alaikum, I&apos;m Abdirahman Ahmed, the creator of Quran Kareem. This project is a deeply personal endeavor, 
                    dedicated to my beloved parents and ultimately for the sake of the afterlife, Insha&apos;Allah. Their love, prayers, 
                    and sacrifices have shaped who I am today, and this platform is a reflection of my gratitude.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mission */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Target className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h2 className="text-xl font-semibold mb-3">Our Mission</h2>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Provide easy access to the Quran for everyone</li>
                    <li>• Foster a deeper connection with the teachings of Islam</li>
                    <li>• Create an intuitive and modern learning experience</li>
                    <li>• Encourage daily reflection and understanding</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Users className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h2 className="text-xl font-semibold mb-3">Key Features</h2>
                  <div className="grid sm:grid-cols-2 gap-4 text-muted-foreground">
                    <ul className="space-y-2">
                      <li>• Complete Quranic text with translations</li>
                      <li>• High-quality audio recitations</li>
                      <li>• Word-by-word analysis</li>
                    </ul>
                    <ul className="space-y-2">
                      <li>• Advanced search capabilities</li>
                      <li>• Personalized reading experience</li>
                      <li>• Offline access support</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Mail className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h2 className="text-xl font-semibold mb-3">Get in Touch</h2>
                  <p className="text-muted-foreground mb-4">
                    Your feedback and suggestions are valuable to us. Feel free to reach out:
                  </p>
                  <p className="text-muted-foreground">Email: gobmedia2@gmail.com</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Closing Note */}
          <div className="text-center mt-12 space-y-4">
            <p className="text-muted-foreground">
              May Allah accept this effort and reward all who engage with His words.
            </p>
            <p className="text-sm text-muted-foreground">
              Thank you for your support and prayers. Together, we can make this project grow and reach more people.
            </p>
          </div>
        </div>
      </div>
      {/* API Attributions */}
      <Card className="mt-8">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
            Attributions
          </h2>
          <div className="space-y-4 text-muted-foreground">
            <div>
              <h3 className="font-medium text-foreground">Quran Data</h3>
              <p>Quran text, translations and API provided by <a href="https://quran.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Quran.com</a></p>
            </div>

            <div>
              <h3 className="font-medium text-foreground">Audio Recitations</h3>
              <p>Audio recitations provided by <a href="https://everyayah.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">EveryAyah.com</a></p>
            </div>

            <div>
              <h3 className="font-medium text-foreground">Names of Allah</h3>
              <p>Names of Allah data provided by <a href="https://aladhan.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">AlAdhan.com</a></p>
            </div>

            <div className="text-sm pt-4 border-t">
              <p>We are grateful to these services for providing access to their APIs and data. Please visit their websites to learn more about their work.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}