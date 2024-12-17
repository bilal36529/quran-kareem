# MyQuran Components Documentation

## Core Components

### 1. Layout Components

#### Header Component
```typescript
// components/header.tsx
interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  // Navigation, theme toggle, mobile menu
}
```

#### Footer Component
```typescript
// components/footer.tsx
interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  // Site info, navigation, social links
}
```

### 2. Quran Interface Components

#### ChapterList Component
```typescript
// components/quran/chapter-list.tsx
interface ChapterListProps {
  chapters: Chapter[];
  filter: 'all' | 'meccan' | 'medinan';
}

export function ChapterList({ chapters, filter }: ChapterListProps) {
  // Chapter grid with filtering
}
```

#### VerseList Component
```typescript
// components/quran/verse-list.tsx
interface VerseListProps {
  verses: Verse[];
  chapterNumber: number;
}

export function VerseList({ verses, chapterNumber }: VerseListProps) {
  // Verse cards with audio and translation
}
```

#### AudioPlayer Component
```typescript
// components/quran/audio-player.tsx
interface AudioPlayerProps {
  chapterNumber: number;
  verseNumber: number;
  totalVerses: number;
  onPlayStateChange?: (isPlaying: boolean) => void;
  onVerseComplete?: () => void;
}

export function AudioPlayer(props: AudioPlayerProps) {
  // Audio playback controls
}
```

### 3. Search Components

#### SearchInterface Component
```typescript
// components/search/search-interface.tsx
interface SearchInterfaceProps {
  initialQuery?: string;
}

export function SearchInterface({ initialQuery }: SearchInterfaceProps) {
  // Search bar, filters, results
}
```

#### SearchResults Component
```typescript
// components/search/search-results.tsx
interface SearchResultsProps {
  results: SearchResult[];
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function SearchResults(props: SearchResultsProps) {
  // Search results with pagination
}
```

## UI Components

### 1. Common Components

#### Button Component
```typescript
// components/ui/button.tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export function Button({ variant, size, loading, ...props }: ButtonProps) {
  // Styled button with variants
}
```

#### Card Component
```typescript
// components/ui/card.tsx
interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export function Card({ className, children }: CardProps) {
  // Styled card container
}
```

### 2. Form Components

#### Input Component
```typescript
// components/ui/input.tsx
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

export function Input({ error, label, ...props }: InputProps) {
  // Styled input with label and error
}
```

#### Select Component
```typescript
// components/ui/select.tsx
interface SelectProps {
  options: Array<{ value: string; label: string }>;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function Select(props: SelectProps) {
  // Styled select dropdown
}
```

### 3. Feedback Components

#### Toast Component
```typescript
// components/ui/toast.tsx
interface ToastProps {
  title?: string;
  description: string;
  type?: 'success' | 'error' | 'info';
}

export function Toast({ title, description, type }: ToastProps) {
  // Toast notification
}
```

#### Progress Component
```typescript
// components/ui/progress.tsx
interface ProgressProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
}

export function Progress({ value, max = 100, size = 'md' }: ProgressProps) {
  // Progress bar
}
```

## Utility Components

### 1. Loading States

#### Skeleton Component
```typescript
// components/ui/skeleton.tsx
interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
}

export function Skeleton({ className, variant = 'text' }: SkeletonProps) {
  // Loading placeholder
}
```

#### LoadingSpinner Component
```typescript
// components/ui/loading-spinner.tsx
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export function LoadingSpinner({ size = 'md', color }: LoadingSpinnerProps) {
  // Animated spinner
}
```

### 2. Layout Utilities

#### Container Component
```typescript
// components/ui/container.tsx
interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Container({ children, className, maxWidth = 'lg' }: ContainerProps) {
  // Responsive container
}
```

#### Grid Component
```typescript
// components/ui/grid.tsx
interface GridProps {
  children: React.ReactNode;
  columns?: number;
  gap?: number;
  className?: string;
}

export function Grid({ children, columns = 1, gap = 4, className }: GridProps) {
  // Responsive grid layout
}
```

## Component Best Practices

1. **Composition**
   - Use composition over inheritance
   - Keep components focused and single-purpose
   - Extract reusable logic into hooks

2. **Props**
   - Use TypeScript interfaces
   - Provide sensible defaults
   - Document prop types and usage

3. **State Management**
   - Use local state for UI-specific state
   - Use context for shared state
   - Implement proper cleanup in useEffect

4. **Performance**
   - Memoize expensive calculations
   - Use React.memo for pure components
   - Implement proper loading states

5. **Accessibility**
   - Include ARIA labels
   - Support keyboard navigation
   - Maintain proper heading hierarchy

6. **Error Handling**
   - Implement error boundaries
   - Provide fallback UI
   - Log errors appropriately

7. **Testing**
   - Write unit tests for logic
   - Test component rendering
   - Test user interactions

## Component Organization

```
components/
├── layout/
│   ├── Header.tsx
│   └── Footer.tsx
├── quran/
│   ├── ChapterList.tsx
│   └── VerseList.tsx
├── search/
│   ├── SearchBar.tsx
│   └── SearchResults.tsx
├── ui/
│   ├── Button.tsx
│   └── Input.tsx
└── shared/
    ├── ErrorBoundary.tsx
    └── LoadingSpinner.tsx
```