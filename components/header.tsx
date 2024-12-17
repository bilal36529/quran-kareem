'use client';

import { Book, Moon, Sun, Menu } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from './ui/sheet';
import { useState } from 'react';
import DonationDialog from './donation/donation-dialog';
import NamesDialog from './names-of-allah/names-dialog';

export default function Header() {
  const { setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-background/60 border-b">
      <nav className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative">
              <div className="absolute inset-0 blur-lg bg-primary/20 rounded-full" />
              <Book className="h-6 w-6 text-primary relative" />
            </div>
            <span className="font-bold text-xl">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                Quran
              </span>
              <span className="text-foreground"> Kareem</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/quran">
              <Button variant="ghost" size="sm">Browse</Button>
            </Link>
            <Link href="/search">
              <Button variant="ghost" size="sm">Search</Button>
            </Link>
            <NamesDialog />
            <DonationDialog />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Sun className="h-[1.1rem] w-[1.1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.1rem] w-[1.1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85vw] sm:w-[385px]">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <Book className="h-5 w-5 text-primary" />
                    Quran Kareem
                  </SheetTitle>
                </SheetHeader>
                <nav className="mt-6 flex flex-col gap-4">
                  <SheetClose asChild>
                    <Link href="/quran">
                      <Button variant="ghost" className="w-full justify-start text-base">
                        Browse Quran
                      </Button>
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/search">
                      <Button variant="ghost" className="w-full justify-start text-base">
                        Search
                      </Button>
                    </Link>
                  </SheetClose>
                  <NamesDialog />
                  <DonationDialog />
                  
                  <div className="border-t pt-4 mt-4">
                    <h3 className="text-sm font-medium mb-2">Theme</h3>
                    <div className="grid grid-cols-3 gap-2">
                      <Button variant="outline" size="sm" onClick={() => setTheme("light")}>Light</Button>
                      <Button variant="outline" size="sm" onClick={() => setTheme("dark")}>Dark</Button>
                      <Button variant="outline" size="sm" onClick={() => setTheme("system")}>System</Button>
                    </div>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}