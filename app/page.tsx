'use client';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookText, Headphones, BookOpen, Search, Sparkles, Settings2, Star, Heart } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background via-background/95 to-accent/10 pt-16 pb-32">
        <div className="absolute inset-0 islamic-pattern opacity-5" />
        <div className="container mx-auto px-4 relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-block mb-8 relative">
              <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
              <BookText className="w-20 h-20 text-primary relative" />
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary/90 to-primary/70">
                Qurankareem.apps
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Memorize Quran with modern technology
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
              <Link href="/quran" className="flex-1">
                <Button size="lg" className="w-full gap-2 h-12">
                  <BookOpen className="h-5 w-5" />
                  Start Reading
                </Button>
              </Link>
              <Link href="/search" className="flex-1">
                <Button size="lg" variant="outline" className="w-full gap-2 h-12">
                  <Search className="h-5 w-5" />
                  Search Quran
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 bg-gradient-to-t from-background to-background/80">
        <div className="container mx-auto px-4">
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div variants={item}>
              <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4">Features</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover powerful tools designed to enhance your Quranic experience
              </p>
            </motion.div>
          </motion.div>

          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={item}>
                <Card className="group h-full modern-card">
                  <div className="p-6 sm:p-8">
                    <div className="mb-6 p-3 rounded-xl bg-primary/10 w-fit 
                                  group-hover:bg-primary/20 transition-colors">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}

const features = [
  {
    icon: <BookOpen className="h-6 w-6 text-primary" />,
    title: "Complete Quran",
    description: "Access the complete Quran with beautiful Arabic typography and translations"
  },
  {
    icon: <Headphones className="h-6 w-6 text-primary" />,
    title: "Audio Recitation",
    description: "Listen to beautiful recitations from renowned Qaris with verse-by-verse audio"
  },
  {
    icon: <Sparkles className="h-6 w-6 text-primary" />,
    title: "Word Analysis",
    description: "Understand the deeper meaning with word-by-word analysis and translations"
  },
  {
    icon: <Search className="h-6 w-6 text-primary" />,
    title: "Advanced Search",
    description: "Find verses quickly with our powerful search and filtering system"
  },
  {
    icon: <BookText className="h-6 w-6 text-primary" />,
    title: "Multiple Translations",
    description: "Compare different translations to deepen your understanding"
  },
  {
    icon: <Settings2 className="h-6 w-6 text-primary" />,
    title: "Personalization",
    description: "Customize your reading experience with themes and settings"
  }
];